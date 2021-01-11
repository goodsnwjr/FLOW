import * as paths from './const';

import { MainPage, ContentPage } from '../pages';

interface RoutesName {
  main: RoutesOption[];
  content: RoutesOption[];
}

interface RoutesOption {
  path: string;
  component: React.FunctionComponent;
}

export const routes: RoutesName = {
  main: [
    {
      path: paths.ROUTE_ROOT,
      component: MainPage,
    },
  ],
  content: [
    {
      path: paths.ROUTE_CONTENT,
      component: ContentPage,
    },
  ],
};
