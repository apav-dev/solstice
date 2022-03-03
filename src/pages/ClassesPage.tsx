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

export default function ClassesPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect(verticalKey);
  const screenSize = useContext(ResponsiveContext);

  return (
    <div>
      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <AppliedFilters filterBarType="sentence" />
      {/* <AlternativeVerticals
        currentVerticalLabel="Classes"
        verticalsConfig={[{ label: 'Locations', verticalKey: 'locations' }]}
      /> */}
      <div className="flex space-x-4">
        {screenSize !== 'sm' && <ClassFacets />}
        <VerticalResults
          CardComponent={ClassCard}
          displayAllResults={true}
          customCssClasses={{ container: 'sm:flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:w-4/5' }}
        />
      </div>
      <LocationBias customCssClasses={{ container: 'p-8' }} />
      {screenSize === 'sm' && <MobileFilterLayout />}
    </div>
  );
}
