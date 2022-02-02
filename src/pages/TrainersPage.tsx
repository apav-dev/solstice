import { TrainerCard } from '../components/cards/TrainerCard';
import VerticalResults from '../components/VerticalResults';
import usePageSetupEffect from '../hooks/usePageSetupEffect';

export default function TrainersPage({ verticalKey }: { verticalKey: string }) {
  usePageSetupEffect(verticalKey);

  return (
    <div>
      <VerticalResults
        CardComponent={TrainerCard}
        displayAllResults={true}
        customCssClasses={{ container: 'flex flex-wrap justify-center' }}
      />
    </div>
  );
}
