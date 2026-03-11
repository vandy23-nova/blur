import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneWh1dnhpa2Nnd2FzcWNjaW5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI0NDYyNiwiZXhwIjoyMDg4ODIwNjI2fQ.-ovP8Jb8ShMAHUL_NnhJo0DqDO9p4-g-1M_PTy3Mvsg';

const adminClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Create demo users if they don't exist
    const demoUsers = [
      { username: 'sarah_cool', email: 'sarah@demo.blur.app' },
      { username: 'alex_mystery', email: 'alex@demo.blur.app' },
      { username: 'jamie_fun', email: 'jamie@demo.blur.app' },
    ];

    const createdUsers: any[] = [];

    for (const demo of demoUsers) {
      // Check if demo user exists
      const { data: existing } = await adminClient
        .from('users')
        .select('id')
        .eq('username', demo.username)
        .single();

      if (!existing) {
        // Create auth user
        const { data: authUser } = await adminClient.auth.admin.createUser({
          email: demo.email,
          password: 'demo123456',
          email_confirm: true,
          user_metadata: { username: demo.username }
        });

        if (authUser?.user) {
          // Create profile
          await adminClient.from('users').insert({
            id: authUser.user.id,
            username: demo.username,
            coins: 100
          });

          createdUsers.push({ id: authUser.user.id, username: demo.username });
        }
      } else {
        createdUsers.push(existing);
      }
    }

    // Create demo blurs for the user
    const demoBlurs = [
      {
        sender_id: createdUsers[0]?.id,
        receiver_id: userId,
        image_url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
        message: 'Guess who this is! 😊',
        blur_level: 100,
        difficulty: 'easy'
      },
      {
        sender_id: createdUsers[1]?.id,
        receiver_id: userId,
        image_url: 'https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5?w=400',
        message: 'Can you figure it out? 🤔',
        blur_level: 100,
        difficulty: 'medium'
      },
      {
        sender_id: createdUsers[2]?.id,
        receiver_id: userId,
        image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        message: 'Mystery time! 🎭',
        blur_level: 100,
        difficulty: 'hard'
      }
    ];

    // Check if demo blurs already exist
    const { data: existingBlurs } = await adminClient
      .from('blurs')
      .select('id')
      .eq('receiver_id', userId);

    if (!existingBlurs || existingBlurs.length === 0) {
      await adminClient.from('blurs').insert(demoBlurs);
    }

    return NextResponse.json({
      success: true,
      message: 'Demo data created',
      blursAdded: demoBlurs.length
    });

  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
