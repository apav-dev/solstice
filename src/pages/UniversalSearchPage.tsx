import UniversalResults from '../components/UniversalResults';
import DirectAnswer from '../components/DirectAnswer';
import { UniversalResultsConfig } from '../config/universalResultsConfig';
import SpellCheck from '../components/SpellCheck';
import usePageSetupEffect from '../hooks/usePageSetupEffect';
import LocationBias from '../components/LocationBias';

const universalResultsFilterConfig = {
  show: false,
};

export default function UniversalSearchPage(props: { universalResultsConfig: UniversalResultsConfig }) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();

  return (
    <div>
      <SpellCheck
        cssCompositionMethod="assign"
        customCssClasses={{
          container: 'font-body',
          helpText: '',
          link: 'text-gold font-bold cursor-pointer hover:underline focus:underline',
        }}
      />
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
