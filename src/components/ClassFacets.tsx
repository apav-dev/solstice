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
  filterTitle?: boolean,
  isMobile?: boolean
}

export default function ClassFacets({ filterTitle, isMobile }: ClassFacetsProps): JSX.Element {
  return (
    <div className="sm:w-1/5">
      {filterTitle && (
        <div>
          <div className="my-8 flex w-full justify-center font-heading text-4xl text-white">Filter</div>
          <Divider />
        </div>
      )}
      <Facets
        customCssClasses={{
          label: 'sm:text-lg text-5xl font-heading text-gold text-left',
          container: 'ml-8',
          divider: 'bg-transparent',
          labelContainer: 'my-6 sm:mt-3 sm:mb-3',
          option: 'flex items-center space-x-3 ml-8',
          optionInput:
            'w-8 h-8 sm:w-4 sm:h-4  form-checkbox cursor-pointer border border-gray-300 rounded-sm text-gold focus:ring-gold',
          optionLabel: 'text-white text-heading sm:text-lg text-4xl my-4 sm:my-2',
          optionsContainer: 'sm:space-y-0',
        }}
        cssCompositionMethod="assign"
        searchOnChange={true}
        defaultExpanded={true}
        facetConfigs={{
          'c_location.neighborhood': { label: 'GYM LOCATION' },
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
              optionsContainer: 'sm:flex sm:flex-wrap grid grid-cols-3 gap-8 sm:gap-0 sm:mr-0 mr-8 ml-8 sm:ml-0',
              label: 'sm:text-lg text-5xl font-heading text-gold text-left',
              labelContainer: 'my-8',
            },
            isMobile,
          },
        }}
      />
    </div>
  );
}
