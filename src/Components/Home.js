import React from 'react'
import '../App.css'
import LocationsAdded from './LocationsAdded'
import SearchMap from './SearchMap'
import Map from './Map'

export default function Home(props) {
    return (
        <div className="container my-5">
            <div className="container my-3">
                <SearchMap />
            </div>

            <div className="container my-3">
                <Map />
            </div>

            <div className="container my-3">
                <LocationsAdded locationList={props.locations} />
            </div>
        </div>
    )
}
