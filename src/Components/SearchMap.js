import React from 'react'

export default function SearchMap() {
    return (

        <div className="container-fluid">
            <div className="input-group mb-3">
                <span className="input-group-text rounded-start" id="inputGroup-sizing-default">Enter Place</span>
                <input type="text" className="form-control rounded-end" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
            </div>
        </div>
    )
}
