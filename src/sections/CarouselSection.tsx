import { VerticalResultsDisplay } from '../components/VerticalResults';
import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';

const CarouselSection: SectionComponent = function (props: SectionConfig): JSX.Element | null {
  const { results, cardConfig, header } = props;

  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  return (
    <section>
      {header}
      <VerticalResultsDisplay
        results={results}
        CardComponent={cardComponent}
        {...(cardConfig && { cardConfig })}
        customCssClasses={{
          container: 'flex flex-row overflow-auto scrollbar snap-x pb-1',
        }}
      />
    </section>
  );
};
export default CarouselSection;
