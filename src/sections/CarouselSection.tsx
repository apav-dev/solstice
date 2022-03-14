import { VerticalResultsDisplay } from '../components/VerticalResults';
import { SectionComponent, SectionConfig } from '../models/sectionComponent';
import { StandardCard } from '../components/cards/StandardCard';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';
import { useAnswersState } from '@yext/answers-headless-react';
import renderViewAllLink from '../utils/renderViewAllLink';

const CarouselSection: SectionComponent = function (props: SectionConfig): JSX.Element | null {
  const { results, cardConfig, header } = props;
  const screenSize = useContext(ResponsiveContext);
  const latestQuery = useAnswersState((state) => state.query.mostRecentSearch);

  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent || StandardCard;

  // TODO: modify to use standard section
  return (
    <section>
      {header}
      <VerticalResultsDisplay
        results={screenSize === 'sm' ? results.slice(0, 3) : results}
        CardComponent={cardComponent}
        {...(cardConfig && { cardConfig })}
        customCssClasses={{
          container: 'flex flex-col sm:flex-row overflow-x-auto max-h-fit snap-x pb-1',
        }}
      />
      {screenSize === 'sm' && renderViewAllLink({ verticalKey: props.verticalKey, latestQuery, label: props.label })}
    </section>
  );
};
export default CarouselSection;
