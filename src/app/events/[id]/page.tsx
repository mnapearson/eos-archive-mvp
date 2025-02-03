// src/app/events/[id]/page.tsx

import React from 'react';
import events from '@/data/events.json';
import { notFound } from 'next/navigation';
import type { Event } from '@/types';

// Ensure generateStaticParams returns a Promise of an array of objects.
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return (events as Event[]).map((event) => ({
    id: event.id,
  }));
}

// Here, we explicitly indicate that the incoming props have a `params` property
// that is a Promise resolving to our expected object.
interface DynamicPageProps {
  params: Promise<{ id: string }>;
}

// The page component is async so we can await the params.
export default async function EventDetail({
  params,
}: DynamicPageProps): Promise<React.ReactElement> {
  // Await the params so that we have a plain object.
  const { id } = await params;

  const event = (events as Event[]).find((e) => e.id === id);
  if (!event) {
    notFound();
  }

  return (
    <main className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>{event.title}</h1>
      <p className='mb-4'>
        {event.date} @ {event.time} - {event.location.name},{' '}
        {event.location.city}
      </p>
      <img
        src={event.imageUrl}
        alt={event.title}
        className='w-full h-64 object-cover rounded mb-4'
      />
      <p className='text-lg'>{event.description}</p>
      <div className='mt-4'>
        <p>
          <strong>Category:</strong> {event.category}
        </p>
        <p>
          <strong>Tags:</strong> {event.tags.join(', ')}
        </p>
      </div>
    </main>
  );
}
