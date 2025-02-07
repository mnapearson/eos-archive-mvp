// pages/berlin.tsx

import React from 'react';
import MapComponent from '@/app/components/MapComponent';

const BerlinPage: React.FC = () => {
  // Replace with your actual Berlin are.na channel ID.
  const berlinChannelId = 'YOUR_BERLIN_CHANNEL_ID';
  // Optionally, if your Berlin events have different default coordinates, update them:
  const berlinCenter: [number, number] = [13.405, 52.52];

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>Berlin Events</h1>
      <MapComponent
        channelId={berlinChannelId}
        defaultCenter={berlinCenter}
      />
    </main>
  );
};

export default BerlinPage;
