import React from 'react';

import {
  Wrapper,
  Logo,
  LogoImg,
  Nav,
  NavMain,
  NavAlt,
  NavList,
  NavItem,
  NavLink,
} from './wrapper';

const Header = () => (
  <Wrapper>
    <Logo>
      <LogoImg src="http://placehold.it/100x36" alt="Viruskollen" />
    </Logo>
    <Nav>
      <NavMain>
        <NavList>
          <NavItem>
            <NavLink to="/" active>
              Map
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/about">
              About
            </NavLink>
          </NavItem>
        </NavList>
      </NavMain>
      <NavAlt>
        <NavList>
          <NavItem>
            <NavLink to="/join" highlight>
              Registrera
            </NavLink>
          </NavItem>
        </NavList>
      </NavAlt>
    </Nav>
  </Wrapper>
);

export default Header;
