import { StandardCard } from '../components/cards/StandardCard';
import { VerticalConfig } from '../components/UniversalResults';

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    label: 'Locations',
    viewAllButton: true,
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