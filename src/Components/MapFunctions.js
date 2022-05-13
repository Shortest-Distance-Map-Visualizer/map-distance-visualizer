import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttser from '@tomtom-international/web-sdk-services'

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';


const convertToPoints = (lngLat) => {
    return {
        point: {
            latitude: lngLat.lat,
            longitude: lngLat.lng
        }
    }
}

export const addDestinationMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'destination-marker'
    new tt.Marker({
        element: element
    })
        .setLngLat(lngLat)
        .addTo(map)
}

export const addMarker = (lngLat, map) => {

    const element = document.createElement('div')
    element.className = 'marker'

    new tt.Marker({
        draggable: false,
        element: element,
    })
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map)
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

const showPath = (locations, origin) => {
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

export const recalculatePaths = (destinations, origin, map) => {
    showPath(destinations, origin).then((sortedLocations) => {
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

export const searchOptions = {
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
    units: 'kilometers',
    showSearchButton: true,
}

export const retMap = (map_container, lng, lat) =>
{
    return tt.map({
        key: process.env.REACT_APP_API_KEY,
        container: map_container.current,
        stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true,
        },
        center: [lng, lat],
        zoom: 14,
        // style: '../../Assets/darkWithPOI.json',
    });
}
