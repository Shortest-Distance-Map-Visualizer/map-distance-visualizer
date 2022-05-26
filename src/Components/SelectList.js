import PropTypes from 'prop-types'

export default function SelectList(props) 
{
    return (
        <>
            <div className="list">
                <ul className="list-group list-group-horizontal">
                    {props.list.map(item => (
                        <li className="list-group-item">{item.name}</li>
                        ))}
                </ul>
            </div>
        </>
    )
}

SelectList.propTypes = { list: PropTypes.array.isRequired }