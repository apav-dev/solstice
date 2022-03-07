import ResultsCount from '../components/ResultsCount';
import AlternativeVerticals from '../components/AlternativeVerticals';
import AppliedFilters from '../components/AppliedFilters';
import DirectAnswer from '../components/DirectAnswer';
import VerticalResults from '../components/VerticalResults';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import { StandardCard } from '../components/cards/StandardCard';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import Facets from '../components/Facets';
import FilterSearch from '../components/FilterSearch';
import { Divider } from '../components/StaticFilters';
import { LocationCard } from '../components/cards/LocationCard';
import { LocationProvider } from '../components/LocationContext';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';
import renderViewAllLink from '../utils/renderViewAllLink';
import { useAnswersState } from '@yext/answers-headless-react';
import LocationResults from '../components/LocationResults';
import MapToggleButton from '../components/MapToggleButton';

const filterSearchFields = [
  {
    fieldApiName: 'name',
    entityType: 'location',
  },
  {
    fieldApiName: 'paymentOptions',
    entityType: 'location',
  },
  {
    fieldApiName: 'services',
    entityType: 'location',
  },
];

export default function LocationsPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect({ verticalKey });

  const screenSize = useContext(ResponsiveContext);

  const results = useAnswersState((state) => state.vertical.results) || [];
  const latestQuery = useAnswersState((state) => state.query.mostRecentSearch);

  return (
    <LocationProvider>
      <div className="flex">
        <div className="flex-grow">
          <DirectAnswer />
          <SpellCheck />
          <ResultsCount />
          {/* <AppliedFilters
          hiddenFields={['builtin.entityType']}
          customCssClasses={{
            nlpFilter: 'mb-4',
            removableFilter: 'mb-4',
          }}
        /> */}
          {/* <AlternativeVerticals
          currentVerticalLabel="Locations"
          verticalsConfig={[
            { label: 'FAQs', verticalKey: 'faqs' },
            { label: 'Jobs', verticalKey: 'jobs' },
            { label: 'Events', verticalKey: 'events' },
          ]}
        /> */}
          {/* <VerticalResults CardComponent={LocationCard} displayAllResults={true} /> */}
          {results.length > 0 && screenSize === 'sm' && (
            <div className="pb-2">
              <MapToggleButton />
            </div>
          )}
          <LocationResults results={results} verticalKey="locations" cardConfig={{ CardComponent: LocationCard }} />
          <LocationBias customCssClasses={{ container: 'p-8' }} />
        </div>
      </div>
    </LocationProvider>
  );
}
