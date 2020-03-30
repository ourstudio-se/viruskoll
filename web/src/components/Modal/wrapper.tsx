import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { fadeIn, noTransform } from '../../layout/keyframes';

import { ButtonReset } from '../Button';

import { DialogProps } from './index';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  white-space: normal;
  text-align: left;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.breakpoint.Sm} {
    padding: ${size(2)};
  }
`;

export const UiBlock = styled.div.attrs(() => ({
  'aria-hidden': 'true',
  role: 'button',
}))`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.15);
  z-index: -1;

  ${(props) => props.theme.breakpoint.LtMd} {
    animation: ${fadeIn} 300ms ease forwards;
  }

  ${(props) => props.theme.breakpoint.Md} {
    animation: ${fadeIn} 400ms ease forwards;
  }
`;

export const Dialog = styled.article<DialogProps>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.bg};
  border-radius: 4px;
  z-index: 1;
  width: 100%;
  max-height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  ${(props) => props.size && css`
    ${props.theme.breakpoint.Sm} {
      max-width: ${props.size === "large" ? "800px" : "500px"};
    }
  `}

  ${(props) => props.theme.breakpoint.LtSm} {
    align-self: flex-end;
    transform: translateY(100%);
    animation: ${noTransform} 300ms ease forwards;
  }

  ${(props) => props.theme.breakpoint.Sm} {
    transform: translateY(${size(2)});
    animation: ${fadeIn} 400ms ease, ${noTransform} 400ms ease forwards;
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: ${size(3)};
  padding-bottom: 0;
`;

export const Heading = styled.div`
  flex: 1 1 auto;
`;

export const Close = styled.div`
  flex-shrink: 0;
  margin: ${size(-3)};
`;

export const CloseBtn = styled(ButtonReset)`
  display: block;
  padding: ${size(3)};
`;

export const Body = styled.div`
  padding: ${size(3)};
`;

export const Footer = styled.footer`
  flex-shrink: 0;
  padding: ${size(3)};
  border-top: 1px solid ${(props) => props.theme.color.border};
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const Action = styled.div`
  flex: 1 1 50%;
  padding: 0 ${size(1)};

  :first-child {
    padding-left: 0;
  }

  :last-child {
    padding-right: 0;
  }
`;
