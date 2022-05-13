// import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function LocationsAdded(props) {

    // console.log("from locationsAddes: list=>" + props.list)
    // var [reRender, setRerender] = useState(0);

    return (
        <ul className="list-group list-group-horizontal">
            {props.list.map(item => (
                <li className="list-group-item">{item.name}</li>
            ))}
        </ul>
    )
}

LocationsAdded.propTypes = { list: PropTypes.array.isRequired }