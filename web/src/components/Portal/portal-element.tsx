import * as React from 'react';

export interface PortalElement {
  id: string;
  className?: string;
}

const PortalElement = ({ id, className }: PortalElement) => <div className={className} id={id} />;

export default PortalElement;
