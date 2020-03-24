import { useEffect } from 'react';

const useTrackView = () => {
  useEffect(() => {
    dataLayer.push({
      event: 'AsyncPageView',
    });
  }, []);
};

export default useTrackView;
