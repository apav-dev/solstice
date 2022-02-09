import { useRef, useEffect, useState, useContext } from 'react';
import { ReactComponent as PinIcon } from '../icons/pin.svg';
import { ReactComponent as ActivePinIcon } from '../icons/active_pin.svg';

import mapboxgl, { Map } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';
import { LocationContext } from './LocationContext';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhdmxpY2siLCJhIjoiY2t5NHJkODFvMGV3ZDJ0bzRnNDI1ZTNtZiJ9.VA2eTvz6Cf9jX_MG2r6u0g';

// prettier-ignore
export interface GeoData {
  id: string,
  yextDisplayCoordinate: {
    latitude: number,
    longitude: number
  }
}

// prettier-ignore
interface Props {
  markers?: {
    id: string,
    coord: [number, number]
  }[]
}

// prettier-ignore
type MapMarkers = {
  [locationId: string]: { marker: mapboxgl.Marker, activeMarker: mapboxgl.Marker }
};

export default function Mapbox(props: Props): JSX.Element {
  const [markers, setMarkers] = useState<MapMarkers>({});

  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useContext(LocationContext);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/dark-v10',
      interactive: false,
      zoom: 9,
    });
  });

  useEffect(() => {
    state.showMap && map.current && map.current.resize();
  }, [state.showMap]);

  // TODO: Hide pins that aren't in marker list
  useEffect(() => {
    if (map === null || map.current === null || !props.markers || props.markers.length === 0) return;

    let markerRecord: MapMarkers = markers;
    const bounds = new mapboxgl.LngLatBounds();

    for (const marker of (props.markers || []).values()) {
      marker.coord && bounds.extend(marker.coord);

      if (!markers[marker.id]) {
        const pin_el = document.createElement('div');
        const activePin_el = document.createElement('div');

        pin_el.setAttribute('id', `${marker.id}_pin`);
        activePin_el.setAttribute('id', `${marker.id}_activePin`);

        ReactDOM.render(<PinIcon />, pin_el);
        ReactDOM.render(<ActivePinIcon />, activePin_el);

        const mapMarker = new mapboxgl.Marker(pin_el);
        const activeMapMarker = new mapboxgl.Marker(activePin_el);
        activeMapMarker.getElement().style.visibility = 'hidden';

        markerRecord = {
          ...markerRecord,
          [marker.id]: { marker: mapMarker, activeMarker: activeMapMarker },
        };

        new mapboxgl.Marker(pin_el).setLngLat(marker.coord).addTo(map.current);
        new mapboxgl.Marker(activePin_el).setLngLat(marker.coord).addTo(map.current);
      }
    }

    map.current.setCenter(bounds.getCenter());
    map.current.fitBounds(bounds);

    setMarkers(markerRecord);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.markers]);

  // TODO: Cleanup
  useEffect(() => {
    props.markers &&
      props.markers.forEach((marker) => {
        if (marker.id === state.hoveredLocation?.id) {
          if (markers) {
            if (markers[marker.id]) markers[marker.id].marker.getElement().style.visibility = 'hidden';
            if (markers[marker.id]) markers[marker.id].activeMarker.getElement().style.visibility = 'visible';
          }
        } else {
          if (markers) {
            if (markers[marker.id]) markers[marker.id].marker.getElement().style.visibility = 'visible';
            if (markers[marker.id]) markers[marker.id].activeMarker.getElement().style.visibility = 'hidden';
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.hoveredLocation]);

  return (
    <div className="relative">
      {/* TODO: remove inline style */}
      <div
        ref={mapContainer}
        style={{
          height: '580px',
        }}
      />
    </div>
  );
}
