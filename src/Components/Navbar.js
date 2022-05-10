import React from 'react'
import PropTypes from 'prop-types'

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">{props.about}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">{props.contact}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


// PropTypes(DataType) Check
Navbar.propTypes = {title: PropTypes.string}
// Navbar.propTypes = {title: PropTypes.string.isRequired}

// Set default values for props
Navbar.defaultProps = { title: "Shortest Distance Map Visualizer", 
                        about: "About", 
                        contact: "Contact"}