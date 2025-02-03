'use client';

import { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export default function SignUpPage() {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const openWidget = () => {
    netlifyIdentity.open();
  };

  return (
    <main className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold mb-6 text-center'>Sign Up / Log In</h1>
      <div className='max-w-md mx-auto'>
        <button
          onClick={openWidget}
          className='w-full bg-blue-600 text-white px-4 py-2 rounded'>
          Sign Up / Log In
        </button>
      </div>
    </main>
  );
}
