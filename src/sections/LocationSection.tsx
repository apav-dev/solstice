import { VerticalResultsDisplay } from '../components/VerticalResults';
import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { CompositionMethod, useComposedCssClasses } from '../hooks/useComposedCssClasses';
import Mapbox, { GeoData } from '../components/Mapbox';
import React, { useContext, useReducer } from 'react';
import { ResponsiveContext } from '../App';
import { useAnswersState } from '@yext/answers-headless-react';
import renderViewAllLink from '../utils/renderViewAllLink';

interface LocationSectionCssClasses {
  section?: string;
}

const builtInCssClasses: LocationSectionCssClasses = {
  section: '',
};

interface LocationSectionConfig extends SectionConfig {
  customCssClasses?: LocationSectionCssClasses;
  compositionmethod?: CompositionMethod;
}

interface LocationContextInterface {
  locationId: string;
  dispatch?: React.Dispatch<string>;
}

const locationContext = {
  locationId: '',
};

function reducer(state: LocationContextInterface, locationId: string) {
  return { ...state, locationId };
}

export const LocationContext = React.createContext<LocationContextInterface | null>(null);

const LocationSection: SectionComponent = function (props: LocationSectionConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses, props.compositionmethod);
  const { results, cardConfig, header } = props;
  const [state, dispatch] = useReducer(reducer, locationContext);
  const latestQuery = useAnswersState((state) => state.query.mostRecentSearch);

  const isMobile = useContext(ResponsiveContext);

  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  const renderMap = () => {
    if (results.length === 0) return null;

    const geoResults = results.map((r) => r.rawData as unknown as GeoData);

    return (
      <Mapbox
        markers={geoResults.map((r) => ({
          id: r.id,
          coord: [r.yextDisplayCoordinate?.longitude || 0, r.yextDisplayCoordinate?.latitude || 0],
        }))}
        activeMarkerId={state.locationId}
      />
    );
  };

  return (
    <LocationContext.Provider value={{ locationId: '', dispatch }}>
      <section className={cssClasses.section}>
        {header}
        <div className="flex">
          {/* TODO: remove inline styles */}
          <div
            className="sm:scrollbar w-full overflow-hidden pl-1 sm:w-1/4 sm:overflow-auto sm:border"
            style={{ maxHeight: '580px' }}>
            <VerticalResultsDisplay
              results={isMobile ? results.slice(0, 4) : results}
              CardComponent={cardComponent}
              {...(cardConfig && { cardConfig })}
              customCssClasses={{ container: 'px-4 sm:px-0' }}
            />
          </div>
          {!isMobile && <div className="w-3/4">{renderMap()}</div>}
        </div>
        {isMobile && renderViewAllLink({ verticalKey: props.verticalKey, latestQuery, label: props.label })}
      </section>
    </LocationContext.Provider>
  );
};
export default LocationSection;
