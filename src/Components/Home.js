import React , {useRef} from 'react'
import '../App.css'
import SelectMap from './SelectMap'
// import { createMatrix , printMatrix} from './MapFunctions'
import { createMatrix} from './MapFunctions'

// TODO: use database instead of array
export var selectedLocations = []
// export const numberOfLocationsSelected = 0; 
export const distMatrix = createMatrix(1000);
// printMatrix(distMatrix, 8)


export default function Home() {

    const mapElement = useRef()

    return (
        <div className="container my-3">

            <div className="map-container container my-3 mx-0">
                <SelectMap mapElement={mapElement}/>
            </div>
        </div>
    )
}
