// import Navigation from '../components/Navigation';
import { SearchTypeEnum, useAnswersState } from '@yext/answers-headless-react';
// import { universalResultsConfig } from '../config/universalResultsConfig';
import { LayoutComponent } from '../PageRouter';
import SearchBar from '../components/SearchBar';
import SampleVisualSearchBar from '../components/VisualAutocomplete/SampleVisualSearchBar';
import { SolsticeHeader } from '../components/SolsticeHeader';
import { ResponsiveContext } from '../App';
import { useContext } from 'react';

// const navLinks = [
//   {
//     to: '/',
//     label: 'All'
//   },
//   ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
//     to: verticalKey,
//     label: config.label || verticalKey
//   }))
// ]

/**
 * A LayoutComponent that provides a SearchBar and Navigation tabs to a given page.
 */
const StandardLayout: LayoutComponent = ({ page }) => {
  const isMobile = useContext(ResponsiveContext);

  const isVertical = useAnswersState((state) => state.meta.searchType) === SearchTypeEnum.Vertical;
  const verticalKey = useAnswersState((state) => state.vertical.verticalKey);

  return (
    <>
      <SolsticeHeader />
      {
        !isMobile && (
          <div className="flex items-center justify-between space-x-40">
            <div className="font-heading text-8xl font-black">{`Search ${isVertical ? verticalKey : 'Results'}`}</div>
            {isVertical ? (
              <SearchBar placeholder="Search..." screenReaderInstructionsId="SearchBar__srInstructions" />
            ) : (
              <SampleVisualSearchBar />
            )}
          </div>
        )
        // {/* <Navigation links={navLinks} /> */}
      }
      {page}
    </>
  );
};
export default StandardLayout;
