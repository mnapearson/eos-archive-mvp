// components/MapComponent.tsx

'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export interface EventData {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

/**
 * This function fetches event data from an are.na channel.
 * It expects that each block’s description includes lines like:
 *
 *    Latitude: 52.5200
 *    Longitude: 13.4050
 *
 * If both are found, an EventData object is returned.
 */
async function fetchEventsFromChannel(channelId: string): Promise<EventData[]> {
  const response = await fetch(
    `https://api.are.na/v2/channels/${channelId}?per=100`
  );
  const data = await response.json();
  const events: EventData[] = [];
  if (data && data.blocks && Array.isArray(data.blocks)) {
    for (const block of data.blocks) {
      const description: string = block.description || '';
      // Look for lines that start with "Latitude:" and "Longitude:"
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
  defaultCenter = [13.405, 52.52], // default center (Berlin) – adjust if needed
  defaultZoom = 10,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);

  // Initialize the Mapbox map.
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: defaultCenter,
      zoom: defaultZoom,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [defaultCenter, defaultZoom]);

  // Fetch events from the provided are.na channel.
  useEffect(() => {
    async function loadEvents() {
      const ev = await fetchEventsFromChannel(channelId);
      setEvents(ev);
    }
    loadEvents();
  }, [channelId]);

  // Add markers for the fetched events.
  useEffect(() => {
    if (!map) return;
    // Clear existing markers if needed – in a more complete implementation you might track markers.
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
  }, [map, events]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default MapComponent;
