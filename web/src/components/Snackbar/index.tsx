import React from 'react';

import {
  Wrapper,
  Icon,
  Content,
  Heading,
  Message,
} from './wrapper';

interface Props {
  severity?: string;
  icon?: boolean;
  heading?: string;
  children: JSX.Element | JSX.Element[];
}

const Snackbar = ({
  severity,
  icon,
  heading,
  children,
}: Props): JSX.Element => {
  let iconSelector = <>INFO</>;
  if (severity === 'error') {
    iconSelector = (
      <>ExclamationIcon</>
    );
  } else if (severity === 'warning') {
    iconSelector = (
      <>ExclamationIcon</>
    );
  } else if (severity === 'success') {
    iconSelector = (
      <>Check</>
    );
  }

  return (
    <Wrapper severity={severity}>
      {icon && (
        <Icon>
          {iconSelector}
        </Icon>
      )}
      <Content>
        {heading && (
          <Heading>
            {heading}
          </Heading>
        )}
        <Message>
          {children}
        </Message>
      </Content>
    </Wrapper>
  );
};

export default Snackbar;
