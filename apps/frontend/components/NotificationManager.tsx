'use client';
import { requestForToken } from '@/lib/firebase';
import { useEffect } from 'react';
export default function NotificationManager() {
  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      
      // Register Service Worker
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Scope: ', registration.scope);
        });

      // Request Permission and Send to Backend
      requestForToken().then((token) => {
        if (token) {
          console.log('Token generated:', token);
          // Send to your backend
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
        }
      });
    }
  }, []);

  return null; // Invisible component
}