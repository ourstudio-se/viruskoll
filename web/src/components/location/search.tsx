import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import React, { useRef } from 'react';
import InputText from '../InputText';

const libraries = ['places'];

const LocationSearch = ({}) => {
    const [selectedLocation, setSelectedLocation] = React.useState();
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
        libraries,
    });
    const searchBox = useRef();
    const onPlacesChanged = () => {console.log(searchBox.current.getPlaces())};
    const onClick = () => {
        console.log(searchBox.current)
    }
    
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
                label="Lägg till plats"
                placeholder="Sök plats..."
                id="join-person-location"
                name="location"
                description="Ange den plats där du oftast befinner dig, såsom ditt hem."
                action="Lägg till"
                onClick={onClick}
            />
    </StandaloneSearchBox>
    )

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return isLoaded ? render() : <p>loading....</p>; 
}

export default LocationSearch;