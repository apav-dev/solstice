import ClassesPage from '../pages/ClassesPage';
import LocationsPage from '../pages/LocationsPage';
import UniversalSearchPage from '../pages/UniversalSearchPage';
import { universalResultsConfig } from './universalResultsConfig';
// import LocationsPage from '../pages/LocationsPage'; 

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />
  },
  {
    path: '/locations',
    page: <LocationsPage verticalKey='locations' />
  },
  {
    path: '/classes',
    page: <ClassesPage verticalKey='classes' />
  }
];