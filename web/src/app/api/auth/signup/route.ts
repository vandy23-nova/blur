import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneWh1dnhpa2Nnd2FzcWNjaW5qIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI0NDYyNiwiZXhwIjoyMDg4ODIwNjI2fQ.-ovP8Jb8ShMAHUL_NnhJo0DqDO9p4-g-1M_PTy3Mvsg';

// Admin client that bypasses RLS and email confirmation
const adminClient = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();

    // Validate inputs
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password, and username are required' },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Create user with admin client (bypasses email confirmation)
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        username
      }
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create user profile in users table
    const { error: profileError } = await adminClient
      .from('users')
      .insert({
        id: authData.user.id,
        username,
        coins: 100,
        is_plus: false
      });

    if (profileError) {
      // If profile creation fails, still return success
      // User can complete profile later
      console.error('Profile creation error:', profileError);
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully! You can now log in.',
      user: {
        id: authData.user.id,
        email: authData.user.email
      }
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
