import { keyframes } from 'styled-components';

export const noTransform = keyframes`
    to {
        transform: none;
    }
`;

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const rotate = keyframes`
    to {
        transform: rotate(360deg);
    }
`;
