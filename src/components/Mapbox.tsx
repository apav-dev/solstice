import { useRef, useEffect } from 'react';

import mapboxgl, { Map } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhdmxpY2siLCJhIjoiY2t5NHJkODFvMGV3ZDJ0bzRnNDI1ZTNtZiJ9.VA2eTvz6Cf9jX_MG2r6u0g';

export interface GeoData {
  yextDisplayCoordinate: {
    latitude: number,
    longitude: number
  }
}

interface Props {
	markers?: {
		coord: [number, number]
	}[]
}

export default function Mapbox(props: Props) {
  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null); 

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 13
    });
  });

  useEffect(() => {
    if (map === null || map.current === null || !props.markers || props.markers.length === 0) return;
    const bounds = new mapboxgl.LngLatBounds();
    const center = props.markers[0].coord;

    for (const marker of (props.markers || []).values()) {
      bounds.extend(marker.coord);
      new mapboxgl.Marker().setLngLat(marker.coord).addTo(map.current);
    }

    map.current.setCenter(center);
    // map.current.fitBounds(bounds);
  }, [props.markers])

  return (
    <div>
      {/* TODO: remove inline style */}
      <div ref={mapContainer} style={{ height: '364px',  }} />
    </div>
  );
}