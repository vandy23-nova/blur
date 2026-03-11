-- Blur App - Monetization Schema
-- Adds credit system, earnings tracking, and payout management

-- User Credits Table (tracks current credit balance)
CREATE TABLE user_credits (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance INTEGER NOT NULL DEFAULT 0 CHECK (balance >= 0),
  total_purchased INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_credits_balance ON user_credits(balance);

-- Credit Transactions (purchases and spends)
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('purchase', 'spend', 'refund', 'bonus')) NOT NULL,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  price_cents INTEGER, -- only for purchases
  stripe_session_id TEXT, -- Stripe Checkout Session ID
  stripe_payment_intent_id TEXT,
  blur_id UUID REFERENCES blurs(id) ON DELETE SET NULL, -- for spend transactions
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_credit_transactions_user ON credit_transactions(user_id, created_at DESC);
CREATE INDEX idx_credit_transactions_type ON credit_transactions(type);
CREATE INDEX idx_credit_transactions_stripe_session ON credit_transactions(stripe_session_id);

-- Earnings Table (tracks revenue from unlocks)
CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blur_id UUID NOT NULL REFERENCES blurs(id) ON DELETE CASCADE,
  unlocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  credits_spent INTEGER NOT NULL,
  creator_share_cents INTEGER NOT NULL, -- 95% of value
  platform_share_cents INTEGER NOT NULL, -- 5% of value
  status TEXT CHECK (status IN ('pending', 'available', 'paid_out')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_earnings_creator ON earnings(creator_id, status);
CREATE INDEX idx_earnings_blur ON earnings(blur_id);
CREATE INDEX idx_earnings_created ON earnings(created_at DESC);

-- Payouts Table (withdrawal history)
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL CHECK (amount_cents >= 1000), -- minimum $10
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  stripe_transfer_id TEXT,
  stripe_account_id TEXT,
  payment_method TEXT, -- 'stripe', 'paypal', etc.
  payment_email TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  failure_reason TEXT,
  metadata JSONB
);

CREATE INDEX idx_payouts_user ON payouts(user_id, status, requested_at DESC);
CREATE INDEX idx_payouts_status ON payouts(status);

-- Row Level Security
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credits" ON user_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own earnings" ON earnings FOR SELECT USING (auth.uid() = creator_id);
CREATE POLICY "Users can view own payouts" ON payouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can request payouts" ON payouts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Initialize credits for existing users
INSERT INTO user_credits (user_id, balance)
SELECT id, 0 FROM users
ON CONFLICT (user_id) DO NOTHING;

-- Trigger: Initialize credits for new users
CREATE OR REPLACE FUNCTION init_user_credits() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_credits (user_id, balance) VALUES (NEW.id, 10); -- Give 10 free credits
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_init_user_credits
AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION init_user_credits();

-- Trigger: Update user_credits on transaction
CREATE OR REPLACE FUNCTION update_user_credits_on_transaction() RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_credits 
  SET 
    balance = NEW.balance_after,
    total_purchased = CASE WHEN NEW.type = 'purchase' THEN total_purchased + NEW.amount ELSE total_purchased END,
    total_spent = CASE WHEN NEW.type = 'spend' THEN total_spent + ABS(NEW.amount) ELSE total_spent END,
    updated_at = NOW()
  WHERE user_id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_credits_on_transaction
AFTER INSERT ON credit_transactions FOR EACH ROW EXECUTE FUNCTION update_user_credits_on_transaction();

-- Trigger: Create earnings when blur is unlocked with credits
CREATE OR REPLACE FUNCTION create_earnings_on_unlock() RETURNS TRIGGER AS $$
DECLARE
  credits_cost INTEGER;
  price_per_credit DECIMAL := 0.10; -- $0.10 per credit average
  total_value_cents INTEGER;
BEGIN
  -- Only process if blur was just unlocked
  IF NEW.unlocked = TRUE AND OLD.unlocked = FALSE THEN
    -- Get the credits cost based on difficulty
    credits_cost := CASE 
      WHEN NEW.difficulty = 'easy' THEN 3
      WHEN NEW.difficulty = 'medium' THEN 5
      WHEN NEW.difficulty = 'hard' THEN 10
      ELSE 5
    END;
    
    -- Calculate value in cents
    total_value_cents := (credits_cost * price_per_credit * 100)::INTEGER;
    
    -- Create earnings record (95% to creator, 5% to platform)
    INSERT INTO earnings (creator_id, blur_id, unlocker_id, credits_spent, creator_share_cents, platform_share_cents)
    VALUES (
      NEW.sender_id,
      NEW.id,
      NEW.receiver_id,
      credits_cost,
      (total_value_cents * 0.95)::INTEGER,
      (total_value_cents * 0.05)::INTEGER
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_earnings_on_unlock
AFTER UPDATE ON blurs FOR EACH ROW EXECUTE FUNCTION create_earnings_on_unlock();

-- Function: Get available earnings balance for user
CREATE OR REPLACE FUNCTION get_available_earnings(p_user_id UUID)
RETURNS INTEGER AS $$
  SELECT COALESCE(SUM(creator_share_cents), 0)::INTEGER
  FROM earnings
  WHERE creator_id = p_user_id AND status = 'available';
$$ LANGUAGE sql STABLE;

-- Function: Process credit purchase
CREATE OR REPLACE FUNCTION process_credit_purchase(
  p_user_id UUID,
  p_credits INTEGER,
  p_price_cents INTEGER,
  p_stripe_session_id TEXT,
  p_stripe_payment_intent_id TEXT
) RETURNS UUID AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance INTEGER;
  v_transaction_id UUID;
BEGIN
  -- Get current balance
  SELECT balance INTO v_current_balance FROM user_credits WHERE user_id = p_user_id;
  IF v_current_balance IS NULL THEN
    v_current_balance := 0;
  END IF;
  
  v_new_balance := v_current_balance + p_credits;
  
  -- Create transaction
  INSERT INTO credit_transactions (user_id, type, amount, balance_after, price_cents, stripe_session_id, stripe_payment_intent_id)
  VALUES (p_user_id, 'purchase', p_credits, v_new_balance, p_price_cents, p_stripe_session_id, p_stripe_payment_intent_id)
  RETURNING id INTO v_transaction_id;
  
  RETURN v_transaction_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Spend credits to unlock blur
CREATE OR REPLACE FUNCTION spend_credits_to_unlock(
  p_user_id UUID,
  p_blur_id UUID,
  p_credits INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance INTEGER;
BEGIN
  -- Get current balance
  SELECT balance INTO v_current_balance FROM user_credits WHERE user_id = p_user_id;
  
  IF v_current_balance IS NULL OR v_current_balance < p_credits THEN
    RETURN FALSE; -- Insufficient credits
  END IF;
  
  v_new_balance := v_current_balance - p_credits;
  
  -- Create transaction
  INSERT INTO credit_transactions (user_id, type, amount, balance_after, blur_id)
  VALUES (p_user_id, 'spend', -p_credits, v_new_balance, p_blur_id);
  
  -- Unlock the blur
  UPDATE blurs SET unlocked = TRUE, unlocked_at = NOW() WHERE id = p_blur_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE user_credits IS 'Tracks each user''s current credit balance';
COMMENT ON TABLE credit_transactions IS 'Records all credit purchases, spends, and refunds';
COMMENT ON TABLE earnings IS 'Tracks earnings from blurs being unlocked (95% to creator)';
COMMENT ON TABLE payouts IS 'Manages withdrawal requests and payment processing';
