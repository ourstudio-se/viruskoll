import { GoogleMap, useLoadScript, useGoogleMap } from '@react-google-maps/api'
import React, { useRef } from 'react'
import { ICoordinates, InitialMapOptions } from './models'

const options = {
  scrollwheel: false,
}

interface Map {
  initialOptions: InitialMapOptions;
  onMapUpdate: (bounds: google.maps.LatLngBounds, zoom: number) => void;
}

const Map = ({
  initialOptions,
  onMapUpdate
}: Map) => {
  const mapRef = useRef<GoogleMap>()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8"
  })

  const onDragEnd = () => {
    if (mapRef.current) {
      const { map } = mapRef.current.state
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      onMapUpdate(bounds, zoom);
      console.log(bounds, zoom);
    }
  };

  const renderMap = () => {
    return <GoogleMap
      ref={mapRef}
      options={options}
      center={initialOptions.center}
      zoom={initialOptions.zoom}
      mapContainerStyle={{
          height: '100%',
          width: '100%'
      }}
      onDragEnd={onDragEnd}
      onZoomChanged={onDragEnd}
      onTilesLoaded={onDragEnd}
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
