import UniversalResults from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import { UniversalResultsConfig } from '../config/universalResultsConfig';
import SpellCheck from '../components/SpellCheck';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import LocationBias from '../components/LocationBias';
import { useContext, useEffect } from 'react';
import { useAnswersActions } from '@yext/answers-headless-react';
import { ResponsiveContext } from '../App';
import SearchBar from '../components/SearchBar';

const universalResultsFilterConfig = {
  show: true,
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig }) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();

  // TODO: remove after adding landing page
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setQuery('manhattan');
  });

  const isMobile = useContext(ResponsiveContext);

  return (
    <div className="">
      {isMobile && <div className="font-heading text-7xl">Search Results</div>}
      {isMobile && (
        <SearchBar
          placeholder="Search for Gyms, Classes, Trainers"
          screenReaderInstructionsId="SearchBar__srInstructions"
          customCssClasses={{ container: 'my-8 m-auto w-full' }}
          cssCompositionMethod="assign"
        />
      )}
      <SpellCheck />
      <DirectAnswer />
      <UniversalResults
        appliedFiltersConfig={universalResultsFilterConfig}
        verticalConfigs={universalResultsConfig}
        customCssClasses={{ container: 'space-y-8  mt-6' }}
        cssCompositionMethod="assign"
      />
      <LocationBias customCssClasses={{ container: 'p-8' }} />
    </div>
  );
}
