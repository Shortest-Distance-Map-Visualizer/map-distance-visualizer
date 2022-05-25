import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttser from '@tomtom-international/web-sdk-services'
// import tt from '@tomtom-international/web-sdk-services';

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'

import {selectedLocations, distMatrix} from './Home'
import {calculate} from './bfs'


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
            .then((matrixAPIResults) => 
            {
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

                // setTimeout(()=>{console.log("Sorted Locations: "+sortedLocations)}, 5000);               

                resolve(sortedLocations)
            })
    })
}

export const recalculatePaths = (destinations, origin, map) => {
    map.on('load', () => {
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

export const getDistance = async (lngLat1, lngLat2) => 
{
    var routeOptions = {
        key: process.env.REACT_APP_API_KEY,
        locations: `${lngLat1.lng},${lngLat1.lat}:${lngLat2.lng},${lngLat2.lat}`
    }

    let res = await new Promise((resolve, reject) => {
        resolve(ttser.services.calculateRoute(routeOptions))
    })
    return await res.routes[0].summary.lengthInMeters / 1000
}

export const createMatrix = (n) => {
    var mat = Array(n).fill(null).map(() => Array(n))
    for (let i = 0; i < mat.length; i++) 
    {
        for(let j=0; j<mat[0].length; j++)
            mat[i][j] = 0;
    }
    return mat
}

export const printMatrix = (mat, n) => {
    let out="";
    for (let i = 0; i < n; i++) 
    {
        for(let j=0; j<n; j++)
            out += mat[i][j] + " ";
        out += "\n";
    }
    console.log(out);
}

export const fillMatrix = async ()=>
{
    const n = selectedLocations.length
    for (let i = 0; i<n; i++) 
    {
        for(let j=i+1; j<n; j++)
        {
            const lngLat1 = selectedLocations[i].lngLat
            const lngLat2 = selectedLocations[j].lngLat

            distMatrix[i][j] = await getDistance(lngLat1, lngLat2)
            distMatrix[j][i] = await getDistance(lngLat2, lngLat1)
        }
    }
    return distMatrix
    // printMatrix(distMatrix, n)
}



export const recalculatePathsCustom = (destinations, origin, map) => 
{
    // map.on('load', () => 
    // {
        // const sortedLocationPromises = destinations.map((destination) => {

        // showPathCustom(destinations, origin).then((sortedLocations) => {
        //     sortedLocations.unshift(origin)
        
            ttser.services
                .calculateRoute({
                    key: process.env.REACT_APP_API_KEY,
                    locations: destinations
                })
                .then((routeData) => {
                    const geoJson = routeData.toGeoJson()
                    drawPath(geoJson, map)
                })
    // })
}

export const renderPathCustom = async (map) => {

    // Fill destination Matrix for TSP
    var customList = []
    if(selectedLocations.length >= 2)
    {
        customList = await calculate()
        //Selected locations updated acc to bfs dist.
    }

    if(customList.length > 1)
    {

        // Origin
        var origin = { lng: customList[0].lngLat.lng, lat: customList[0].lngLat.lat }
        addMarker(origin, map)

        // Destinations List
        const destinations = []
        for(let i = 1; i < customList.length; i++)
        {
            destinations.push(customList[i].lngLat)
            addDestinationMarker(customList[i].lngLat, map)
        }
        recalculatePathsCustom(destinations, origin, map)
    }
    else
    {
        console.log("CustomList Empty...")
    }

}