import { useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import LocationsAdded from './LocationsAdded'

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';

// Selected Locations Array
import {selectedLocations} from './Home'
import {addDestinationMarker, addMarker, recalculatePaths, retMap} from './MapFunctions'

export default function SetMap(props) {

    const [map, setMap] = useState({})
    const [latitude] = useState(28.519200)
    const [longitude] = useState(77.365438)

    useEffect(() => {
        
        var map = retMap(props.mapElement, longitude, latitude)
        setMap(map)
        map.addControl(new tt.NavigationControl())

        // Origin
        var origin = { lng: selectedLocations[0].lngLat.lng, lat: selectedLocations[0].lngLat.lat }
        addMarker(origin, map)

        // Destinations List
        const destinations = []
        for(let i = 1; i < selectedLocations.length; i++)
        {
            destinations.push(selectedLocations[i].lngLat)
            addDestinationMarker(selectedLocations[i].lngLat, map)
        }
        recalculatePaths(destinations, origin, map)


        return () => map.remove()
    }, [latitude, longitude, props.mapElement])

    return (
        <>
            {map && <div className="app">
                <div id="search-panel" className="col"></div>
                <div ref={props.mapElement} className="map" id="map" />
                <LocationsAdded list={selectedLocations} />
            </div>}
        </>
    )
}
