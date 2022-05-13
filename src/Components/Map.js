import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import LocationsAdded from './LocationsAdded'
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';

// Selected Locations Array
import {selectedLocations} from './Home'
import {addDestinationMarker, addMarker, recalculatePaths, searchOptions} from './MapFunctions'

export default function Map() {

    const mapElement = useRef()
    const [map, setMap] = useState({})
    const [latitude] = useState(28.519200)
    const [longitude] = useState(77.365438)


    useEffect(() => {
        // Destinations List
        const destinations = []

        // Show the map
        let map = tt.map({
            key: process.env.REACT_APP_API_KEY,
            container: mapElement.current,
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true,
            },
            center: [longitude, latitude],
            zoom: 14,
            // style: '../../Assets/darkWithPOI.json',
        });
        setMap(map)
        const ttSearchBox = new SearchBox(services, searchOptions);

        // ttSearchBox.on('tomtom.searchbox.resultsfound', handleResultsFound);
        // ttSearchBox.on('tomtom.searchbox.resultselected', handleResultSelection);
        // ttSearchBox.on('tomtom.searchbox.resultfocused', handleResultSelection);
        // ttSearchBox.on('tomtom.searchbox.resultscleared', handleResultClearing);


        // Origin
        var origin = { lng: longitude, lat: latitude }

        ttSearchBox.on('tomtom.searchbox.resultselected', function (res) {
            // console.log(JSON.stringify(res.data));
            if (res.data.result.type !== undefined && res.data.result.type === "POI") 
            {
                console.log("POI Search")
                if(destinations.length === 0)
                {
                    origin.lng = res.data.result.position.lng
                    origin.lat = res.data.result.position.lat
                    destinations.push(res.data.result.position)
                    addMarker(res.data.result.position, map)
                    if(!selectedLocations.includes({ id: res.data.result.id, name: res.data.result.poi.name }))
                        selectedLocations.push({ id: res.data.result.id, name: res.data.result.poi.name })
                    // console.log(selectedLocations)
                }
                else
                {
                    destinations.push(res.data.result.position)
                    addDestinationMarker(res.data.result.position, map)
                    recalculatePaths(destinations, origin, map)
                    if(!selectedLocations({ id: res.data.result.id, name: res.data.result.poi.name }))
                        selectedLocations.push({ id: res.data.result.id, name: res.data.result.poi.name })
                    // console.log(selectedLocations);
                }
            }
        });

        map.addControl(ttSearchBox, 'top-left');
        map.addControl(new tt.NavigationControl())



      
        map.on('click', (e) => {

            var touchingLayer = map.queryRenderedFeatures(e.point)[0];// top layer
            // console.log(JSON.stringify(touchingLayer))
            // console.log(JSON.stringify(touchingLayer.geometry.type))
            if (touchingLayer !== undefined) 
            {
                if (touchingLayer.layer.id === "POI") 
                {
                    // console.log("POI Map Click")
                    // console.log(destinations)
                    if(destinations.length === 0)
                    {
                        // console.log("Initial marker set.")
                        origin.lng = e.lngLat.lng
                        origin.lat = e.lngLat.lat
                        destinations.push(e.lngLat)
                        addMarker(e.lngLat, map)
                        if(!selectedLocations.includes({id: touchingLayer.properties.id, name: touchingLayer.properties.name}))
                            selectedLocations.push({id: touchingLayer.properties.id, name: touchingLayer.properties.name})
                        // console.log(selectedLocations)
                    }
                    else
                    {
                        // console.log("Dest. marker set.")
                        // console.log(JSON.stringify(touchingLayer))
                        destinations.push(e.lngLat)
                        addDestinationMarker(e.lngLat, map)
                        recalculatePaths(destinations, origin, map)
                        if(!selectedLocations.includes({id: touchingLayer.properties.id, name: touchingLayer.properties.name}))
                            selectedLocations.push({id: touchingLayer.properties.id, name: touchingLayer.properties.name})
                        console.log(selectedLocations)
                    }
                }
            }
        })

        return () => map.remove()
    }, [latitude, longitude])

    return (
        <>
            {map && <div className="app">
                <div id="search-panel" className="col"></div>
                <div ref={mapElement} className="map" id="map" />
                <LocationsAdded list={selectedLocations} />
            </div>}
        </>
    )
}
