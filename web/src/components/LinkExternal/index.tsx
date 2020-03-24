import styled from 'styled-components';

const LinkExternal = styled.a`
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

export default LinkExternal;
