'use client';

import { useState } from 'react';
import Link from 'next/link';
import './globals.css'; // your Tailwind import

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'dawn' | 'dusk'>('dawn');

  // Toggle between dawn/dusk
  const toggleTheme = () => {
    setTheme(theme === 'dawn' ? 'dusk' : 'dawn');
  };

  // Container classes for background/text
  const containerClasses =
    theme === 'dusk'
      ? 'bg-dusk-bg text-dusk-text'
      : 'bg-dawn-bg text-dawn-text';

  // Button styling (for Connect + Toggle)
  // const buttonClasses =
  //   theme === 'dusk'
  //     ? 'bg-dusk-button-bg text-dusk-button-text'
  //     : 'bg-dawn-button-bg text-dawn-button-text';

  return (
    <html lang='en'>
      <body className={`min-h-screen flex flex-col ${containerClasses}`}>
        <header className='w-full border-b border-gray-200 px-4'>
          <div className='max-w-6xl mx-auto py-4 flex items-center justify-between'>
            {/* Left side: 'eos archive' -> Home */}
            <div className='flex items-center space-x-8'>
              <Link href='/'>
                <span className='text-xl font-bold uppercase tracking-widest cursor-pointer'>
                  eos archive
                </span>
              </Link>
              {/* Example nav links */}
              <nav className='hidden md:flex items-center space-x-4'>
                <Link
                  href='/city/berlin'
                  className='underline'>
                  berlin
                </Link>
                <Link
                  href='/about'
                  className='hover:underline'>
                  about
                </Link>
                <Link
                  href='/submit'
                  className='hover:underline'>
                  submit
                </Link>
              </nav>
            </div>

            {/* Right side: Connect + Toggle Icon */}
            <div className='flex items-center space-x-3'>
              <Link href='/signup'>connect</Link>

              {/* Dusk/Dawn Toggle using SVG icon */}
              <button onClick={toggleTheme}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='inline-block'>
                  <g fill='currentColor'>
                    <path d='M12 16a4 4 0 0 0 0-8z'></path>
                    <path
                      fillRule='evenodd'
                      d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m0 2v4a4 4 0 1 0 0 8v4a8 8 0 1 0 0-16'
                      clipRule='evenodd'></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className='flex-grow'>{children}</main>

        <footer className='w-full border-t border-gray-200 px-4'>
          <div className='max-w-6xl mx-auto py-4 flex flex-col md:flex-row items-center justify-between'>
            <p className='text-sm'>© {new Date().getFullYear()} eos archive</p>
            <div className='text-sm mt-2 md:mt-0'>
              <a
                href='mailto:info@eosarchive.xyz'
                className='hover:underline'>
                info@eosarchive.xyz
              </a>{' '}
              |{' '}
              <Link
                href='/privacy'
                className='hover:underline'>
                privacy
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
