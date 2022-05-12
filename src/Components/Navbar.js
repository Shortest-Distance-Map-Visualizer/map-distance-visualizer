import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props) {

    let history = useNavigate();

    return (
        // Without Routes
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //     <div className="container-fluid">
        //         <a className="navbar-brand" href="/">{props.title}</a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className='d-flex justify-content-end'>
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                     <li className="nav-item">
        //                         <a className="nav-link active" aria-current="page" href="/">Home</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">{props.about}</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="/">{props.contact}</a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </nav>

        // With Routes
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* <Link className="navbar-brand" to="/">{props.title}</Link> */}
                <label className="navbar-brand" onClick={()=>{history.push("/")}}>{props.title}</label>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='d-flex justify-content-end'>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/about'>About</Link>
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