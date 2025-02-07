import React, { useEffect, useState } from 'react';
import MapComponent, {
  fetchEventsFromChannel,
  EventData,
} from '@/app/components/MapComponent';
import EventList from '@/app/components/EventLIst';

const BerlinPage: React.FC = () => {
  // Replace with your actual are.na channel ID for Berlin.
  const berlinChannelId = 'berlin-k2d6mltcmcg';
  const berlinCenter: [number, number] = [13.405, 52.52];

  const [events, setEvents] = useState<EventData[]>([]);

  // Fetch events for Berlin.
  useEffect(() => {
    async function loadEvents() {
      const ev = await fetchEventsFromChannel(berlinChannelId);
      setEvents(ev);
    }
    loadEvents();
  }, [berlinChannelId]);

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Berlin Events</h1>
      <MapComponent
        channelId={berlinChannelId}
        defaultCenter={berlinCenter}
      />
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Event Details</h2>
      <EventList events={events} />
    </main>
  );
};

export default BerlinPage;
