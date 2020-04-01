import * as React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import Loader from '../components/Loader';

const NotFound = React.lazy(() => import('./not-found'));
const Home = React.lazy(() => import('./home'));
const Join = React.lazy(() => import('./join/index'));
const About = React.lazy(() => import('./about'));
const Gdpr = React.lazy(() => import('./gdpr'));
const UserVerify = React.lazy(() => import('./user/verify'));
const UserLog = React.lazy(() => import('./user/log'));

interface RouteModel {
  exact?: boolean;
  path: string;
  title: string;
  component:
    | React.LazyExoticComponent<() => JSX.Element>
    | JSX.Element
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const siteName = 'Viruskoll.se';

export const RouterTree: RouteModel[] = [
  {
    exact: true,
    path: '/',
    title: 'Start',
    component: Home,
  },
  {
    path: '/join',
    title: 'Registrera dig',
    component: Join,
  },
  {
    path: '/about',
    title: 'Om',
    component: About,
  },
  {
    path: '/gdpr',
    title: 'GDPR',
    component: Gdpr,
  },
  {
    path: '/user/:id/log/:type',
    title: 'Registrera status',
    component: UserLog,
  },
  {
    path: '/user/:id/verify',
    title: 'Verifiera e-post',
    component: UserVerify,
  },
];

const Router = (): JSX.Element => (
  <React.Suspense fallback={<Loader spacing="" />}>
    <Switch>
      {RouterTree.map((r: RouteModel) => (
        <Route
          exact={r.exact}
          key={r.path}
          path={r.path}
          render={() => {
            document.title = `${r.title} - ${siteName}`;
            return React.createElement(r.component);
          }}
        />
      ))}
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
);

export default Router;
