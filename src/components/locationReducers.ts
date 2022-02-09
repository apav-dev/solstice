import { LocationData } from './cards/LocationCard';

// prettier-ignore
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key,
        payload: M[Key]
      }
};

export enum LocationActionTypes {
  ToggleMap = 'TOGGLE_MAP',
  SetHoveredLocation = 'SET_HOVERED_LOCATION',
  SetSelectedLocation = 'SET_SELECTED_LOCATION',
  ClearHoveredLocation = 'CLEAR_HOVERED_LOCATION',
  ClearSelectedLocation = 'CLEAR_SELECTED_LOCATION',
}

// Map Toggle

// prettier-ignore
type MapPayload = {
  [LocationActionTypes.ToggleMap]: {
    toggleMap: boolean
  }
}

export type MapActions = ActionMap<MapPayload>[keyof ActionMap<MapPayload>];

export const toggleShowMapReducer = (state: boolean, action: MapActions | LocationActions) => {
  switch (action.type) {
    case LocationActionTypes.ToggleMap:
      return action.payload.toggleMap;
    default:
      return false;
  }
};

// Location(s)

//prettier-ignore
type LocationPayload = {
  [LocationActionTypes.SetHoveredLocation]: {
    hoveredLocation: LocationData
  },
  [LocationActionTypes.SetSelectedLocation]: {
    selectedLocation: LocationData
  },
  [LocationActionTypes.ClearHoveredLocation]: {},
  [LocationActionTypes.ClearSelectedLocation]: {}
}

export type LocationActions = ActionMap<LocationPayload>[keyof ActionMap<LocationPayload>];

export const hoveredLocationReducer = (state: LocationData | {}, action: MapActions | LocationActions) => {
  switch (action.type) {
    case LocationActionTypes.SetHoveredLocation:
      return action.payload.hoveredLocation;
    case LocationActionTypes.ClearHoveredLocation:
      return {};
    default:
      return {};
  }
};

export const selectedLocationReducer = (state: LocationData | {}, action: MapActions | LocationActions) => {
  switch (action.type) {
    case LocationActionTypes.SetSelectedLocation:
      return action.payload.selectedLocation;
    case LocationActionTypes.ClearSelectedLocation:
      return {};
    default:
      return {};
  }
};
