import ResultsCount from '../components/ResultsCount';
import DirectAnswer from '../components/DirectAnswer';
import SpellCheck from '../components/SpellCheck';
import LocationBias from '../components/LocationBias';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import { LocationCard } from '../components/cards/LocationCard';
import { LocationProvider } from '../components/LocationContext';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';
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
          <SpellCheck
            cssCompositionMethod="assign"
            customCssClasses={{
              container: 'font-body text-xl',
              helpText: '',
              link: 'text-gold font-bold cursor-pointer hover:underline focus:underline',
            }}
          />
          <ResultsCount cssCompositionMethod="assign" customCssClasses={{ text: 'text-sm font-body' }} />
          {/* <AppliedFilters
          hiddenFields={['builtin.entityType']}
          customCssClasses={{
            nlpFilter: 'mb-4',
            removableFilter: 'mb-4',
          }}
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
