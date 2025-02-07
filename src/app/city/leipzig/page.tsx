// pages/leipzig.tsx

import React, { useEffect, useState } from 'react';
import MapComponent, {
  fetchEventsFromChannel,
  EventData,
} from '@/app/components/MapComponent';
import EventList from '@/app/components/EventLIst';

const LeipzigPage: React.FC = () => {
  // Replace with your actual are.na channel ID for Leipzig.
  const leipzigChannelId = 'YOUR_LEIPZIG_CHANNEL_ID';
  const leipzigCenter: [number, number] = [12.3731, 51.3397];

  const [events, setEvents] = useState<EventData[]>([]);

  // Fetch events for Leipzig.
  useEffect(() => {
    async function loadEvents() {
      const ev = await fetchEventsFromChannel(leipzigChannelId);
      setEvents(ev);
    }
    loadEvents();
  }, [leipzigChannelId]);

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Leipzig Events</h1>
      <MapComponent
        channelId={leipzigChannelId}
        defaultCenter={leipzigCenter}
      />
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Event Details</h2>
      <EventList events={events} />
    </main>
  );
};

export default LeipzigPage;
