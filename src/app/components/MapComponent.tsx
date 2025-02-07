'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

export interface EventData {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

// This helper fetches blocks from an are.na channel and extracts latitude/longitude
export async function fetchEventsFromChannel(
  channelId: string
): Promise<EventData[]> {
  const response = await fetch(
    `https://api.are.na/v2/channels/${channelId}?per=100`
  );
  const data = await response.json();
  const events: EventData[] = [];

  if (data && data.blocks && Array.isArray(data.blocks)) {
    for (const block of data.blocks) {
      // Assume the block's description includes lines like:
      // "Latitude: 52.5200" and "Longitude: 13.4050"
      const description: string = block.description || '';
      const latMatch = description.match(/Latitude:\s*([0-9\.\-]+)/i);
      const lngMatch = description.match(/Longitude:\s*([0-9\.\-]+)/i);
      if (latMatch && lngMatch) {
        const latitude = parseFloat(latMatch[1]);
        const longitude = parseFloat(lngMatch[1]);
        events.push({
          id: block.id,
          title: block.title,
          description,
          latitude,
          longitude,
        });
      }
    }
  }
  return events;
}

interface MapComponentProps {
  channelId: string;
  defaultCenter?: [number, number];
  defaultZoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({
  channelId,
  defaultCenter = [13.405, 52.52],
  defaultZoom = 10,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  // Initialize the map.
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/eosarchive/cm15n90zl01lz01qyc4yxg09u',
      center: defaultCenter,
      zoom: defaultZoom,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [defaultCenter, defaultZoom]);

  // Fetch events and add markers.
  useEffect(() => {
    async function addMarkers() {
      const events = await fetchEventsFromChannel(channelId);
      if (!map) return;
      events.forEach((event) => {
        new mapboxgl.Marker()
          .setLngLat([event.longitude, event.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${event.title}</h3><p>${event.description}</p>`
            )
          )
          .addTo(map);
      });
    }
    addMarkers();
  }, [map, channelId]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default MapComponent;
