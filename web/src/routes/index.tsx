import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

const NotFound = React.lazy(() => import('./not-found'));
const Home = React.lazy(() => import('./home'));

interface IRoute {
  exact?: boolean,
  path: string,
  title: string,
  component: any,
}

export const RouterTree: IRoute[] = [
  {
    exact: true,
    path: '/',
    title: 'Home',
    component: Home,
  },
];

const Router = () => (
  <React.Suspense fallback={<p>Laddar...</p>}>
    <Switch>
      {RouterTree.map((r: IRoute) =>
        <Route key={r.path} {...r} />,
      )}
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
);

export default Router;
