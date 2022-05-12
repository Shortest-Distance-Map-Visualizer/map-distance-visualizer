// // import { useRef, useEffect, useState } from 'react'
// // import '@tomtom-international/web-sdk-plugin-searchbox'
// import { services } from '@tomtom-international/web-sdk-services';
// import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

// import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';


// export default function SearchMap() {

//     console.log("IN Search Maps")
//     // var autocompleteOptions = {
//     //     key: process.env.REACT_APP_API_KEY,
//     //     language: 'en-US',
//     //     resultSet: 'brand'
//     // }

//     // var searchOptions = {
//     //     key: process.env.REACT_APP_API_KEY,
//     //     language: 'en-US',
//     //     limit: 5,
//     //     idxSet: 'POI'
//     // }

//     // let options = {
//     //     idleTimePress: 100,
//     //     minNumberOfCharacters: 0,
//     //     searchOptions: searchOptions,
//     //     autocompleteOptions: autocompleteOptions,
//     //     noResultsMessage: 'No results found.'
//     // }

//     let options = {
//         idleTimePress: 100,
//         minNumberOfCharacters: 0,
//         searchOptions: {
//             key: process.env.REACT_APP_API_KEY,
//             language: 'en-GB'
//         },
//         autocompleteOptions: {
//             key: process.env.REACT_APP_API_KEY,
//             language: 'en-GB'
//         },
//         labels: {
//             placeholder: 'Search for a location',
//             noResultsMessage: 'No results found.'
//         },
//         // distanceFromPoint: '4.3321,55.2121',
//         units: 'kilometers',
//         showSearchButton: true,
//     }

//     // const searchElement = useRef()

//     const ttSearchBox = new SearchBox(services, options);
//     const searchBoxHTML = ttSearchBox.getSearchBoxHTML();


//     // document.body.appendChild(searchBoxHTML)
//     // console.log("........................searchBoxHTML=>")
//     // console.log(searchBoxHTML)

//     // document.getElementById('search-panel').append(searchBoxHTML)
//     // document.getElementById('search-panel').appendChild(ttSearchBox.getContainer());


//     // var searchBoxInstance = tt.searchBox({
//     //     collapsible: false,
//     //     searchOnDragEnd: 'never'
//     // })
//     // document.getElementById('search-panel').appendChild(searchBoxInstance.getContainer());


//     return (

//         // <div className="container-fluid">
//         //     <div className="input-group mb-3">
//         //         <span className="input-group-text rounded-start" id="inputGroup-sizing-default">Enter Place</span>
//         //         <input type="text" className="form-control rounded-end" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
//         //     </div>
//         // </div>


//         <div className='search-panel' id='search-panel'></div>


//         // <div className="container-fluid">
//         //     <div className="input-group mb-3">
//         //         {/* <span className="input-group-text rounded-start" id="inputGroup-sizing-default">Enter Place</span> */}
//         //         {/* {searchBoxHTML} */}
//         //     </div>
//         // </div>
//     )
// }
