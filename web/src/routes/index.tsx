import * as React from 'react';
import { Route, Switch, RouteProps, RouteComponentProps } from 'react-router-dom';

const NotFound = React.lazy(() => import('./not-found'));
const Home = React.lazy(() => import('./home'));
const Join = React.lazy(() => import('./join/index'));
const About = React.lazy(() => import('./about'));

interface RouteModel {
  exact?: boolean;
  path: string;
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element> | JSX.Element | React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const RouterTree: RouteModel[] = [
  {
    exact: true,
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '/join',
    title: 'Join',
    component: Join,
  },
  {
    path: '/about',
    title: 'About',
    component: About,
  },
];

const Router = (): JSX.Element => (
  <React.Suspense fallback={<p>Laddar...</p>}>
    <Switch>
      {RouterTree.map((r: RouteModel) =>
        <Route key={r.path} {...r as RouteProps} />,
      )}
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
);

export default Router;
