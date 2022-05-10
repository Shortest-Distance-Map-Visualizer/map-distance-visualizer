import { useRef, useEffect, useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps'

export default function Map() {

    const mapElement = useRef()
    const [map, setMap] = useState({})

    useEffect(() => {
        let map = tt.map({
            key: process.env.REACT_APP_API_KEY,
            container: mapElement.current
        });
        setMap(map)
        // map.addControl(new tt.FullscreenControl());
        // map.addControl(new tt.NavigationControl());

    }, [])

    return (
        <div className="app">
          <div ref={mapElement} className="map" id="map"></div>
        </div>
    )
}
