// src/app/events/[id]/page.tsx
import events from '@/data/events.json';
import { notFound } from 'next/navigation';
import { Event } from '@/types';

// For static generation, pre-render pages based on our sample events.
export function generateStaticParams() {
  return events.map((event: Event) => ({
    id: event.id,
  }));
}

// Define the props inline; this should match the inferred type from generateStaticParams.
export default async function EventDetail({
  params,
}: {
  params: { id: string };
}) {
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
      <div className='w-full aspect-[16/16]'>
        <img
          src={event.imageUrl}
          alt={event.title}
          className='w-full h-full object-contain'
        />
      </div>
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
