import * as paths from './const';

import MainPage from '../pages/main';
import ContentPage from '../pages/content';

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
