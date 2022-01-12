import { useRef, useEffect, useState } from 'react';
import { ReactComponent as PinIcon } from '../icons/pin.svg';
import { ReactComponent as ActivePinIcon } from '../icons/active_pin.svg';

import mapboxgl, { Map } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhdmxpY2siLCJhIjoiY2t5NHJkODFvMGV3ZDJ0bzRnNDI1ZTNtZiJ9.VA2eTvz6Cf9jX_MG2r6u0g';

export interface GeoData {
  id: string,
  yextDisplayCoordinate: {
    latitude: number,
    longitude: number
  }
}

interface Props {
	markers?: {
    id: string,
		coord: [number, number],
    active: boolean
	}[]
}

type MapMarkers = { [locationId: string]: { marker: mapboxgl.Marker, activeMarker: mapboxgl.Marker } };

export default function Mapbox(props: Props) {
  const [markers, setMarkers] = useState<MapMarkers>();
  const [initialRender, setInitialRender] = useState(true);

  const mapContainer = useRef(null);
  const map = useRef<Map | null>(null); 

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/dark-v10',
      interactive: false,
      zoom: 12
    });
  });

  useEffect(() => {
    if (map === null || map.current === null || !props.markers || props.markers.length === 0) return;
    const bounds = new mapboxgl.LngLatBounds();
    const center = props.markers[0].coord;
    

    if(initialRender){
      let markerRecord: MapMarkers = {};

      for (const marker of (props.markers || []).values()) {
        const pin_el = document.createElement('div');
        const activePin_el = document.createElement('div');

        pin_el.setAttribute('id', `${marker.id}_pin`);
        activePin_el.setAttribute('id', `${marker.id}_activePin`);

        ReactDOM.render(<PinIcon />, pin_el);
        ReactDOM.render(<ActivePinIcon /> , activePin_el);
          
        bounds.extend(marker.coord);
  
        const mapMarker = new mapboxgl.Marker(pin_el);
        const activeMapMarker = new mapboxgl.Marker(activePin_el);
        activeMapMarker.getElement().style.visibility = 'hidden';

        markerRecord = { ...markerRecord, [marker.id]: { marker: mapMarker, activeMarker: activeMapMarker } }
  
        new mapboxgl.Marker(pin_el).setLngLat(marker.coord).addTo(map.current);
        new mapboxgl.Marker(activePin_el).setLngLat(marker.coord).addTo(map.current);
      } 

      setMarkers(markerRecord);
      setInitialRender(false);
    }
    else {
      props.markers.forEach(marker => {
        if(marker.active){
          if(markers){
            markers[marker.id].marker.getElement().style.visibility = 'hidden';
            markers[marker.id].activeMarker.getElement().style.visibility = 'visible';
          } 
        } else {
          if(markers){
            markers[marker.id].marker.getElement().style.visibility = 'visible';
            markers[marker.id].activeMarker.getElement().style.visibility = 'hidden';
          } 
        }
      });
    }

    map.current.setCenter(center);
    // map.current.fitBounds(bounds);
  }, [props.markers])

  return (
    <div>
      {/* TODO: remove inline style */}
      <div ref={mapContainer}  style={{ height: '580px' }} />
    </div>
  );
}