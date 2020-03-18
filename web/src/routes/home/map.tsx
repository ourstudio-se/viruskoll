import { GoogleMap, useLoadScript, useGoogleMap } from '@react-google-maps/api'
import React, { useRef } from 'react'
import { ICoordinates } from './models'

const options = {
  scrollwheel: false,
}

interface Map {
  coordinates: ICoordinates,
  onUpdateCoordinates: (nextCoordinates: ICoordinates) => void;
}

const Map = ({
  coordinates
}: Map) => {
  const map = useRef()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8"
  })

  const onDragEnd = () => {
    const c = map.current.state.map.getCenter();
    const lat = c.lat();
    const lng = c.lng();
    console.log('hehe', map.current, lat, lng, map.current.state.map.getBounds());
  };

  const renderMap = () => {
    return <GoogleMap
      ref={map}
      options={options}
      center={coordinates}
      zoom={5}
      mapContainerStyle={{
          height: '100%',
          width: '100%'
      }}
      onDragEnd={onDragEnd}
    >
      {
        // ...Your map components
      }
    </GoogleMap>
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <p>loading....</p>
}


export default Map;
