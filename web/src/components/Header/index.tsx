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
  to.localeCompare(location.pathname) === 0
    ? 'true'
    : undefined;

const Header = ({
  location,
}: RouteComponentProps): JSX.Element => (
  <Wrapper>
    <Logo to="/">
      Viruskoll.se
    </Logo>
    <NavMain>
      <NavList>
        <NavItem>
          <NavLink to="/" active={isActive('/', location)}>
            Karta
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" active={isActive('/about', location)}>
            Om Viruskoll
          </NavLink>
        </NavItem>
      </NavList>
    </NavMain>
    <NavAlt>
      <NavList>
        <NavItem>
          <NavLink to="/join" active={isActive('/join', location)} highlight>
            Registrera
          </NavLink>
        </NavItem>
      </NavList>
    </NavAlt>
  </Wrapper>
);

export default withRouter(Header);
