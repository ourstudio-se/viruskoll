import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { noTransform, fadeIn } from '../../layout/keyframes';

import { ButtonReset } from '../Button';

export const Dashboard = styled.main`
  flex: 1 1 auto;
  display: flex;

  ${(props) => props.theme.breakpoint.LtMd} {
    flex-direction: column;
  }

  ${(props) => props.theme.breakpoint.Md} {
    align-items: stretch;
    overflow: hidden;
  }
`;

export const DashboardMap = styled.div`
  flex: 1 1 auto;
  position: relative;
  background-color: ${(props) => props.theme.color.accent};

  ${(props) => props.theme.breakpoint.LtMd} {
    display: flex;
    flex-direction: column;

    > * {
      flex: 1 1 auto;
    }
  }
`;

export const MapInfo = styled(ButtonReset)`
  position: absolute;
  top: ${size(1)};
  left: ${size(1)};
  display: block;
  padding: ${size(1)};
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.textOnPrimary};
  border-radius: 4px;
  font-size: 1.35rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transform-origin: 50% 50%;
  transition: transform 200ms ease;

  :focus {
    outline: none;
  }

  :active {
    transform: scale(0.95);
  }
`;

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.breakpoint.LtMd} {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: none;
    flex-direction: column;
    justify-content: flex-end;

    &.is-visible {
      display: flex;
    }
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex-shrink: 0;
    width: 375px;
    min-widht: 375px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  ${(props) => props.theme.breakpoint.Lg} {
    width: 500px;
    min-widht: 500px;
  }
`;

export const DashboardContentUiBlock = styled(ButtonReset)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 300ms ease forwards;
  z-index: -1;

  ${(props) => props.theme.breakpoint.Md} {
    display: none;
  }
`;

export const DashboardContentTray = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${(props) => props.theme.color.bg};

  ${(props) => props.theme.breakpoint.LtMd} {
    height: auto;
    flex: none;
    max-height: 100%;
    transform: translateY(100%);
    animation: ${noTransform} 300ms ease forwards;
  }
`;

export const DashboardContentHeader = styled.header`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.distances.headerHeight};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const HeaderHeading = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  padding: 0 ${size(3)};
  font-size: 1.125rem;
  font-weight: 700;
  overflow-wrap: break-word;
  hyphens: auto;
`;
export const HeaderAction = styled.div`
  flex-shrink: 0;
  padding-right: ${size(3)};

  ${(props) => props.theme.breakpoint.Md} {
    display: none;
  }
`;
export const CloseBtn = styled(ButtonReset)`
  display: block;
  padding: ${size(2)};
  margin: ${size(-2)};
  font-size: 1.35rem;
`;

export const DashboardContentBody = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: ${size(4)} 0;
`;

export const DashboardContentFooter = styled.footer`
  ${(props) => props.theme.breakpoint.LtMd} {
    padding-bottom: ${size(4)};
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex-shrink: 0;
    padding: ${size(3)} 0;
    border-top: 1px solid ${(props) => props.theme.color.border};
  }
`;

export const DashboardFooter = styled.footer`
  flex-shrink: 0;
  padding: ${size(2)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${(props) => props.theme.breakpoint.Md} {
    display: none;
  }
`;
