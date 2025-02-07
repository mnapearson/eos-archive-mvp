// app/signup/page.tsx
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
    <div className='flex items-center justify-center py-12 px-4'>
      <div className='max-w-md w-full rounded-lg shadow p-8'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Sign Up / Log In
        </h1>
        <p className='mb-8 text-center'>
          Welcome! Please sign up or log in to continue.
        </p>
        <button
          onClick={openWidget}
          className='w-full px-4 py-2 rounded font-medium transition hover:opacity-90
            bg-inherit text-inherit border border-current
          '>
          {/* 
            Using the parent's text/border color.
            If you prefer the button style from layout, 
            you can add logic to detect theme or 
            simply re-use the 'buttonClasses' concept 
            from layout.
          */}
          Sign Up / Log In
        </button>
      </div>
    </div>
  );
}
