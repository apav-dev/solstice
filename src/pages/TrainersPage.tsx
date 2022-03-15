import { useContext } from 'react';
import { ResponsiveContext } from '../App';
import { TrainerCard } from '../components/cards/TrainerCard';
import ClassFacets from '../components/ClassFacets';
import MobileFilterLayout from '../components/MobileFilterLayout';
import VerticalResults from '../components/VerticalResults';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import LocationBias from '../components/LocationBias';
import ResultsCount from '../components/ResultsCount';
import DirectAnswer from '../components/DirectAnswer';
import SpellCheck from '../components/SpellCheck';
import AlternativeVerticals from '../components/AlternativeVerticals';
import { useAnswersState } from '@yext/answers-headless-react';

export default function TrainersPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect({ verticalKey });
  const screenSize = useContext(ResponsiveContext);

  const trainerFacetOptions = useAnswersState((state) =>
    state.filters.facets?.map((facet) => facet.options).flatMap((option) => option)
  );

  return (
    <div className="flex flex-col">
      <DirectAnswer />
      <SpellCheck
        cssCompositionMethod="assign"
        customCssClasses={{
          container: 'font-body text-xl',
          helpText: '',
          link: 'text-gold font-bold cursor-pointer hover:underline focus:underline',
        }}
      />
      <ResultsCount cssCompositionMethod="assign" customCssClasses={{ text: 'text-sm font-body' }} />
      <AlternativeVerticals
        currentVerticalLabel="Trainers"
        verticalsConfig={[
          { label: 'Classes', verticalKey: 'classes' },
          { label: 'Locations', verticalKey: 'locations' },
        ]}
        cssCompositionMethod="assign"
        customCssClasses={{
          container: 'flex flex-col justify-between mb-4 p-4 shadow-sm',
          noResultsText: 'text-lg font-heading pb-2',
          categoriesText: 'font-body',
          suggestions: 'pt-4 ',
          suggestion: 'pb-4 text-gold font-heading',
          allCategoriesLink: 'text-gold cursor-pointer hover:underline focus:underline',
        }}
      />
      <div className="flex justify-center space-x-4 ">
        {trainerFacetOptions && trainerFacetOptions.length > 0 && screenSize !== 'sm' && <ClassFacets />}
        <VerticalResults
          CardComponent={TrainerCard}
          displayAllResults={true}
          customCssClasses={{ container: 'sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:w-4/5' }}
        />
      </div>
      <LocationBias customCssClasses={{ container: 'p-8' }} />
      {trainerFacetOptions && trainerFacetOptions.length > 0 && screenSize === 'sm' && <MobileFilterLayout />}
    </div>
  );
}
