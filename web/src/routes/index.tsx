import * as React from 'react';
import {
  Route,
  Switch,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import Loader from '../components/Loader';

const NotFound = React.lazy(() => import('./not-found'));
const Home = React.lazy(() => import('./home'));
const Join = React.lazy(() => import('./join/index'));
const About = React.lazy(() => import('./about'));
const Gdpr = React.lazy(() => import('./gdpr'));
const Organization = React.lazy(() => import('./organization'));
const OrganizationVerify = React.lazy(() => import('./organization/verify'));
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
  {
    path: '/gdpr',
    title: 'Gdpr',
    component: Gdpr,
  },
  {
    path: '/organization/:id/verify',
    title: 'Organization verify',
    component: OrganizationVerify,
  },
  {
    path: '/organization/:id',
    title: 'Organization',
    component: Organization,
  },
  {
    path: '/user/:id/log/:type',
    title: 'User log',
    component: UserLog,
  },
  {
    path: '/user/:id/verify',
    title: 'User verify',
    component: UserVerify,
  },
];

const Router = (): JSX.Element => (
  <React.Suspense fallback={<Loader spacing="" />}>
    <Switch>
      {RouterTree.map((r: RouteModel) => (
        <Route key={r.path} {...(r as RouteProps)} />
      ))}
      <Route component={NotFound} />
    </Switch>
  </React.Suspense>
);

export default Router;
