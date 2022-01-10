import { LocationCard } from '../components/cards/LocationCard';
import { StandardCard } from '../components/cards/StandardCard';
import { TrainerCard } from '../components/cards/TrainerCard';
import { VerticalConfig } from '../components/UniversalResults';
import CarouselSection from '../sections/CarouselSection';
import LocationSection from '../sections/LocationSection';

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    label: 'Locations',
    viewAllButton: true,
    SectionComponent: LocationSection,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false
    }
  },
  events: {
    label: 'Classes',
    cardConfig: {
      CardComponent: StandardCard,
      showOrdinal: false
    }
  },
  trainers: {
    label: 'Trainers',
    SectionComponent: CarouselSection,
    cardConfig: {
      CardComponent: TrainerCard,
      showOrdinal: false
    },
  }
}