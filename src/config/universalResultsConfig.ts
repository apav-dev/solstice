import { StandardCard } from '../components/cards/StandardCard';
import { VerticalConfig } from '../components/UniversalResults';
import LocationSection from '../sections/LocationSection';

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    label: 'Locations',
    viewAllButton: true,
    SectionComponent: LocationSection,
    cardConfig: {
      CardComponent: StandardCard,
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
    cardConfig: {
      CardComponent: StandardCard,
      showOrdinal: false
    }
  }
}