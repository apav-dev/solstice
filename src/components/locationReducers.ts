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
  SetActiveLocation = 'SET_ACTIVE_LOCATION',
}

// Map Toggle

// prettier-ignore
type MapPayload = {
  [LocationActionTypes.ToggleMap]: boolean
}

export type MapActions = ActionMap<MapPayload>[keyof ActionMap<MapPayload>];

export const toggleShowMapReducer = (state: boolean, action: MapActions | LocationActions) => {
  switch (action.type) {
    case LocationActionTypes.ToggleMap:
      return state;
    default:
      return false;
  }
};

// Location(s)

//prettier-ignore
type LocationPayload = {
  [LocationActionTypes.SetActiveLocation]: {
    locationId: string
  }
}

export type LocationActions = ActionMap<LocationPayload>[keyof ActionMap<LocationPayload>];

export const setActiveLocationReducer = (state: string, action: MapActions | LocationActions) => {
  switch (action.type) {
    case LocationActionTypes.SetActiveLocation:
      return action.payload.locationId;
    default:
      return '';
  }
};
