import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Blur } from '@/lib/types';

type BlursState = {
  blurs: Blur[];
  loading: boolean;
  fetchBlurs: () => Promise<void>;
  unlockBlur: (blurId: string) => Promise<void>;
  sendBlur: (receiverId: string, imageUrl: string, message?: string) => Promise<void>;
};

export const useBlursStore = create<BlursState>((set, get) => ({
  blurs: [],
  loading: false,

  fetchBlurs: async () => {
    set({ loading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('blurs')
        .select(`
          *,
          sender:users!blurs_sender_id_fkey(id, username, avatar_url)
        `)
        .eq('receiver_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ blurs: data || [] });
    } catch (error) {
      console.error('Error fetching blurs:', error);
    } finally {
      set({ loading: false });
    }
  },

  unlockBlur: async (blurId: string) => {
    const { error } = await supabase
      .from('blurs')
      .update({ 
        unlocked: true, 
        unlocked_at: new Date().toISOString(),
        blur_level: 0 
      })
      .eq('id', blurId);

    if (error) throw error;

    // Update local state
    set((state) => ({
      blurs: state.blurs.map((blur) =>
        blur.id === blurId
          ? { ...blur, unlocked: true, blur_level: 0, unlocked_at: new Date().toISOString() }
          : blur
      ),
    }));
  },

  sendBlur: async (receiverId: string, imageUrl: string, message?: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('blurs')
      .insert({
        sender_id: session.user.id,
        receiver_id: receiverId,
        image_url: imageUrl,
        message: message || null,
        difficulty: 'medium',
      });

    if (error) throw error;
  },
}));
