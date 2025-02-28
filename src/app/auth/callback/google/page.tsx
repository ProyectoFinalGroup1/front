'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error during auth callback:', error);
          router.push('/login?error=auth-failed');
          return;
        }
        
        if (data.session) {
       
          router.push('/dashboard/user');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        router.push('/login?error=unexpected');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Procesando tu inicio de sesión...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
      </div>
    </div>
  );
}