// import { useRef, useEffect, useState } from 'react'
// import tt from '@tomtom-international/web-sdk-maps'
// import '@tomtom-international/web-sdk-maps/dist/maps.css'

import './App.css'
import LocationsAdded from './Components/LocationsAdded'
import Navbar from './Components/Navbar'
import SearchMap from './Components/SearchMap'
import Map from './Components/Map'

const locations = ["Hello PG", "Zolo PG", "JP", "ola"]

const App = () => {

  // const mapElement = useRef()
  // const [map, setMap] = useState({})

  // useEffect(() => {
  //   let map = tt.map({
  //     key: process.env.REACT_APP_API_KEY,
  //     container: mapElement.current
  //   });
  //   setMap(map)
  //   // map.addControl(new tt.FullscreenControl());
  //   // map.addControl(new tt.NavigationControl());

  // }, [])

  return (
    <>
      <Navbar title="Shortest Distance Map Visualizer" />

      <div className="container my-5">
        <div className="container my-3">
          <SearchMap />
        </div>
        
        
        <div className="container my-3">
          <Map />
        </div>



        {/* <div className="App">
          <div ref={mapElement} className="map" id="map"></div>
        </div> */}

        <div className="container my-3">
          <LocationsAdded locationList={locations} />
        </div>

      </div>

    </>

  );
}

export default App
