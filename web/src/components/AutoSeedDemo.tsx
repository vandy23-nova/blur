'use client';

import { useEffect } from 'react';

export default function AutoSeedDemo({ userId, hasBlurs }: { userId: string; hasBlurs: boolean }) {
  useEffect(() => {
    if (!hasBlurs) {
      // Auto-seed demo data for new users
      fetch('/api/seed-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      }).then(() => {
        // Refresh page to show new blurs
        setTimeout(() => window.location.reload(), 1000);
      });
    }
  }, [userId, hasBlurs]);

  return null;
}
