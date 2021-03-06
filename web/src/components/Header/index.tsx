import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as H from 'history';

import {
  Wrapper,
  Logo,
  NavMain,
  NavAlt,
  NavList,
  NavItem,
  NavLink,
} from './wrapper';

const isActive = (to: string, location: H.Location): string | undefined =>
  to.localeCompare(location.pathname) === 0 ? 'true' : undefined;

const Header = ({ location }: RouteComponentProps): JSX.Element => (
  <Wrapper>
    <Logo to="/" title="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 479.8 87.2"
        aria-labelledby="logo-title"
        className="logo"
      >
        <title id="logo-title">Viruskoll.se</title>
        <path
          className="logo-text"
          d="M24.6 72.5h-.5l-10-34.4H0l16.8 48.1h15.1l16.8-48.1H34.6zM54.7 38.1h13.4v48.2H54.7zM61.4 18.3c-2 0-3.7.7-5.1 2-1.4 1.3-2.1 2.9-2.1 4.8s.7 3.5 2.1 4.8 3.1 2 5.1 2 3.7-.7 5.1-2c1.4-1.3 2.1-2.9 2.1-4.8 0-1.8-.7-3.4-2.1-4.8-1.4-1.3-3.1-2-5.1-2zM102.8 37.4c-2.7 0-5.1.8-7.1 2.3s-3.5 3.8-4.4 6.8h-.5v-8.4h-13v48.2h13.4V59c0-2 .4-3.7 1.3-5.2s2.1-2.7 3.6-3.5c1.5-.9 3.3-1.3 5.2-1.3.9 0 1.9.1 3 .2s2 .3 2.6.5V37.8c-.6-.1-1.3-.3-2-.3-.7-.1-1.4-.1-2.1-.1zM143.9 65.7c0 2.2-.4 4-1.3 5.4-.9 1.5-2 2.6-3.4 3.3-1.4.7-2.9 1.1-4.5 1.1-2.5 0-4.5-.8-6-2.5-1.5-1.6-2.3-3.9-2.3-6.7V38.1H113v30.7c0 3.8.7 7 2.1 9.7s3.3 4.8 5.7 6.2c2.5 1.5 5.3 2.2 8.5 2.2 3.6 0 6.7-.9 9.2-2.6 2.5-1.7 4.3-4 5.4-6.8h.5v8.8h12.8V38.1h-13.4v27.6zM194.3 58.3l-8.7-1.8c-2.2-.5-3.8-1.1-4.7-1.9-.9-.8-1.4-1.8-1.4-2.9 0-1.5.7-2.6 2.1-3.5s3.2-1.3 5.2-1.3c1.5 0 2.9.3 4 .8s2 1.2 2.7 2c.7.9 1.1 1.8 1.3 2.8l12.2-.8c-.6-4.4-2.6-7.9-6.1-10.5-3.5-2.6-8.3-3.9-14.4-3.9-4.1 0-7.7.6-10.8 1.8-3.1 1.2-5.4 2.9-7.1 5.2s-2.5 4.9-2.5 8c0 3.6 1.1 6.5 3.4 8.9 2.3 2.3 5.8 4 10.5 4.9l8.3 1.7c2.1.4 3.6 1 4.6 1.8 1 .8 1.5 1.8 1.5 3 0 1.5-.8 2.6-2.2 3.5-1.4.9-3.3 1.4-5.7 1.4-2.4 0-4.3-.5-5.9-1.5-1.5-1-2.5-2.5-2.9-4.4l-13.1.7c.6 4.6 2.9 8.2 6.6 10.9 3.8 2.7 8.8 4 15.2 4 4.2 0 7.9-.7 11.1-2 3.2-1.3 5.7-3.2 7.6-5.6 1.9-2.4 2.8-5.1 2.8-8.3 0-3.5-1.2-6.3-3.5-8.4-1.9-2.1-5.4-3.7-10.1-4.6zM242.8 58.9l17.8-20.8h-15.3l-15.4 18.2h-.7V22h-13.4v64.2h13.4V71l3.6-4.2 13.1 19.4h15.6z"
        />
        <g className="logo-symbol">
          <path
            className="logo-text"
            d="M290.4 75.4c-2 1-4.2 1.6-6.5 1.6-8.1 0-14.7-6.6-14.7-14.7 0-7.2 5.3-13.3 12.2-14.5V37.6C268.8 38.8 259 49.5 259 62.4c0 13.7 11.1 24.9 24.9 24.9 4.6 0 8.9-1.3 12.6-3.5l-6.1-8.4z"
          />
          <path
            className="logo-brand"
            d="M294.4 72.4l6.1 8.3c5-4.6 8.2-11.1 8.2-18.5 0-6.1-2.2-11.6-5.8-15.9l-7.2 7.4c1.8 2.4 2.8 5.4 2.8 8.6 0 3.9-1.6 7.5-4.1 10.1z"
          />
          <path
            className="logo-brand"
            d="M299.3 42.9c-3.6-2.9-8.1-4.8-13-5.3v10.3c2.1.4 4.1 1.2 5.8 2.4l7.2-7.4z"
          />
        </g>
        <path
          className="logo-text"
          d="M315.4 22v64.2h13.3V0h-13.3zM338.5 22V86.2h13.4V22z"
        />
        <path
          className="logo-brand"
          d="M369.5 87.1c-2.1 0-3.8-.7-5.3-2.2-1.5-1.5-2.2-3.2-2.2-5.3 0-2.1.7-3.8 2.2-5.3s3.2-2.2 5.3-2.2c2 0 3.8.7 5.3 2.2 1.5 1.5 2.3 3.2 2.3 5.3 0 1.4-.4 2.6-1 3.8-.7 1.1-1.6 2.1-2.7 2.7-1.3.6-2.6 1-3.9 1zM427.1 51.8l-12.2.8c-.2-1-.7-2-1.4-2.8s-1.6-1.5-2.7-2-2.5-.8-4-.8c-2.1 0-3.8.4-5.2 1.3-1.4.9-2.1 2-2.1 3.5 0 1.2.5 2.1 1.4 2.9.9.8 2.5 1.4 4.7 1.9l8.7 1.8c4.7 1 8.2 2.5 10.5 4.6s3.5 4.9 3.5 8.4c0 3.2-.9 5.9-2.8 8.3-1.9 2.4-4.4 4.2-7.6 5.6-3.2 1.3-6.9 2-11.1 2-6.4 0-11.5-1.3-15.2-4-3.8-2.7-6-6.3-6.6-10.9l13.1-.7c.4 1.9 1.4 3.4 2.9 4.4 1.5 1 3.5 1.5 5.9 1.5 2.3 0 4.2-.4 5.7-1.4s2.2-2.1 2.2-3.5c0-1.2-.5-2.2-1.5-3-1-.8-2.5-1.4-4.6-1.8l-8.3-1.7c-4.7-.9-8.2-2.6-10.5-4.9-2.3-2.3-3.4-5.3-3.4-8.9 0-3.1.8-5.8 2.5-8s4.1-4 7.1-5.2c3.1-1.2 6.6-1.8 10.8-1.8 6.1 0 10.9 1.3 14.4 3.9s5.2 6.1 5.8 10.5zM479.8 65.6v-3.7c0-4.1-.6-7.7-1.7-10.7-1.1-3.1-2.8-5.6-4.8-7.6-2.1-2-4.5-3.5-7.2-4.6-2.8-1-5.7-1.5-8.9-1.5-4.7 0-8.8 1-12.3 3.1s-6.2 5-8.1 8.8c-1.9 3.7-2.9 8.1-2.9 13 0 5.1 1 9.5 2.9 13.2s4.7 6.6 8.2 8.6c3.6 2 7.8 3 12.8 3 4 0 7.5-.6 10.5-1.8 3-1.2 5.5-2.9 7.5-5.1 1.9-2.2 3.2-4.8 3.8-7.8l-12.4-.8c-.5 1.2-1.1 2.2-2 3.1-.9.8-1.9 1.5-3.2 1.9-1.2.4-2.6.6-4.1.6-2.2 0-4.2-.5-5.8-1.4-1.6-.9-2.9-2.3-3.8-4-.9-1.7-1.3-3.8-1.3-6.2l32.8-.1zM452 48.8c1.6-.9 3.4-1.4 5.4-1.4 1.9 0 3.6.4 5.1 1.3 1.5.8 2.6 2 3.5 3.5.8 1.5 1.2 3.2 1.2 5.1H447c.1-1.7.5-3.3 1.3-4.8 1-1.5 2.2-2.8 3.7-3.7z"
        />
      </svg>
    </Logo>
    <NavMain>
      <NavList>
        <NavItem>
          <NavLink to="/" title="Statistik" active={isActive('/', location)}>
            Statistik
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/about"
            title="Om Viruskoll"
            active={isActive('/about', location)}
          >
            Om Viruskoll
          </NavLink>
        </NavItem>
      </NavList>
    </NavMain>
    <NavAlt>
      <NavList>
        <NavItem>
          <NavLink
            to="/join"
            active={isActive('/join', location)}
            highlight="true"
          >
            Registrera
          </NavLink>
        </NavItem>
      </NavList>
    </NavAlt>
  </Wrapper>
);

export default withRouter(Header);
