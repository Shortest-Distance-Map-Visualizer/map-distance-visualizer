import PropTypes from 'prop-types'

export default function LocationsAdded(props) {

    return (
        <ul className="list-group list-group-horizontal">
            {props.list.map(item => (
                <li className="list-group-item">{item.name}</li>
            ))}
        </ul>
    )
}

LocationsAdded.propTypes = { list: PropTypes.array.isRequired }