import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

import { size } from '../../layout/helpers';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: ${(props) => props.theme.distances.headerHeight};
  padding: 0 ${size(3)};
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.textOnPrimary};

  ${(props) => props.theme.breakpoint.LtSm} {
    padding: 0 ${size(2)};
  }
`;

export const Logo = styled.div`
  flex-shrink: 0;
  padding-right: ${size(4)};
`;

export const LogoImg = styled.img`
  display: block;
`;

export const Nav = styled.nav`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(props) => props.theme.breakpoint.LtMd} {
    justify-content: flex-end;
  }
`;

export const NavMain = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    display: none;
  }
`;

export const NavAlt = styled.div`

`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  ${(props) => props.theme.breakpoint.Md} {
    display: flex;
    align-items: center;
  }
`;

export const NavItem = styled.li`
  display: block;
`;

type NavLinkProps = Link & {
  active?: boolean;
  highlight?: boolean;
};

export const NavLink = styled(Link)<NavLinkProps>`
  display: block;
  padding: ${size(1)} ${size(3)};
  border-radius: 4px;
  color: ${(props) => props.theme.color.textOnPrimaryLighten};
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;

  :hover {
    color: ${(props) => props.theme.color.textOnPrimary};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
      color: ${(props) => props.theme.color.textOnPrimary};
    `}

  ${({ highlight }) =>
    highlight &&
    css`
      background-color: ${(props) => props.theme.color.action};
      color: ${(props) => props.theme.color.textOnAction};

      :hover {
        background-color: ${(props) => props.theme.color.actionHover};
        color: ${(props) => props.theme.color.textOnAction};
      }
    `}
`;
