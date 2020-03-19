import React from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

import InputSearch from '../InputSearch';
const libraries = ['places'];

const MapSearch = ({ onLocationSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
    libraries,
  });
  const searchBox = React.useRef<google.maps.places.Autocomplete>();

  const onPlacesChanged = () => {
    const placeResult = searchBox.current.getPlace()
    if (placeResult && placeResult.address_components) {
      onLocationSelect(placeResult.geometry.location)
    }
  };

  const render = () => (
    <Autocomplete
      onLoad={(ref) => {
        searchBox.current = ref;
      }}
      onPlaceChanged={
        onPlacesChanged
      }
      >
        <InputSearch
          placeholder="Sök plats..."
          id="map-search"
          label="Sök plats"
        />
    </Autocomplete>
  )

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? render() : <p>loading....</p>;
}

export default MapSearch;
