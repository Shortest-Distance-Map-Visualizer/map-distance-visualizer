import { Routes, Route } from "react-router-dom"

import './App.css'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Home from './Components/Home'
import Contact from './Components/Contact'

const App = () => {


  return (
    <>
      <div className="App">

        <Navbar title="Shortest Distance Map Visualizer"></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </div>

    </>

  );
}
export default App;
