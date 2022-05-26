import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttser from '@tomtom-international/web-sdk-services'

import '../App.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'

import {selectedLocations, distMatrix, customLocations, randomCost} from './Home'
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
    element.className = 'origin-marker'

    new tt.Marker({
        draggable: false,
        element: element,
    })
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map)
}

const drawPath = (geoJson, map, id, lineColor, lineWidth) => {
    // if (map.getLayer('route')) {
    //     map.removeLayer('route')
    //     map.removeSource('route')
    // }
    map.addLayer({
        id: id,
        type: 'line',
        source: {
            type: 'geojson',
            data: geoJson
        },
        paint: {
            'line-color': lineColor,
            'line-width': lineWidth,
        }
    })
}


const showPath = (locations, origin) => {

    // var astarCost = 0

    const pointsForDestinations = locations.map((destination) => {
        return convertToPoints(destination)
    })

    const callParameters = {
        key: process.env.REACT_APP_API_KEY,
        selectedLocations: pointsForDestinations,
        origins: [convertToPoints(origin)],
    }

    return new Promise((resolve, reject) => {
        ttser.services
            .matrixRouting(callParameters)
            .then((matrixAPIResults) => 
            {
                const results = matrixAPIResults.matrix[0]
                // console.log("RESULTS=>")
                // console.log(results)
                // console.log(results.response.lengthInMeters)
                const resultsList = results.map((result, index) => {
                    return {
                        location: locations[index],
                        drivingTime: result.response.routeSummary.travelTimeInSeconds,
                        distance: result.response.routeSummary.lengthInMeters
                    }
                })

                resultsList.sort((a, b) => {
                    return a.drivingTime - b.drivingTime
                    // return a.distance - b.distance
                })

                // console.log("Sorted RESULTS=>")
                // console.log(resultsList)


                const sortedLocations = resultsList.map((result) => {
                    return result.location
                })              

                resolve(sortedLocations)
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
        center: [lng, lat],
        zoom: 13,
        pitch: 25
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
    return await res.routes[0].summary.lengthInMeters
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
}


export const renderBFS = async (map, id, lineColor, lineWidth) => {

    await calculate()
    
    // console.log(customLocations)

    // Origin
    var origin = { lng: customLocations[0].lngLat.lng, lat: customLocations[0].lngLat.lat }
    addMarker(origin, map)

    // Destinations List
    const destinations = []
    for(let i = 0; i < selectedLocations.length; i++)
    {
        destinations.push(customLocations[i].lngLat)
        addDestinationMarker(customLocations[i].lngLat, map)
    }
    // recalculatePathsCustom(selectedLocations, origin, map, lineColor)
    // destinations.unshift(origin)
            ttser.services
                .calculateRoute({
                    key: process.env.REACT_APP_API_KEY,
                    locations: destinations
                })
                .then((routeData) => {
                    const geoJson = routeData.toGeoJson()
                    drawPath(geoJson, map, id, lineColor, lineWidth)
                })

}


// export const renderAstar = async (map, id, lineColor, lineWidth) => {
    
//     // Origin
//     var origin = { lng: selectedLocations[0].lngLat.lng, lat: selectedLocations[0].lngLat.lat }
//     addMarker(origin, map)

//     // Destinations List
//     const destinations = []
//     for(let i = 1; i < selectedLocations.length; i++)
//     {
//         destinations.push(selectedLocations[i].lngLat)
//         addDestinationMarker(selectedLocations[i].lngLat, map)
//     }


//     // map.on('load', () => 
//     // {
//         showPath(destinations, origin).then((sortedLocations) => {
//             sortedLocations.unshift(origin)
        
//             ttser.services
//                 .calculateRoute({
//                     key: process.env.REACT_APP_API_KEY,
//                     locations: sortedLocations
//                 })
//                 .then((routeData) => {
//                     const geoJson = routeData.toGeoJson()
//                     drawPath(geoJson, map, id, lineColor, lineWidth)
//                 })
//         })
//     // })

// }




// export const renderAstar = async (map, id, lineColor, lineWidth) => {
    
//     // Origin
//     var origin = { lng: selectedLocations[0].lngLat.lng, lat: selectedLocations[0].lngLat.lat }
//     addMarker(origin, map)
//     // addMarker(origin, map)

//     // Destinations List
//     const destinations = []
//     for(let i = 1; i < selectedLocations.length; i++)
//     {
//         destinations.push(selectedLocations[i].lngLat)
//         addDestinationMarker(selectedLocations[i].lngLat, map)
//     }

//     map.on('load', () => 
//     {
//         showPath(destinations, origin).then((sortedLocations) => {
//             sortedLocations.unshift(origin)
        
//             ttser.services
//                 .calculateRoute({
//                     key: process.env.REACT_APP_API_KEY,
//                     locations: sortedLocations,
//                     routeType: 'shortest',
//                     computeBestOrder: true
//                 })
//                 .then((routeData) => {
//                     // console.log(JSON.stringify(routeData))
//                     const summary = document.getElementById('bestDist')
//                     summary.innerHTML = 'A* Distance: ' + routeData.routes[0].summary.lengthInMeters + ' meters'
//                     const geoJson = routeData.toGeoJson()
//                     drawPath(geoJson, map, id, lineColor, lineWidth)
//                 })
//         })
//     })

// }


export const renderRandom = async (map, id, lineColor, lineWidth) =>
{
    const origin = { lng: selectedLocations[0].lngLat.lng, lat: selectedLocations[0].lngLat.lat }
    addMarker(origin, map)

    for(let i = 1; i < selectedLocations.length; i++)
        addDestinationMarker(selectedLocations[i].lngLat, map)

    const destinations = []
    // const names = []
    for(let i = 0; i < selectedLocations.length; i++)
    {
        destinations.push(selectedLocations[i].lngLat)
    }
    
    map.on('load', () => 
    {

        ttser.services.calculateRoute(
        {
            key: process.env.REACT_APP_API_KEY,
            routeType: 'shortest',
            locations: destinations
        })
        .then((routeData) => 
        {
            // console.log(routeData)
            if(randomCost.length === 0)
                randomCost.push(routeData.routes[0].summary.lengthInMeters)
        
            const summary = document.getElementById('randomDist')
            summary.innerHTML = 'Random Distance: ' + routeData.routes[0].summary.lengthInMeters + ' meters'
            // let randomListUL = document.getElementById('randomUL')
        
            const geojson = routeData.toGeoJson()
            drawPath(geojson, map, id, lineColor, lineWidth)
        })
    })
}

