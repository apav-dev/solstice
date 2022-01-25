import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import StaticFilters from '../components/StaticFilters';
import { ClassCard } from '../components/cards/ClassCard';
import SearchBar from '../components/SearchBar';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';

const staticFiltersConfig = [{
  title: 'Venue',
  options: [
    {
      label: 'West End Avenue',
      fieldId: 'venueName',
      value: 'West End Avenue'
    },
    {
      label: 'Peaceful Coffee',
      fieldId: 'venueName',
      value: 'Peaceful Coffee',
    },
  ]
}]

export default function ClassesPage({ verticalKey }: {
  verticalKey: string
}) {
  usePageSetupEffect(verticalKey);
  const isMobile = useContext(ResponsiveContext);


  return (
    <div >
      {/* <div>
        <StaticFilters
          filterConfig={staticFiltersConfig}
        />
      </div> */}
      {/* {isMobile && <SearchBar
        placeholder='Search...'
        screenReaderInstructionsId='SearchBar__srInstructions'
        customCssClasses={{ container: 'w-3/5 mt-0' }}
        cssCompositionMethod="assign"
      />} */}
      <div className='mt-2 ml-10 flex-grow'>
        {isMobile && <div className='font-heading text-7xl'>Search Classes</div>}
        {isMobile && <SearchBar
          placeholder='Search...'
          screenReaderInstructionsId='SearchBar__srInstructions'
          customCssClasses={{ container: 'my-8 m-auto w-full' }}
          cssCompositionMethod="assign"
        />}
        <DirectAnswer />
        <SpellCheck />
        <ResultsCount />
        <AppliedFilters
          hiddenFields={['builtin.entityType']}
          customCssClasses={{
            nlpFilter: 'mb-4',
            removableFilter: 'mb-4'
          }}
        />
        <AlternativeVerticals
          currentVerticalLabel='Classes'
          verticalsConfig={[
            { label: 'Locations', verticalKey: 'locations' }
          ]}
        />
        <VerticalResults
          CardComponent={ClassCard}
          displayAllResults={true}
          customCssClasses={{ results: 'flex-col sm:grid sm:grid-cols-3' }}
        />
        <LocationBias />
      </div>
    </div>
  )
}