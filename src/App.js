import React from "react"
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { BrowserRouter as Router, Routes, Route, withRouter} from "react-router-dom"
// import { connect } from "react-redux"

import './App.css'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Home from './Components/Home'
import Contact from './Components/Contact'


import { Routes, Route, Link } from "react-router-dom";
const locations = ["Hello PG", "Zolo PG", "JP", "ola"]

const App = () => {

  return (
    <>

      {/* <Navbar title="Shortest Distance Map Visualizer" />


      <div className="container my-5">
        <div className="container my-3">
          <SearchMap />
        </div>

        <div className="container my-3">
          <Map />
        </div>

        <div className="container my-3">
          <LocationsAdded locationList={locations} />
        </div>
      </div> */}


      {/* <Router>
        <Navbar title="Shortest Distance Map Visualizer" />

        <Routes>
          <Route exact path="/about" component={About} />

          <Route exact path="/contact" component={Contact} />

          <Route exact path="/" render={(props) => <Home locations={locations} {...props} />} />

        </Routes>
      </Router> */}
      <div className="App">
      {/* <h1>Welcome to React Router!</h1> */}

      <Navbar title="Shortest Distance Map Visualizer"></Navbar>
      <Routes>
        <Route path="/" element={<Home locations={locations}/>} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>

    </>

  );
}
// App.js
// function Home() {
//   return (
//     <>
//       <main>
//         <h2>Welcome to the homepage!</h2>
//         <p>You can do this, I believe in you.</p>
//       </main>
//       <nav>
//         <Link to="/about">About</Link>
//       </nav>
//     </>
//   );
// }

// function About() {
//   return (
//     <>
//       <main>
//         <h2>Who are we?</h2>
//         <p>
//           That feels like an existential question, don't you
//           think?
//         </p>
//       </main>
//       <nav>
//         <Link to="/">Home</Link>
//       </nav>
//     </>
//   );
// }
// export default withRouter(connect(null, null)(App));
export default App;
