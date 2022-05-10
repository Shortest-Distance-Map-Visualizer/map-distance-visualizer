import React from 'react'
import PropTypes from 'prop-types'

export default function LocationsAdded(props) {
    return (
        <ul className="list-group list-group-horizontal">
            {props.locationList.map(item => (
                <li className="list-group-item">{item}</li>
            ))}
        </ul>
    )
}


LocationsAdded.propTypes = { locationList: PropTypes.array.isRequired }