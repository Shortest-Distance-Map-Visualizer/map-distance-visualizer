import React from 'react'
import '../App.css'
// import LocationsAdded from './LocationsAdded'
// import SearchMap from './SearchMap'
import Map from './Map'

// const locations = ["Hello PG", "Zolo PG", "JP", "ola"]

export default function Home() {
    return (
        <div className="container my-5">
            {/* <div className="container my-3">
                <SearchMap />
            </div> */}

            <div className="container my-3">
                <Map />
            </div>
            
            {/* <div className="container my-3">
                <Map list={locations}/>
            </div> */}

            {/* <div className="container my-3">
                <LocationsAdded list={locations} />
            </div> */}
        </div>
    )
}
