import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import React, { useRef } from 'react';
import InputText from '../InputText';
import { Location } from '../../@types/location';

const getZip = (placeResult: google.maps.places.PlaceResult) => {
  const result = placeResult.address_components.find((a) => a.types.includes('postal_code'));
  if (result) {
    return result.long_name;
  }
  return undefined;
};

const getStreet = (placeResult: google.maps.places.PlaceResult) => {
  const street = placeResult.address_components.find((a) => a.types.includes('route'));
  if (street) {
    const number = placeResult.address_components.find((a) => a.types.includes('street_number'));
    if (number) {
      return `${street.long_name} ${number.long_name}`;
    }
    return street.long_name;
  }
  return undefined;
};

const getCountry = (placeResult: google.maps.places.PlaceResult) => {
  const country = placeResult.address_components.find((a) => a.types.includes('country'));
  if (country) {
    return country.long_name;
  }
  return undefined;
};


const getCity = (placeResult: google.maps.places.PlaceResult) => {
  const city = placeResult.address_components.find((a) => a.types.includes('postal_town'));
  if (city) {
    return city.long_name;
  }
  return undefined;
};

const libraries = ['places'];

interface LocationSearch {
  onAddLocation: (location: Location) => void;
  label: string;
  description: string;
  action: string;
  placeholder: string;
}

const LocationSearch = ({
  onAddLocation, label, description, action, placeholder,
}) => {
  const [selectedLocation, setSelectedLocation] = React.useState<Location | undefined>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
    libraries,
  });
  const searchBox = useRef<google.maps.places.SearchBox>();
  const onPlacesChanged = () => {
    const placeResults = searchBox.current.getPlaces();
    const placeResult = placeResults[0];

    const city = getCity(placeResult);
    const country = getCountry(placeResult);
    const street = getStreet(placeResult);
    const zip = getZip(placeResult);

    const location: Location = {
      city,
      country,
      geolocation: {
        lat: placeResult.geometry.location.lat(),
        lon: placeResult.geometry.location.lng(),
      },
      name: placeResult.formatted_address,
      street,
      zip,
    };
    setSelectedLocation(location);
  };
  const onClick = () => {
    onAddLocation(selectedLocation);
    setSelectedLocation(undefined);
  };

  const render = () => (
    <StandaloneSearchBox
      onLoad={(ref) => {
        searchBox.current = ref;
      }}
      onPlacesChanged={
        onPlacesChanged
      }
    >
      <InputText
        label={label}
        placeholder={placeholder}
        id="join-person-location"
        name="location"
        description={description}
        action={action}
        onClick={onClick}
        disabledAction={!selectedLocation ? true : undefined}
      />
    </StandaloneSearchBox>
  );

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? render() : <p>loading....</p>;
};

export default LocationSearch;
