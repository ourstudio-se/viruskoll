import React from 'react';

import {
  Wrapper,
  NavMain,
  NavAlt,
  NavList,
  NavItem,
  NavLink,
} from './wrapper';

const Header = () => (
  <Wrapper>
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
  </Wrapper>
);

export default Header;
