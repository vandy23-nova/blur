// Database types
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

export type School = {
  id: string;
  name: string;
  city: string;
  type: 'high_school' | 'university';
  member_count: number;
  created_at: string;
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

export type Poll = {
  id: string;
  school_id: string;
  question: string;
  created_at: string;
  expires_at: string;
};

export type PollVote = {
  id: string;
  poll_id: string;
  voter_id: string;
  voted_for_id: string;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'blur_received' | 'blur_unlocked' | 'poll_mention' | 'friend_joined';
  title: string;
  body: string | null;
  data: Record<string, unknown> | null;
  read: boolean;
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  friend?: User;
};

export type LeaderboardEntry = {
  user_id: string;
  school_id: string;
  blurs_sent: number;
  blurs_received: number;
  accuracy_rate: number;
  streak_days: number;
  rank: number | null;
  updated_at: string;
  user?: User;
};
