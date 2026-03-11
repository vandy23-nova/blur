'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import type { Blur } from '@/lib/types';

export default function BlurFeed({ initialBlurs, userId }: { initialBlurs: Blur[], userId: string }) {
  const [blurs, setBlurs] = useState(initialBlurs);
  const supabase = createClient();

  const handleUnlock = async (blurId: string) => {
    try {
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
      setBlurs(blurs.map(blur => 
        blur.id === blurId 
          ? { ...blur, unlocked: true, blur_level: 0 }
          : blur
      ));

      alert('Unlocked! You can now see who sent you this blur');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  };

  if (blurs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📷</div>
        <p className="text-gray-500 text-lg">No blurs yet</p>
        <p className="text-gray-400 mt-2">Ask your friends to send you blurs!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blurs.map((blur) => (
        <div key={blur.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative aspect-[3/4] bg-gray-100">
            <Image
              src={blur.image_url}
              alt="Blur"
              fill
              className={`object-cover ${!blur.unlocked ? 'blur-xl' : ''}`}
            />
            
            {!blur.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  onClick={() => handleUnlock(blur.id)}
                  className="bg-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  🔒 Unlock
                </button>
              </div>
            )}
          </div>

          <div className="p-4">
            {blur.unlocked ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {blur.sender?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{blur.sender?.username}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(blur.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <p className="text-gray-400 font-medium">Someone</p>
                  <p className="text-sm text-gray-500">sent you a blur</p>
                </div>
              </div>
            )}

            {blur.message && blur.unlocked && (
              <p className="mt-3 text-gray-700">{blur.message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
