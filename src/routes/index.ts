import * as paths from './const';

import mainPage from '../pages/main';
import contentPage from '../pages/content';

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
      component: mainPage,
    },
  ],
  content: [
    {
      path: paths.ROUTE_CONTENT,
      component: contentPage,
    },
  ],
};
