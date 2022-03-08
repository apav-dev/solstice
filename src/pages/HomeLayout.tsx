import SearchBar from '../components/SearchBar';
import { SolsticeHeader } from '../components/SolsticeHeader';
export default function HomeLayout() {
  const width = window.innerWidth === window.outerWidth ? window.innerWidth : window.outerWidth;

  return (
    <div>
      <SolsticeHeader />
      <img
        className="fixed left-0 top-36	min-h-full w-full"
        style={{
          minWidth: width,
        }}
        alt="deadlift"
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"
      />
      <div className="absolute top-1/2 flex w-full justify-center">
        <SearchBar
          placeholder="Search for Locations, Classes, Trainers"
          screenReaderInstructionsId="SearchBar__srInstructions"
          customCssClasses={{ container: 'font-body' }}
        />
      </div>
    </div>
  );
}
