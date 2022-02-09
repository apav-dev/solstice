import { createContext, Dispatch, useReducer } from 'react';
import { LocationData } from './cards/LocationCard';
import {
  toggleShowMapReducer,
  hoveredLocationReducer,
  selectedLocationReducer,
  MapActions,
  LocationActions,
} from './locationReducers';

//prettier-ignore
type LocationStateType = {
  hoveredLocation?: LocationData,
  selectedLocation?: LocationData,
  showMap: boolean
};

const locationState = {
  showMap: false,
};

//prettier-ignore
export const LocationContext = createContext<{ state: LocationStateType, dispatch: Dispatch<MapActions | LocationActions> }>({
  state: locationState,
  dispatch: () => null,
});

const mainReducer = (
  { hoveredLocation, selectedLocation, showMap }: LocationStateType,
  action: MapActions | LocationActions
): LocationStateType => {
  return {
    hoveredLocation: hoveredLocationReducer(hoveredLocation ?? {}, action),
    selectedLocation: selectedLocationReducer(selectedLocation ?? {}, action),
    showMap: toggleShowMapReducer(showMap, action),
  };
};

export const LocationProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(mainReducer, locationState);

  return <LocationContext.Provider value={{ state, dispatch }}>{children}</LocationContext.Provider>;
};
