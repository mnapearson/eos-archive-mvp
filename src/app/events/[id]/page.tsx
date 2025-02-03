// src/app/events/[id]/page.tsx

import React from 'react';
import events from '@/data/events.json';
import { notFound } from 'next/navigation';
import type { Event } from '@/types';

// We keep generateStaticParams as async so it returns a Promise of an array.
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return (events as Event[]).map((event) => ({
    id: event.id,
  }));
}

// Here, instead of trying to type the props to satisfy Next’s auto-generated type,
// we override (assert) that params is what we expect.
export default async function EventDetail({
  params,
}: {
  params: unknown;
}): Promise<React.ReactElement> {
  // Cast params to our expected shape.
  const { id } = params as { id: string };

  const event = (events as Event[]).find((e) => e.id === id);
  if (!event) {
    notFound();
  }

  return (
    <main className='p-8'>
      <h1 className='text-4xl font-bold mb-4'>{event.title}</h1>
      <p className='text-gray-600 mb-4'>
        {event.date} - {event.location.name}, {event.location.city}
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
