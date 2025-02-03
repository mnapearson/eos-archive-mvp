import Link from 'next/link';
import events from '@/data/events.json';
import { Event } from '@/types';

export default function HomePage() {
  const eventList = events as Event[];

  return (
    <main className='p-8 bg-gray-100 min-h-screen'>
      <h1 className='text-4xl font-bold mb-6 text-center'>
        <Link href={`/submit/`}>Submit Event</Link>
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {eventList.map((event) => (
          <div
            key={event.id}
            className='rounded overflow-hidden'>
            <div className='relative group w-full aspect-[16/16]'>
              <img
                src={event.imageUrl}
                alt={event.title}
                className='w-full h-full object-contain'
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-80 p-4'>
                <h2 className='text-2xl font-semibold text-white'>
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </h2>
                <p className='text-white'>
                  {event.date} - {event.location.name}, {event.location.city}
                </p>
                <p className='mt-2 text-white'>{event.description}</p>
                <div className='mt-2 text-white'>
                  <strong>Category:</strong> {event.category}
                </div>
                <div className='mt-2 text-white'>
                  <strong>Tags:</strong> {event.tags.join(', ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
