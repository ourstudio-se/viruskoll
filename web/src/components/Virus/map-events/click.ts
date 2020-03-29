const Click = (
  infoWindowRef: React.MutableRefObject<google.maps.InfoWindow | undefined>
) => {
  if (infoWindowRef.current) {
    infoWindowRef.current.close();
  }
};

export default Click;
