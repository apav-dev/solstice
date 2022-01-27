import { ClassCard } from '../components/cards/ClassCard';
import { LocationCard } from '../components/cards/LocationCard';
import { TrainerCard } from '../components/cards/TrainerCard';
import { VerticalConfig } from '../components/UniversalResults';
import CarouselSection from '../sections/CarouselSection';
import LocationSection from '../sections/LocationSection';

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    label: 'LOCATIONS',
    SectionComponent: LocationSection,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false,
    },
  },
  classes: {
    label: 'CLASSES',
    SectionComponent: CarouselSection,
    cardConfig: {
      CardComponent: ClassCard,
      showOrdinal: false,
    },
  },
  trainers: {
    label: 'TRAINERS',
    SectionComponent: CarouselSection,
    cardConfig: {
      CardComponent: TrainerCard,
      showOrdinal: false,
    },
  },
};
