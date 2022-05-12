import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import { BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom"
// import { connect } from "react-redux"

import './App.css'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Home from './Components/Home'
import Contact from './Components/Contact'

// const locations = ["Hello PG", "Zolo PG", "JP", "ola"]

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


      <Router>
        <Navbar title="Shortest Distance Map Visualizer" />

          <Switch>
            <Route exact path="/" component={Home} />
            
            <Route exact path="/about" component={About} />

            <Route exact path="/contact" component={Contact} />

            {/* <Route exact path="/" component={() => <Home locations={locations}/>} /> */}

          </Switch>
      </Router>

    </>

  );
}

// export default withRouter(connect(null, null)(App));
export default App;
