import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import StaticFilters, { Divider } from '../components/StaticFilters';
import { ClassCard } from '../components/cards/ClassCard';
import SearchBar from '../components/SearchBar';
import App, { ResponsiveContext } from '../App';
import { useContext } from 'react';
import Facets from '../components/Facets';
import MobileFilterButton from '../components/MobileFilterButton';
import MobileFilterLayout from '../components/MobileFilterLayout';
import ClassFacets from '../components/ClassFacets';

const staticFiltersConfig = [
  {
    title: 'Venue',
    options: [
      {
        label: 'West End Avenue',
        fieldId: 'venueName',
        value: 'West End Avenue',
      },
      {
        label: 'Peaceful Coffee',
        fieldId: 'venueName',
        value: 'Peaceful Coffee',
      },
    ],
  },
];

export default function ClassesPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect(verticalKey);
  const isMobile = useContext(ResponsiveContext);

  return (
    <div>
      {isMobile && <div className="font-heading text-7xl">Search Classes</div>}
      {isMobile && (
        <SearchBar
          placeholder="Search..."
          screenReaderInstructionsId="SearchBar__srInstructions"
          customCssClasses={{ container: 'my-8 m-auto w-full' }}
          cssCompositionMethod="assign"
        />
      )}
      <DirectAnswer />
      <SpellCheck />
      {/* <ResultsCount /> */}
      {/* <Divider />
        <Facets searchOnChange={true} defaultExpanded={true} /> */}
      {/* <AppliedFilters
          hiddenFields={['builtin.entityType']}
          customCssClasses={{
            nlpFilter: 'mb-4',
            removableFilter: 'mb-4',
          }}
        /> */}
      <AppliedFilters filterBarType="sentence" />
      <AlternativeVerticals
        currentVerticalLabel="Classes"
        verticalsConfig={[{ label: 'Locations', verticalKey: 'locations' }]}
      />
      <div className="flex space-x-4">
        {!isMobile && <ClassFacets />}
        <VerticalResults
          CardComponent={ClassCard}
          displayAllResults={true}
          customCssClasses={{ container: 'sm:flex-col sm:grid sm:grid-cols-3 sm:w-4/5' }}
        />
      </div>
      {/* <LocationBias /> */}
      {isMobile && <MobileFilterLayout />}
    </div>
  );
}
