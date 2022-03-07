import DirectAnswer from '../components/DirectAnswer';
import LocationBias from '../components/LocationBias';
import SearchBar from '../components/SearchBar';
import { SolsticeHeader } from '../components/SolsticeHeader';
import SpellCheck from '../components/SpellCheck';

export default function HomeLayout() {
  return (
    <div>
      <SolsticeHeader />
      <SearchBar placeholder="Search..." screenReaderInstructionsId="SearchBar__srInstructions" />
      <SpellCheck />
      <DirectAnswer />
      <LocationBias customCssClasses={{ container: 'p-8' }} />
    </div>
  );
}
