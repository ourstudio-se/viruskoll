import * as React from 'react';
import { Link as ReactLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(ReactLink)`
  color: ${(props) => props.theme.color.link};
  text-decoration: none;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  :visited {
    color: ${(props) => props.theme.color.link};
  }
`;

const Link = (props: LinkProps) => <StyledLink {...props} />;

export default Link;
