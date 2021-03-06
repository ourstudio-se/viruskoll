import styled, { css } from 'styled-components';

import { Link, LinkProps } from 'react-router-dom';

import { size } from '../../layout/helpers';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: ${(props) => props.theme.distances.headerHeight};
  padding: 0 ${size(3)};
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.textOnPrimary};
  z-index: 10;

  ${(props) => props.theme.breakpoint.LtSm} {
    padding: 0 ${size(2)};
  }

  ${(props) => props.theme.breakpoint.Sm} {
    position: sticky;
    top: 0;
  }

  ${(props) => props.theme.breakpoint.LtMd} {
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: space-between;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const Logo = styled(Link)`
  flex-shrink: 0;
  padding-right: ${size(3)};

  ${(props) => props.theme.breakpoint.LtMd} {
    display: flex;
    align-items: center;
    height: ${(props) => props.theme.distances.headerHeight};
    padding-right: ${size(2)};
  }

  .logo {
    display: block;
    width: 120px;
  }

  .logo-text {
    fill: ${(props) => props.theme.color.textOnPrimary};
  }

  .logo-brand {
    fill: ${(props) => props.theme.color.action};
  }

  .logo-brand-light {
    fill: ${(props) => props.theme.color.actionLight};
  }
`;

export const LogoImg = styled.img`
  display: block;
`;

export const NavMain = styled.nav`
  flex: 1 1 auto;

  ${(props) => props.theme.breakpoint.LtMd} {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 100%;
    order: 1;
    height: ${(props) => props.theme.distances.headerHeight};
    background-color: ${(props) => props.theme.color.bg};
    margin: 0 ${size(-3)};
    padding: 0 ${size(3)};
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  ${(props) => props.theme.breakpoint.LtSm} {
    margin: 0 ${size(-2)};
    padding: 0 ${size(2)};
  }
`;

export const NavAlt = styled.nav`
  flex-shrink: 0;

  ${(props) => props.theme.breakpoint.LtMd} {
    display: flex;
    align-items: center;
    height: ${(props) => props.theme.distances.headerHeight};
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  display: block;
`;

type NavLinkProps = LinkProps & {
  active?: boolean | string;
  highlight?: boolean | string;
};

export const NavLink = styled(Link)<NavLinkProps>`
  display: block;
  padding: ${size(1)} ${size(3)};
  border-radius: 4px;
  color: ${(props) => props.theme.color.textOnPrimaryLighten};
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;
  white-space: nowrap;

  :hover {
    color: ${(props) => props.theme.color.textOnPrimary};
  }

  ${(props) => props.theme.breakpoint.LtMd} {
    color: ${(props) => props.theme.color.textDark};

    :hover {
      color: ${(props) => props.theme.color.textDark};
    }
  }

  ${({ active }) =>
    active &&
    css`
      background-color: rgba(255, 255, 255, 0.1);
      color: ${(props) => props.theme.color.textOnPrimary};

      ${(props) => props.theme.breakpoint.LtMd} {
        background-color: rgba(0, 0, 0, 0.1);
        color: ${(props) => props.theme.color.textDark};
      }
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

      ${(props) => props.theme.breakpoint.LtMd} {
        background-color: ${(props) => props.theme.color.action};
        color: ${(props) => props.theme.color.textOnAction};
      }
    `}
`;
