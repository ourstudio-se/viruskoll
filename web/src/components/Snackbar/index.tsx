import React from 'react';

import {
  Wrapper,
  Icon,
  Content,
  Heading,
  Message,
} from './wrapper';

import {
  IconCheck,
  IconInfo,
  IconExclamationCircle,
  IconExclamationTriangle,
} from '../Icon';

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
  let iconSelector = <IconInfo block/>;
  if (severity === 'error') {
    iconSelector = (
      <IconExclamationCircle block />
    );
  } else if (severity === 'warning') {
    iconSelector = (
      <IconExclamationTriangle block/>
    );
  } else if (severity === 'success') {
    iconSelector = (
      <IconCheck block />
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
