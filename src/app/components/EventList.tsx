// components/EventList.tsx

import React from 'react';
import { EventData } from './MapComponent';

interface EventListProps {
  events: EventData[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div style={{ padding: '1rem' }}>
      {events.map((event) => (
        <div
          key={event.id}
          style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            Coordinates: {event.latitude}, {event.longitude}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
