// import React , {useRef, useState} from 'react'
import React , {useRef} from 'react'
import '../App.css'
import SelectMap from './SelectMap'
// import SelectList from './SelectList'
// import DFSList from './DFSList'
// import { createMatrix , printMatrix} from './MapFunctions'
import { createMatrix} from './MapFunctions'

// TODO: use database instead of array
export var selectedLocations = []
export var customLocations = []
// export const numberOfLocationsSelected = 0; 
export const distMatrix = createMatrix(1000);
// printMatrix(distMatrix, 8)
export var bfsCost = []
export var randomCost = []


export default function Home() {

    const mapElement = useRef()
    // const [renderSelectList, setRenderSelectList] = useState(false)
    // const [renderDFSList, setRenderDFSList] = useState(false)

    return (
        <>

            <div className="mapShow">
                <div className="row">
                    <div className="col">
                        <div className="map-container container">
                            <SelectMap mapElement={mapElement}/>
                        </div>
                    </div>
                    <div className="col details my-3">
                        <div>
                            <h2 id="randomDist"></h2>
                            {/* <div id='randomList' className='list'>
                            </div> */}
                            <br />
                            <h2 id="bfsDist"></h2>
                            <br />
                            <h2 id="bfsMatrix"></h2>
                            <br />
                            <h2 id="distSaved"></h2>
                            <br />
                            <h2 id="costSaved"></h2>
                            <br />
                        </div>
                    </div>
                </div>
            </div>




            {/* <div className="map-container container">
                <SelectMap mapElement={mapElement}/>
            </div>
            <div>
                <h1>df bdf</h1>
            </div> */}
            {/* {renderSelectList && <div className='list-container containier'>
                <SelectList />
            </div>}
            {renderDFSList && <div className='list-container containier'>
                <DFSList />
            </div>} */}
        </>
    )
}
