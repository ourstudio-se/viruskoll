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
            <NavLink href="#" active>
              Link
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              Link
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              Link
            </NavLink>
          </NavItem>
        </NavList>
      </NavMain>
      <NavAlt>
        <NavList>
          <NavItem>
            <NavLink href="#" highlight>
              Registrera
            </NavLink>
          </NavItem>
        </NavList>
      </NavAlt>
    </Nav>
  </Wrapper>
);

export default Header;
