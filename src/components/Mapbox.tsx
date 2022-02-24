import { useRef, useEffect, useState, useContext } from 'react';
import { ReactComponent as PinIcon } from '../icons/pin.svg';
import mapboxgl, { Map } from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactDOM from 'react-dom';
import { LocationContext } from './LocationContext';
import { LocationData } from './cards/LocationCard';
import { LocationActionTypes } from './locationReducers';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhdmxpY2siLCJhIjoiY2t5NHJkODFvMGV3ZDJ0bzRnNDI1ZTNtZiJ9.VA2eTvz6Cf9jX_MG2r6u0g';

// prettier-ignore
export interface MapLocationData extends LocationData {
  yextDisplayCoordinate?: {
    latitude: number,
    longitude: number
  }
}

// prettier-ignore
type MapMarkers = {
  [locationId: string]: mapboxgl.Marker 
};

export default function Mapbox(): JSX.Element {
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
    if (map === null || map.current === null || !state.mapLocations || state.mapLocations.length === 0) return;

    let markerRecord: MapMarkers = markers;
    const bounds = new mapboxgl.LngLatBounds();

    for (const marker of (state.mapLocations || []).values()) {
      if (marker.yextDisplayCoordinate) {
        const coord: [number, number] = [marker.yextDisplayCoordinate.longitude, marker.yextDisplayCoordinate.latitude];
        marker.yextDisplayCoordinate && bounds.extend(coord);

        if (marker.id && !markers[marker.id]) {
          const pin_el = generateMapPin(marker);

          ReactDOM.render(<PinIcon />, pin_el);

          const mapMarker = new mapboxgl.Marker(pin_el);

          markerRecord = {
            ...markerRecord,
            [marker.id]: mapMarker,
          };

          new mapboxgl.Marker(pin_el).setLngLat(coord).addTo(map.current);
        }
      }
    }

    map.current.setCenter(bounds.getCenter());
    map.current.fitBounds(bounds);

    setMarkers(markerRecord);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mapLocations]);

  // Handle when user hovers on Location Card
  useEffect(() => {
    Object.entries(markers).forEach((entry) => {
      const [locationId, marker] = entry;

      if (state.hoveredLocation?.id === locationId) {
        marker.getElement().style.color = '#f1c553';
      } else if (state.selectedLocation?.id !== locationId) {
        marker.getElement().style.color = 'white';
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.hoveredLocation]);

  // Handle when user clicks on Location Pin
  useEffect(() => {
    Object.entries(markers).forEach((entry) => {
      const [locationId, marker] = entry;

      if (state.selectedLocation?.id === locationId) {
        marker.getElement().style.color = '#f1c553';
      } else if (state.hoveredLocation?.id !== locationId) {
        marker.getElement().style.color = 'white';
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedLocation]);

  function generateMapPin(marker: MapLocationData) {
    const pin_el = document.createElement('div');

    pin_el.setAttribute('id', `${marker.id}_pin`);
    pin_el.addEventListener('click', () => {
      handlePinClick(marker);
    });
    pin_el.addEventListener('mouseover', () =>
      dispatch({ type: LocationActionTypes.SetHoveredLocation, payload: { hoveredLocation: marker } })
    );
    pin_el.addEventListener('mouseleave', () =>
      dispatch({ type: LocationActionTypes.ClearHoveredLocation, payload: {} })
    );

    return pin_el;
  }

  function handlePinClick(selectedLocation: MapLocationData) {
    dispatch({ type: LocationActionTypes.SetSelectedLocation, payload: { selectedLocation } });
  }

  return (
    <div className="relative justify-center">
      {/* TODO: remove inline style */}
      <div
        ref={mapContainer}
        style={{
          height: '580px',
        }}
      />
      {/* TODO: Mini map card */}
      {state.selectedLocation && (
        <div className="absolute bottom-2 left-0 right-0 mx-auto flex w-96 justify-center rounded-xl bg-white">
          <div className="flex space-x-2 p-2">
            <div
              className="h-20 w-full rounded-lg bg-cover shadow-gym"
              style={{
                backgroundImage: `url(https://a.mktgcdn.com/p/Yyz-pNtNAlYZKTSQpzQaPrHi_q7-xmZns9UMvK30Vh8/2370x1422.jpg)`,
              }}
            />
            <div className="">
              <span className="inline-flex font-heading text-sm text-black">{state.selectedLocation.name}</span>
              <span className="inline-flex font-body text-sm text-black">
                {`${state.selectedLocation.address?.line1} `}
              </span>
              <span className="inline-flex font-body text-sm text-black">{`${state.selectedLocation.address?.city}, ${state.selectedLocation.address?.region} ${state.selectedLocation.address?.postalCode}`}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
