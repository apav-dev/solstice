import {
  BoxingIcon,
  YogaIcon,
  HiitIcon,
  BarreIcon,
  DanceIcon,
  SpinIcon,
  BootcampIcon,
  RunIcon,
  StrengthIcon,
} from '../utils/faceticons';
import Facets from './Facets';
import { Divider } from './StaticFilters';

//prettier-ignore
interface ClassFacetsProps {
  isMobile?: boolean
}

export default function ClassFacets({ isMobile }: ClassFacetsProps): JSX.Element {
  return (
    <div className="md:1/5 overflow-y-auto sm:w-1/6">
      <Facets
        customCssClasses={{
          label: 'sm:text-lg text-2xl font-heading text-gold text-left',
          container: 'lg:ml-8 overflow-y-auto',
          divider: 'bg-transparent',
          labelContainer: 'my-3 sm:mt-3 sm:mb-3',
          option: 'flex items-center space-x-3 ',
          optionInput:
            'w-3.5 h-3.5 sm:w-4 sm:h-4  form-checkbox cursor-pointer border border-gray-300 rounded-sm text-gold focus:ring-gold',
          optionLabel: 'text-white text-heading text-base my-4 sm:my-2',
          optionsContainer: 'sm:space-y-0',
        }}
        cssCompositionMethod="assign"
        searchOnChange={true}
        defaultExpanded={true}
        facetConfigs={{
          'linkedLocation.neighborhood': { label: 'GYM LOCATION' },
          c_partOfDay: { label: 'TIME' },
          'c_trainer.linkedLocation.neighborhood': { label: 'GYM LOCATION' },
          c_classType: {
            label: 'ACTIVITY',
            type: 'image',
            facetImages: {
              Boxing: BoxingIcon,
              Yoga: YogaIcon,
              HIIT: HiitIcon,
              Strength: StrengthIcon,
              Barre: BarreIcon,
              Dance: DanceIcon,
              Spin: SpinIcon,
              Bootcamp: BootcampIcon,
              Running: RunIcon,
              other: BoxingIcon,
            },
            facetCss: {
              // optionsContainer: 'grid grid-cols-2 sm:grid-cols-3 gap-16 sm:gap-4 mr-8 ml-8',
              optionsContainer:
                'sm:flex sm:flex-wrap grid grid-cols-3 gap-8 sm:gap-0 sm:mr-0 justify-items-center  sm:ml-0',
              label: 'sm:text-xl text-2xl font-heading text-gold text-left',
              labelContainer: 'my-8',
            },
            isMobile,
          },
        }}
      />
    </div>
  );
}
