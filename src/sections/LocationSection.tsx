import { VerticalResultsDisplay } from "../components/VerticalResults";
import { SectionComponent, SectionConfig } from "../models/sectionComponent";
import { StandardCard } from "../components/cards/StandardCard";
import { CompositionMethod, useComposedCssClasses } from "../hooks/useComposedCssClasses";
import Mapbox, { GeoData } from "../components/Mapbox";

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

const LocationSection: SectionComponent = function (props: LocationSectionConfig): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, props.customCssClasses, props.compositionmethod )
  const { results,  cardConfig, header } = props;
  
  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  const renderMap = () => {
    if(results.length === 0) return null;

    const geoResults = results.map(r => r.rawData as unknown as GeoData);

    return (<Mapbox markers={geoResults.map(r => ({ coord: [r.yextDisplayCoordinate?.longitude || 0, r.yextDisplayCoordinate?.latitude || 0] }))}/>);
  }
  
  return (
    <section className={cssClasses.section}>
      {header}
      <div className='flex'>
        <div className='w-1/4' style={{ height: '580px', overflowY: 'scroll' }}>
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
  );
}
export default LocationSection;