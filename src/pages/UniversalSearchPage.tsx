import UniversalResults from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import { UniversalResultsConfig } from '../config/universalResultsConfig';
import SpellCheck from '../components/SpellCheck';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import LocationBias from '../components/LocationBias';
import { useEffect } from 'react';
import { useAnswersActions } from '@yext/answers-headless-react';

const universalResultsFilterConfig = {
  show: true,
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig }) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();

  // TODO: remove after adding landing page
  const answersActions = useAnswersActions();
  useEffect(() => {
    answersActions.setQuery('manhattan classes');
  });

  return (
    <div>
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
