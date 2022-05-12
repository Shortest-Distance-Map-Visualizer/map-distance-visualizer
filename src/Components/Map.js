import { useRef, useEffect, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttser from '@tomtom-international/web-sdk-services'
import LocationsAdded from './LocationsAdded'
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';

// Selected Locations Array
let selectedLocations = ['hellp', 'zolo', 'jp', 'ola']

export default function Map() {

    const mapElement = useRef()
    const [map, setMap] = useState({})
    const [latitude, setLatitude] = useState(28.519200)
    const [longitude, setLongitude] = useState(77.365438)
    // var [renderListLength, setRenderListLength] = useState(3)


    const convertToPoints = (lngLat) => {
        return {
            point: {
                latitude: lngLat.lat,
                longitude: lngLat.lng
            }
        }
    }

    const drawPath = (geoJson, map) => {
        if (map.getLayer('route')) {
            map.removeLayer('route')
            map.removeSource('route')
        }
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geoJson
            },
            paint: {
                'line-color': '#4a90e2',
                'line-width': 6,
            }
        })
    }

    const addDestinationMarker = (lngLat, map) => {
        const element = document.createElement('div')
        element.className = 'destination-marker'
        new tt.Marker({
            element: element
        })
            .setLngLat(lngLat)
            .addTo(map)
    }


    useEffect(() => {

        // Origin
        const origin = { lng: longitude, lat: latitude }

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


        let options = {
            idleTimePress: 100,
            minNumberOfCharacters: 0,
            searchOptions: {
                key: process.env.REACT_APP_API_KEY,
                language: 'en-GB'
            },
            autocompleteOptions: {
                key: process.env.REACT_APP_API_KEY,
                language: 'en-GB'
            },
            labels: {
                placeholder: 'Search for a location',
                noResultsMessage: 'No results found.'
            },
            // distanceFromPoint: '4.3321,55.2121',
            units: 'kilometers',
            showSearchButton: true,
        }
        map.addControl(new SearchBox(services, options), 'top-left');
        map.addControl(new tt.NavigationControl())




        // Adding Marker
        const addMarker = () => {

            // const popupOffset = { bottom: [0, -18] }
            // const popup = new tt.Popup({ offset: popupOffset }).setHTML('Hello PG')


            const element = document.createElement('div')
            element.className = 'marker'

            const marker = new tt.Marker({
                draggable: true,
                element: element,
            })
                .setLngLat([longitude, latitude])
                .addTo(map)

            marker.on('dragend', () => {
                const newLongLat = marker.getLngLat()
                setLongitude(newLongLat.lng)
                setLatitude(newLongLat.lat)
            })

            // marker.setPopup(popup).togglePopup()
        }
        addMarker()


        const showPath = (locations) => {
            const pointsForDestinations = locations.map((destination) => {
                return convertToPoints(destination)
            })

            const callParameters = {
                key: process.env.REACT_APP_API_KEY,
                destinations: pointsForDestinations,
                origins: [convertToPoints(origin)],
            }

            return new Promise((resolve, reject) => {
                ttser.services
                    .matrixRouting(callParameters)
                    .then((matrixAPIResults) => {
                        const results = matrixAPIResults.matrix[0]
                        const resultsList = results.map((result, index) => {
                            return {
                                location: locations[index],
                                drivingTime: result.response.routeSummary.travelTimeInSeconds
                            }
                        })
                        resultsList.sort((a, b) => {
                            return a.drivingTime - b.drivingTime
                        })
                        const sortedLocations = resultsList.map((result) => {
                            return result.location
                        })
                        resolve(sortedLocations)
                    })
            })
        }

        const recalculatePaths = () => {
            showPath(destinations).then((sortedLocations) => {
                sortedLocations.unshift(origin)

                ttser.services
                    .calculateRoute({
                        key: process.env.REACT_APP_API_KEY,
                        locations: sortedLocations
                    })
                    .then((routeData) => {
                        const geoJson = routeData.toGeoJson()
                        drawPath(geoJson, map)
                    })
            })

        }


        map.on('click', (e) => {
            destinations.push(e.lngLat)
            addDestinationMarker(e.lngLat, map)
            var touchingLayer = map.queryRenderedFeatures(e.point)[0];// top layer
            // console.log(touchingLayer)
            // console.log(touchingLayer.properties)
            // console.log(touchingLayer.properties.name)
            selectedLocations.push(touchingLayer.properties.name)
            // console.log(selectedLocations)
            recalculatePaths()
        })


        return () => map.remove()
    }, [latitude, longitude])

    return (
        <>
            {map && <div className="app">
                <div id="search-panel" class="col"></div>
                {/* <div ref={mapElement} className="map" id="map" onClick={()=> setRenderListLength(renderListLength+=1)} /> */}
                <div ref={mapElement} className="map" id="map"/>
                {/* {console.log([...selectedLocations])} */}
                <LocationsAdded list={selectedLocations}/>
                {/* {renderList && <LocationsAdded list={selectedLocations}/> } */}
                {/* {setRenderList(false)} */}
                {/* <ul className="list-group list-group-horizontal">
                    {selectedLocations.map(item => (
                        <li className="list-group-item">{item}</li>
                    ))}
                </ul> */}
                {/* <div className='searchLatLong'>
                    <p>Enter Latitude and Longitude</p>
                    <input type="text" className="latitude" id="latitude" placeholder={latitude} onChange={(e) => { setLatitude(e.target.value) }} />
                    <input type="text" className="longitude" id="longitude" placeholder={longitude} onChange={(e) => { setLongitude(e.target.value) }} />
                </div> */}
            </div>}
        </>
    )
}
