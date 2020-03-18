import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Dashboard = styled.div`
  ${(props) => props.theme.breakpoint.Md} {
    flex: 1 1 auto;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }
`;

export const DashboardMap = styled.div`
  ${(props) => props.theme.breakpoint.LtMd} {
    height: 300px;
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
  }
`;
