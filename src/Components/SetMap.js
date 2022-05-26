import { useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';

// Selected Locations Array
import {selectedLocations} from './Home'
import { retMap, renderBFS, renderRandom} from './MapFunctions'
import { bfsColor, randomColor} from './Colors'
import SelectList from './SelectList'

export default function SetMap(props) {

    const [map, setMap] = useState({})
    // const [latitude] = useState(28.519200)
    // const [longitude] = useState(77.365438)
    const [latitude] = useState(selectedLocations[0].lngLat.lat)
    const [longitude] = useState(selectedLocations[0].lngLat.lng)

    
    useEffect(() => {
        
        var map = retMap(props.mapElement, longitude, latitude)
        setMap(map)
        map.addControl(new tt.NavigationControl())

        const renderPaths = async ()=>
        {
            await renderRandom(map, 'random', randomColor, 8) 
            
            await renderBFS(map, 'bfs', bfsColor, 4)
        }
        renderPaths()

        return () => map.remove()

    }, [latitude, longitude, props.mapElement])

    return (
        <>
            {map && <div className="app">
                <div id="search-panel" className="col"></div>
                <div ref={props.mapElement} className="map" id="map" />
                <label>Selected List Order</label>
                <SelectList list={selectedLocations} />
            </div>}
        </>
    )
}
