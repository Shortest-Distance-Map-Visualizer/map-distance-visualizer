import React , {useRef} from 'react'
import '../App.css'
import SelectMap from './SelectMap'

export const selectedLocations = []


export default function Home() {

    const mapElement = useRef()

    return (
        <div className="container my-5">

            <div className="container my-3">
                <SelectMap mapElement={mapElement}/>
            </div>
            
        </div>
    )
}
