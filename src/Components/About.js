import React from 'react'
import { Link } from 'react-router-dom'
export default function About() {
    return (
        <>
            <div className="about">
                <div className="jumbotron">
                    <div className="container">
                    {/* <Link className="nav-link btn btn-primary" aria-current="page" to="/">Home</Link> */}
                        <h1 className="display-3">Delivery Optimization Visualizer</h1>
                        <p className="lead fs-3">It is a path visualizer for delivery of item on multiple locations. Map rendering via tom-tom API and shortest path using Breath-first-Search Algorithm.
                            The use case is that it will give shortest path which which use less time and fuel hence decreasing transport cost of the delivery company where multiple items are needed to be delivered in one go for example Flipkart Logistics.
                            It`s a single page web application made using React.js for frontend and Node.js for backed.
                        </p>
                        <p>
                        <a className="btn btn-primary btn-lg ms-5" href="/" target="_blank" role="button">Try Now  &raquo;</a>
                        <a className="btn btn-primary btn-lg ms-5" href="https://github.com/Shortest-Distance-Map-Visualizer/map-distance-visualizer" target="_blank" role="button">Github Repository  &raquo;</a>
                        </p>
                    </div>
                </div>

                <div className="container">
                    <h1>Made With :</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <h2>React.js</h2>
                            <p className="lead fs-3">React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. The project is made using create-react-app maintained by Meta</p>
                            <p><a className="btn btn-primary" href="https://github.com/facebook/create-react-app" target="_blank" role="button">View details &raquo;</a></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Node.js</h2>
                            <p className="lead fs-3">Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.</p>
                            <p><a className="btn btn-primary" href="https://nodejs.org/en/about/" target="_blank" role="button">View details &raquo;</a></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Javascript</h2>
                            <p className="lead fs-3">JavaScript is a lightweight, cross-platform, and interpreted scripting language. It is well-known for the development of web pages. JavaScript can be used for Client-side developments as well as Server-side developments.</p>
                            <p><a className="btn btn-primary" href="https://www.geeksforgeeks.org/introduction-to-javascript/#:~:text=JavaScript%20is%20a%20lightweight%2C%20cross,well%20as%20Server%2Dside%20developments."  role="button">View details &raquo;</a></p>
                        </div>
                    </div>

                    <hr></hr>

                </div>
            </div>
        </>
    )
}
