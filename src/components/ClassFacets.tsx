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

//prettier-ignore
interface ClassFacetsProps {
  isMobile?: boolean
}

export default function ClassFacets({ isMobile }: ClassFacetsProps): JSX.Element {
  return (
    <div className="md:1/5 overflow-y-auto sm:w-1/6">
      <Facets
        customCssClasses={{
          container: '',
          label: 'sm:text-lg text-2xl font-heading text-gold text-left ml-4 sm:ml-0',
          divider: 'bg-transparent',
          labelContainer: 'my-3 sm:mt-3 sm:mb-3',
          option: 'flex items-center sm:pl-4 pl-8',
          optionInput:
            'w-3.5 h-3.5 sm:w-4 sm:h-4  form-checkbox cursor-pointer border border-gray-300 rounded-sm text-gold focus:ring-gold',
          optionLabel: 'text-white text-heading text-base my-4 sm:my-2 pl-3',
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
              optionsContainer: isMobile ? 'grid grid-cols-3 gap-6 justify-items-center' : 'flex flex-wrap',
              label: 'sm:text-xl text-2xl font-heading text-gold text-left ml-4 sm:ml-0',
              labelContainer: 'my-3',
            },
            isMobile,
          },
        }}
      />
    </div>
  );
}
