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
let selectedLocations = []

export default function Map() {

    const mapElement = useRef()
    const [map, setMap] = useState({})
    const [latitude] = useState(28.519200)
    const [longitude] = useState(77.365438)


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
                language: 'en-GB',
                limit: 5,
                idxSet: 'POI'
            },
            autocompleteOptions: {
                key: process.env.REACT_APP_API_KEY,
                language: 'en-GB',
                resultSet: 'brand'
            },
            labels: {
                placeholder: 'Search for a location',
                noResultsMessage: 'No results found.'
            },
            // distanceFromPoint: '4.3321,55.2121',
            units: 'kilometers',
            showSearchButton: true,
        }
        const ttSearchBox = new SearchBox(services, options);
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
                    addMarker(res.data.result.position)
                    selectedLocations.push({ id: res.data.result.id, name: res.data.result.poi.name })
                    // console.log(selectedLocations)
                }
                else
                {
                    destinations.push(res.data.result.position)
                    addDestinationMarker(res.data.result.position, map)
                    recalculatePaths()
                    selectedLocations.push({ id: res.data.result.id, name: res.data.result.poi.name })
                    // console.log(selectedLocations);
                }
            }
        });

        map.addControl(ttSearchBox, 'top-left');
        map.addControl(new tt.NavigationControl())




        // Adding Marker
        const addMarker = (lngLat) => {

            // const popupOffset = { bottom: [0, -18] }
            // const popup = new tt.Popup({ offset: popupOffset }).setHTML('Hello PG')


            const element = document.createElement('div')
            element.className = 'marker'

            new tt.Marker({
                draggable: false,
                element: element,
            })
            .setLngLat([lngLat.lng, lngLat.lat])
            .addTo(map)

            // marker.on('dragend', () => {
            //     const newLongLat = marker.getLngLat()
            //     setLongitude(newLongLat.lng)
            //     setLatitude(newLongLat.lat)
            // })

            // marker.setPopup(popup).togglePopup()
        }
        
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
                        addMarker(e.lngLat)
                        selectedLocations.push({id: touchingLayer.properties.id, name: touchingLayer.properties.name})
                        // console.log(selectedLocations)
                    }
                    else
                    {
                        // console.log("Dest. marker set.")
                        // console.log(JSON.stringify(touchingLayer))
                        destinations.push(e.lngLat)
                        addDestinationMarker(e.lngLat, map)
                        recalculatePaths()
                        selectedLocations.push({id: touchingLayer.properties.id, name: touchingLayer.properties.name})
                        // console.log(selectedLocations)
                    }
                }
            }
        })


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


        return () => map.remove()
    }, [latitude, longitude])

    return (
        <>
            {map && <div className="app">
                <div id="search-panel" class="col"></div>
                <div ref={mapElement} className="map" id="map" />
                <LocationsAdded list={selectedLocations} />
            </div>}
        </>
    )
}
