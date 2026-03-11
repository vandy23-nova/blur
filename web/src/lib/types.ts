export type User = {
  id: string;
  username: string;
  avatar_url: string | null;
  school_id: string | null;
  phone: string | null;
  coins: number;
  is_plus: boolean;
  created_at: string;
  last_active: string;
};

export type Blur = {
  id: string;
  sender_id: string;
  receiver_id: string;
  image_url: string;
  message: string | null;
  blur_level: number;
  unlocked: boolean;
  unlocked_at: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  sender?: User;
  receiver?: User;
};
