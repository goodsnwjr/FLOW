import * as paths from './const';

import * as pages from 'pages';

interface RoutesOption {
  path: string;
  component: React.FunctionComponent;
}

export const routes: RoutesOption = {
  path: paths.ROUTE_ROOT,
  component: pages.main,
};
