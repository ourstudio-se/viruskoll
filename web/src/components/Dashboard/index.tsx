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
  ${(props) => props.theme.breakpoint.LtMd} {
    height: 60vh;
    min-height: 300px;
  }

  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 1 auto;
  }
`;

export const DashboardContent = styled.div`
  padding: ${size(4)} 0;

  ${(props) => props.theme.breakpoint.Md} {
    flex-shrink: 0;
    width: 500px;
    min-widht: 500px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
`;
