import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import { ClassCard } from '../components/cards/ClassCard';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';
import MobileFilterLayout from '../components/MobileFilterLayout';
import ClassFacets from '../components/ClassFacets';
import { useAnswersState } from '@yext/answers-headless-react';

export default function ClassesPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect({ verticalKey });
  const screenSize = useContext(ResponsiveContext);

  const classFacetOptions = useAnswersState((state) => state.filters.facets?.flatMap((facet) => facet.options));

  return (
    <div>
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
      <AppliedFilters filterBarType="sentence" />
      <AlternativeVerticals
        currentVerticalLabel="Classes"
        verticalsConfig={[
          { label: 'Locations', verticalKey: 'locations' },
          { label: 'Trainers', verticalKey: 'trainers' },
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
      <div className="flex justify-center space-x-4">
        {classFacetOptions && classFacetOptions.length > 0 && screenSize !== 'sm' && <ClassFacets />}
        <VerticalResults
          CardComponent={ClassCard}
          displayAllResults={true}
          customCssClasses={{ container: 'sm:flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:w-4/5 gap-4' }}
        />
      </div>
      <LocationBias customCssClasses={{ container: 'p-8' }} />
      {classFacetOptions && classFacetOptions.length > 0 && screenSize === 'sm' && <MobileFilterLayout />}
    </div>
  );
}
