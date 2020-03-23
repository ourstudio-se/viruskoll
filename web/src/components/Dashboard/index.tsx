import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Dashboard = styled.main`
  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 1 auto;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }
`;

export const DashboardMap = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.accent};

  ${(props) => props.theme.breakpoint.LtMd} {
    height: 55vh;
    min-height: 300px;
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 1 auto;
  }
`;

export const DashboardContent = styled.div`
  ${(props) => props.theme.breakpoint.Md} {
    display: flex;
    flex-direction: column;
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

export const DashboardContentBody = styled.div`
  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 1 auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

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
