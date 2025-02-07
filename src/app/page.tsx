// app/page.tsx
'use client';

import Link from 'next/link';
import events from '@/data/events.json'; // Example import; replace with your data source
import type { Event } from '@/types'; // Replace with your own type definitions if needed

export default function HomePage() {
  return (
    <div className='px-4 py-12 max-w-6xl mx-auto'>
      {/* Hero or Intro Section */}
      <section className='mb-12'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4'>
          Welcome to EOS Archive
        </h1>
        <p className='leading-relaxed'>
          Your hub for subcultural events, flyers, and art. Feel free to
          explore, or{' '}
          <Link
            href='/submit'
            className='underline'>
            submit an event
          </Link>{' '}
          of your own.
        </p>
      </section>

      {/* Example Grid of Upcoming Events */}
      <section>
        <h2 className='text-2xl md:text-3xl font-semibold mb-6'>
          Upcoming Events
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {(events as Event[])?.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}>
              <div className='rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-inherit border border-current'>
                {/* Event Image */}
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className='w-full h-48 object-cover'
                  />
                )}
                {/* Event Info */}
                <div className='p-4'>
                  <h3 className='font-bold mb-1 line-clamp-2'>{event.title}</h3>
                  <p className='text-sm opacity-80'>
                    {event.date} • {event.location.city}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
