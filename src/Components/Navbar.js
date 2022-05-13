import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
export default function Navbar(props) {

    return (
        // With Routes
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='d-flex justify-content-end'>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">{props.about}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">{props.contact}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}


// PropTypes(DataType) Check
Navbar.propTypes = { title: PropTypes.string }
// Navbar.propTypes = {title: PropTypes.string.isRequired}

// Set default values for props
Navbar.defaultProps = {
    title: "Shortest Distance Map Visualizer",
    about: "About",
    contact: "Contact"
}