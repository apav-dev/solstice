// import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
// import { universalResultsConfig } from '../config/universalResultsConfig';
import { LayoutComponent } from '../PageRouter';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import { SolsticeHeader } from '../components/SolsticeHeader';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';
import { universalResultsConfig } from '../config/universalResultsConfig';
import Navigation from '../components/Navigation';

const navLinks = [
  {
    to: '/',
    label: 'All',
  },
  ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
    to: verticalKey,
    label: config.label || verticalKey,
  })),
];

/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const screenSize = useContext(ResponsiveContext);

  const isVertical = useAnswersState((state) => state.meta.searchType) === SearchTypeEnum.Vertical;
  const verticalKey = useAnswersState((state) => state.vertical.verticalKey);

  return (
    <>
      <SolsticeHeader />
      <div className="flex items-center justify-between space-x-40">
        <div className="mt-4 flex w-full flex-col space-y-4 sm:flex-row sm:justify-between">
          <div className="font-heading text-5xl font-black md:text-7xl">{`Search ${
            isVertical ? verticalKey && verticalKey.charAt(0).toUpperCase() + verticalKey.slice(1) : 'Results'
          }`}</div>
          {isVertical ? (
            <SearchBar placeholder="Search..." screenReaderInstructionsId="SearchBar__srInstructions" />
          ) : (
            <SampleVisualSearchBar />
          )}
        </div>
      </div>
      <Navigation
        links={navLinks}
        customCssClasses={{
          navLink:
            'font-heading text-white whitespace-nowrap py-4 px-1 font-medium text-md border-b-2 border-opacity-0 hover:border-gray-300',
          activeNavLink: 'text-gold border-gold border-b-2 border-opacity-100 hover:border-gold',
        }}
        cssCompositionMethod="assign"
      />
      {page}
    </>
  );
};
export default StandardLayout;
