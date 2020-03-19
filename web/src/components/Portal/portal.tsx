import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface Portal {
  id: string;
  children: JSX.Element[] | JSX.Element;
}

const Portal = ({ id, children }: Portal) => {
  const el = React.useRef(document.getElementById(id) || document.createElement('div'));
  if (!el.current) {
    return null;
  }

  const { current } = el;

  const [dynamic] = React.useState(!current.parentElement);

  React.useEffect(() => {
    if (dynamic) {
      current.id = id;
      if (document.body) {
        document.body.appendChild(current);
      }
    }
    return () => {
      if (dynamic && current.parentElement) {
        current.parentElement.removeChild(current);
      }
    };
  }, [id]);

  return ReactDOM.createPortal(children, current);
};

export default React.memo<Portal>(Portal);
