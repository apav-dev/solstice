import { useContext } from 'react';
import { ResponsiveContext } from '../App';
import { SectionConfig } from '../models/sectionComponent';
import { StandardCard } from './cards/StandardCard';
import { LocationContext } from './LocationContext';
import Mapbox, { GeoData } from './Mapbox';
import { VerticalResultsDisplay } from './VerticalResults';

interface LocationResultsProps extends SectionConfig {}

export default function LocationResults(props: LocationResultsProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useContext(LocationContext);
  const screenSize = useContext(ResponsiveContext);

  const { results, cardConfig } = props;
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
    <div className="flex">
      {/* {!state.showMap ? ( */}
      <div className="w-full overflow-y-auto pl-1 sm:overflow-auto sm:border lg:w-1/4" style={{ maxHeight: '580px' }}>
        <VerticalResultsDisplay
          results={screenSize === 'sm' ? results.slice(0, 4) : results}
          CardComponent={cardComponent}
          {...(cardConfig && { cardConfig })}
          customCssClasses={{ container: 'px-4 sm:px-0' }}
        />
      </div>
      {/* ) : ( */}
      <div className="w-full xl:w-3/4">{renderMap()}</div>
      {/* )} */}
    </div>
  );
}
