import { VerticalResultsDisplay } from "../components/VerticalResults";
import { SectionComponent, SectionConfig } from "../models/sectionComponent";
import { StandardCard } from "../components/cards/StandardCard";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import Mapbox, { GeoData } from "../components/Mapbox";
import React, { useReducer } from "react";

interface LocationSectionCssClasses {
  section?: string
}

const builtInCssClasses: LocationSectionCssClasses = {
  section: ''
}

interface LocationSectionConfig extends SectionConfig {
  customCssClasses?: LocationSectionCssClasses,
  compositionmethod?: CompositionMethod
}

interface LocationContextInterface {
  locationId: string,
  dispatch?: React.Dispatch<string>
}

const locationContext = {
  locationId: ''
}

function reducer(state: LocationContextInterface, locationId: string) {
  return { ...state, locationId };
};

export const LocationContext = React.createContext<LocationContextInterface | null>(null);

const LocationSection: SectionComponent = function (props: LocationSectionConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses, props.compositionmethod )
  const { results,  cardConfig, header } = props;
  const [state, dispatch] = useReducer(reducer, locationContext);
  
  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  const renderMap = () => {
    console.log(state.locationId)
    if(results.length === 0) return null;

    const geoResults = results.map(r => r.rawData as unknown as GeoData);

    return (<Mapbox markers={geoResults.map(r => ({ id: r.id, coord: [r.yextDisplayCoordinate?.longitude || 0, r.yextDisplayCoordinate?.latitude || 0], active: r.id === state.locationId }))}/>);
  }
  
  return (
    <LocationContext.Provider value={{ locationId: '', dispatch }}>
      <section className={cssClasses.section}>
        {header}
        <div className='flex'>
          {/* TODO: remove inline styles */}
          <div className='w-1/4 border' style={{ height: '580px', overflowY: 'scroll' }}>
            <VerticalResultsDisplay
              results={results}
              CardComponent={cardComponent}
              {...(cardConfig && { cardConfig })}
            />
          </div>
          <div className='w-3/4'>
            {renderMap()}
          </div>
        </div>
      
      </section>
    </LocationContext.Provider>
  );
}
export default LocationSection;