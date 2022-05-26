import { useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';

import { selectedLocations } from './Home'
import { addMarker, searchOptions, retMap, addDestinationMarker} from './MapFunctions'
import SetMap from './SetMap'

export default function SelectMap(props) {


    const [map, setMap] = useState({})
    const [renderChildMap, setRenderChildMap] = useState(false)

    // Empire State Building
    const [longitude] = useState(-73.98569658149867)
    const [latitude] = useState(40.74861114703435)

    // JIIT 128
    // const [longitude] = useState(77.365438)
    // const [latitude] = useState(28.519200)

    useEffect(() => {

        // Show the map
        // var map = retMap(props.mapElement, '-73.98569658149867', '40.74861114703435')
        var map = retMap(props.mapElement, longitude, latitude)
        setMap(map) // render map
        
        // var map = retMap(props.mapElement, longitude, latitude)

        let firstClick = false

        const ttSearchBox = new SearchBox(services, searchOptions);

        ttSearchBox.on('tomtom.searchbox.resultselected', function (res) {
            if (res.data.result.type !== undefined && res.data.result.type === "POI") {

                if(firstClick === false)
                {
                    addMarker(res.data.result.position, map)
                    firstClick = true
                }
                else
                        addDestinationMarker(res.data.result.position, map)    

                selectedLocations.push({ id: res.data.result.id, name: res.data.result.poi.name, lngLat: { lng: res.data.result.position.lng, lat: res.data.result.position.lat } })
                console.log(selectedLocations)
            }
        });
        map.addControl(ttSearchBox, 'top-left');
        map.addControl(new tt.NavigationControl())

        map.on('click', (e) => {
            var touchingLayer = map.queryRenderedFeatures(e.point)[0];// top layer
            if (touchingLayer !== undefined) {
                if (touchingLayer.layer.id === "POI" && touchingLayer.properties.id !== undefined)
                {
                    // console.log("id->"+touchingLayer.properties.id)
                    if(firstClick === false)
                    {
                        addMarker(e.lngLat, map)
                        firstClick = true
                    }
                    else
                        addDestinationMarker(e.lngLat, map)    
                        
                    selectedLocations.push({ id: touchingLayer.properties.id, name: touchingLayer.properties.name, lngLat: { lng: touchingLayer.geometry.coordinates[0], lat: touchingLayer.geometry.coordinates[1] } })
                    console.log(selectedLocations)
                }
            }
        })

        return () => map.remove()
    }, [latitude, longitude, renderChildMap, props.mapElement])

    return (
        <>
            {map && 
            (renderChildMap ?
                <SetMap mapElement={props.mapElement} /> :
                <div className="app">
                    <div id="search-panel" className="col"></div>
                    <div ref={props.mapElement} className="map" id="map" />
                    <div className='text-center'>
                        <label className="btn btn-primary" onClick={() => setRenderChildMap(true)}>Calculate</label>
                    </div>
                </div>
            )}



        </>
    )
}