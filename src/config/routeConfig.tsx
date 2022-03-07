import ClassesPage from '../pages/ClassesPage';
import HomeLayout from '../pages/HomeLayout';
import LocationsPage from '../pages/LocationsPage';
import TrainersPage from '../pages/TrainersPage';
import UniversalSearchPage from '../pages/UniversalSearchPage';
import { universalResultsConfig } from './universalResultsConfig';
// import LocationsPage from '../pages/LocationsPage';

export const routeConfig = [
  {
    path: '/',
    exact: true,
    page: <HomeLayout />,
  },
  {
    path: '/all',
    exact: true,
    page: <UniversalSearchPage universalResultsConfig={universalResultsConfig} />,
  },
  {
    path: '/locations',
    page: <LocationsPage verticalKey="locations" />,
  },
  {
    path: '/classes',
    page: <ClassesPage verticalKey="classes" />,
  },
  {
    path: '/trainers',
    page: <TrainersPage verticalKey="trainers" />,
  },
];
