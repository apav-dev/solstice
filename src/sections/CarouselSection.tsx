import { VerticalResultsDisplay } from '../components/VerticalResults';
import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';

const CarouselSection: SectionComponent = function (props: SectionConfig): JSX.Element | null {
  const { results, cardConfig, header } = props;
  const isMobile = useContext(ResponsiveContext);

  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  // TODO: modify to use standard section
  return (
    <section>
      {header}
      <VerticalResultsDisplay
        results={results}
        CardComponent={cardComponent}
        {...(cardConfig && { cardConfig })}
        customCssClasses={{
          container: 'flex flex-col sm:flex-row sm:overflow-auto overflow-hidden sm:scrollbar snap-x pb-1',
        }}
      />
      {/* TODO: Link to classes Vertical */}
      {/* {TODO: Turn into component that can be named and a vertical can be passed} */}
      {isMobile && <div className="flex justify-center py-8 font-heading text-3xl text-gold">VIEW ALL CLASSES</div>}
    </section>
  );
};
export default CarouselSection;
