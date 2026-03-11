'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function SendBlurPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get sender info
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not logged in');
      }

      // Find receiver by username
      const { data: receiver, error: receiverError } = await supabase
        .from('users')
        .select('id')
        .eq('username', receiverUsername)
        .single();

      if (receiverError || !receiver) {
        throw new Error('User not found. Try: sarah_cool, alex_mystery, or jamie_fun');
      }

      // Create blur
      const { error: blurError } = await supabase
        .from('blurs')
        .insert({
          sender_id: session.user.id,
          receiver_id: receiver.id,
          image_url: imageUrl || 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400',
          message: message || null,
          blur_level: 100,
          difficulty: 'medium'
        });

      if (blurError) throw blurError;

      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">Send a Blur 📸</h1>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receiver Username
            </label>
            <input
              type="text"
              value={receiverUsername}
              onChange={(e) => setReceiverUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Try: sarah_cool, alex_mystery, jamie_fun"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Demo users: sarah_cool, alex_mystery, jamie_fun
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (optional - we'll use a demo image)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 h-24"
              placeholder="Guess who this is from! 😉"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Blur'}
          </button>
        </form>

        <button
          onClick={() => router.back()}
          className="mt-4 w-full text-gray-600 hover:text-gray-900 py-2"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
