import React from 'react'
import '../App.css'
import Map from './Map'

// const locations = ["Hello PG", "Zolo PG", "JP", "ola"]

export default function Home() {
    return (
        <div className="container my-5">

            <div className="container my-3">
                <Map />
            </div>
            
        </div>
    )
}
