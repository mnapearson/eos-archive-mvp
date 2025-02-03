import React from 'react';
import events from '@/data/events.json';
import { notFound } from 'next/navigation';
import type { Event } from '@/types';

// generateStaticParams returns a plain array of parameter objects.
export function generateStaticParams() {
  return (events as Event[]).map((event) => ({
    id: event.id,
  }));
}

// Define the component props inline.
export default function EventDetail({
  params,
}: {
  params: { id: string };
}): React.ReactElement {
  const event = (events as Event[]).find((e) => e.id === params.id);
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
