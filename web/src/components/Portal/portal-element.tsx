import * as React from 'react';

export interface IPortalElement {
  id: string;
  className?: string;
}

const PortalElement = ({ id, className }: IPortalElement) => <div className={className} id={id} />;

export default PortalElement;
