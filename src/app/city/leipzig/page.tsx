// pages/leipzig.tsx

import React from 'react';
import MapComponent from '@/app/components/MapComponent';

const LeipzigPage: React.FC = () => {
  // Replace with your actual Leipzig are.na channel ID.
  const leipzigChannelId = 'leipzig-lhwaeiwmmrw';
  // Set default center for Leipzig – adjust coordinates if needed.
  const leipzigCenter: [number, number] = [12.3731, 51.3397];

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>Leipzig Events</h1>
      <MapComponent
        channelId={leipzigChannelId}
        defaultCenter={leipzigCenter}
      />
    </main>
  );
};

export default LeipzigPage;
