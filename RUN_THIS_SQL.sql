-- Blur App - Initial Database Schema
-- COPY THIS ENTIRE FILE AND PASTE INTO SUPABASE SQL EDITOR
-- Then click RUN

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLES
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  type TEXT CHECK (type IN ('high_school', 'university')) NOT NULL,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_schools_city ON schools(city);

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(30) UNIQUE NOT NULL,
  avatar_url TEXT,
  school_id UUID REFERENCES schools(id),
  phone VARCHAR(20) UNIQUE,
  coins INTEGER DEFAULT 100,
  is_plus BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_school ON users(school_id);
CREATE INDEX idx_users_phone ON users(phone);

CREATE TABLE blurs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  message TEXT,
  blur_level INTEGER DEFAULT 100 CHECK (blur_level >= 0 AND blur_level <= 100),
  unlocked BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMP WITH TIME ZONE,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blurs_receiver ON blurs(receiver_id, unlocked);
CREATE INDEX idx_blurs_sender ON blurs(sender_id);
CREATE INDEX idx_blurs_created ON blurs(created_at DESC);

CREATE TABLE polls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_polls_school ON polls(school_id);
CREATE INDEX idx_polls_expires ON polls(expires_at);

CREATE TABLE poll_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poll_id UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  voted_for_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(poll_id, voter_id)
);

CREATE INDEX idx_poll_votes_poll ON poll_votes(poll_id);
CREATE INDEX idx_poll_votes_voted_for ON poll_votes(voted_for_id);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('blur_received', 'blur_unlocked', 'poll_mention', 'friend_joined')) NOT NULL,
  title VARCHAR(100) NOT NULL,
  body TEXT,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, read, created_at DESC);

CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'blocked')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

CREATE INDEX idx_friendships_user ON friendships(user_id, status);
CREATE INDEX idx_friendships_friend ON friendships(friend_id, status);

CREATE TABLE leaderboard (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  school_id UUID NOT NULL REFERENCES schools(id),
  blurs_sent INTEGER DEFAULT 0,
  blurs_received INTEGER DEFAULT 0,
  accuracy_rate DECIMAL(5,2) DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  rank INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_leaderboard_school_rank ON leaderboard(school_id, rank);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('coin_purchase', 'subscription', 'coin_spend')) NOT NULL,
  amount INTEGER NOT NULL,
  revenue_cents INTEGER,
  platform TEXT CHECK (platform IN ('ios', 'android', 'web')),
  receipt TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON transactions(user_id, created_at DESC);

CREATE TABLE push_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  platform TEXT CHECK (platform IN ('ios', 'android')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_push_tokens_user ON push_tokens(user_id);

-- ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view profiles in same school" ON users FOR SELECT USING (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can view sent blurs" ON blurs FOR SELECT USING (auth.uid() = sender_id);
CREATE POLICY "Users can view received blurs" ON blurs FOR SELECT USING (auth.uid() = receiver_id);
CREATE POLICY "Users can create blurs" ON blurs FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update received blurs" ON blurs FOR UPDATE USING (auth.uid() = receiver_id);

CREATE POLICY "Users can view school polls" ON polls FOR SELECT USING (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can view own votes" ON poll_votes FOR SELECT USING (auth.uid() = voter_id);
CREATE POLICY "Users can create votes" ON poll_votes FOR INSERT WITH CHECK (auth.uid() = voter_id);
CREATE POLICY "Users can view votes they received" ON poll_votes FOR SELECT USING (auth.uid() = voted_for_id);

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own friendships" ON friendships FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can create friendships" ON friendships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own friendships" ON friendships FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can view school leaderboard" ON leaderboard FOR SELECT USING (school_id IN (SELECT school_id FROM users WHERE id = auth.uid()));
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own push tokens" ON push_tokens FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view schools" ON schools FOR SELECT USING (true);

-- TRIGGERS
CREATE OR REPLACE FUNCTION update_user_last_active() RETURNS TRIGGER AS $$
BEGIN
  UPDATE users SET last_active = NOW() WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_last_active_on_blur
AFTER INSERT ON blurs FOR EACH ROW EXECUTE FUNCTION update_user_last_active();

CREATE OR REPLACE FUNCTION notify_on_new_blur() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, body, data)
  VALUES (NEW.receiver_id, 'blur_received', '🔔 Someone sent you a blur!', 'Tap to unlock and see who it is', jsonb_build_object('blur_id', NEW.id));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_on_blur
AFTER INSERT ON blurs FOR EACH ROW EXECUTE FUNCTION notify_on_new_blur();

CREATE OR REPLACE FUNCTION update_school_member_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE schools SET member_count = member_count + 1 WHERE id = NEW.school_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.school_id != NEW.school_id THEN
    UPDATE schools SET member_count = member_count - 1 WHERE id = OLD.school_id;
    UPDATE schools SET member_count = member_count + 1 WHERE id = NEW.school_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE schools SET member_count = member_count - 1 WHERE id = OLD.school_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_school_count
AFTER INSERT OR UPDATE OR DELETE ON users FOR EACH ROW EXECUTE FUNCTION update_school_member_count();

CREATE OR REPLACE FUNCTION init_leaderboard_entry() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO leaderboard (user_id, school_id) VALUES (NEW.id, NEW.school_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_init_leaderboard
AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION init_leaderboard_entry();

-- SEED DATA
INSERT INTO schools (name, city, type) VALUES
  ('Colegiul Național "Mihai Viteazul"', 'București', 'high_school'),
  ('Colegiul Național "Ioan Slavici"', 'Satu Mare', 'high_school'),
  ('Universitatea Politehnica București', 'București', 'university'),
  ('Universitatea Babeș-Bolyai', 'Cluj-Napoca', 'university'),
  ('Liceul Teoretic "Avram Iancu"', 'Cluj-Napoca', 'high_school');

-- STORAGE
INSERT INTO storage.buckets (id, name, public) VALUES ('blurs', 'blurs', false);

CREATE POLICY "Users can upload own blurs" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blurs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view blurs they sent/received" ON storage.objects FOR SELECT
USING (bucket_id = 'blurs' AND (auth.uid()::text = (storage.foldername(name))[1] OR EXISTS (SELECT 1 FROM blurs WHERE blurs.image_url LIKE '%' || storage.objects.name || '%' AND (blurs.sender_id = auth.uid() OR blurs.receiver_id = auth.uid()))));
