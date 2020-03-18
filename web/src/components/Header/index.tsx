import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as H from 'history';

import {
  Wrapper,
  Logo,
  LogoImg,
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
}: RouteComponentProps) => (
  <Wrapper>
    <Logo>
      <LogoImg src="http://placehold.it/100x36" alt="Viruskollen" />
    </Logo>
    <NavMain>
      <NavList>
        <NavItem>
          <NavLink to="/" active={isActive('/', location)}>
            Map
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" active={isActive('/about', location)}>
            About
          </NavLink>
        </NavItem>
      </NavList>
    </NavMain>
    <NavAlt>
      <NavList>
        <NavItem>
          <NavLink to="/join" active={isActive('/join', location)} highlight="">
            Registrera
          </NavLink>
        </NavItem>
      </NavList>
    </NavAlt>
  </Wrapper>
);

export default withRouter(Header);
