import { createContext, Dispatch, useReducer } from 'react';
import { toggleShowMapReducer, setActiveLocationReducer, MapActions, LocationActions } from './locationReducers';

//prettier-ignore
type LocationStateType = {
  locationId: string,
  showMap: boolean
};

const locationState = {
  locationId: '',
  showMap: false,
};

//prettier-ignore
export const LocationContext = createContext<{ state: LocationStateType, dispatch: Dispatch<MapActions | LocationActions> }>({
  state: locationState,
  dispatch: () => null,
});

const mainReducer = (
  { locationId, showMap }: LocationStateType,
  action: MapActions | LocationActions
): LocationStateType => {
  return {
    locationId: setActiveLocationReducer(locationId, action),
    showMap: toggleShowMapReducer(showMap, action),
  };
};

export const LocationProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(mainReducer, locationState);

  return <LocationContext.Provider value={{ state, dispatch }}>{children}</LocationContext.Provider>;
};
