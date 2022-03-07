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

export default function TrainersPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect({ verticalKey });
  const screenSize = useContext(ResponsiveContext);

  return (
    <div className="flex flex-col">
      <DirectAnswer />
      <SpellCheck />
      <ResultsCount />
      <div className="flex justify-center space-x-4 ">
        {screenSize !== 'sm' && <ClassFacets />}
        <VerticalResults
          CardComponent={TrainerCard}
          displayAllResults={true}
          customCssClasses={{ container: 'sm:flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:w-4/5' }}
        />
      </div>
      <LocationBias customCssClasses={{ container: 'p-8' }} />
      {screenSize === 'sm' && <MobileFilterLayout />}
    </div>
  );
}
