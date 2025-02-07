import React from 'react';
import events from '@/data/events.json';
import { notFound } from 'next/navigation';
import type { Event } from '@/types';

// Generate static params (for SSG)
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return (events as Event[]).map((event) => ({
    id: event.id,
  }));
}

interface DynamicPageProps {
  params: Promise<{ id: string }>;
}

// Server component (async) that fetches event data by ID
export default async function EventDetail({
  params,
}: DynamicPageProps): Promise<React.ReactElement> {
  // Wait for the route param
  const { id } = await params;
  const event = (events as Event[]).find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    // Rely on layout.tsx for overall background/theme.
    // Just wrap content in a container.
    <div className='px-4 py-12 max-w-4xl mx-auto'>
      {/* Event Title */}
      <h1 className='text-3xl md:text-4xl font-bold mb-6'>{event.title}</h1>

      {/* Date/Time/Location */}
      <p className='mb-4 opacity-80'>
        {event.date} at {event.time} &mdash; {event.location.name},{' '}
        {event.location.city}
      </p>

      {/* Event Image */}
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className='w-full h-auto rounded shadow mb-6 object-cover'
        />
      )}

      {/* Event Description */}
      <div className='leading-relaxed mb-6'>{event.description}</div>

      {/* Additional Info (Category, Tags) */}
      <div className='flex flex-col space-y-2'>
        {event.category && (
          <p>
            <strong>Category:</strong> {event.category}
          </p>
        )}
        {event.tags?.length > 0 && (
          <p>
            <strong>Tags:</strong> {event.tags.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
