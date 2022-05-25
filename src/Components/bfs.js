import {selectedLocations} from './Home'
import { fillMatrix , printMatrix} from './MapFunctions'

let n
let visited = []
let matrix 


export const calculate = async () => {

    n = selectedLocations.length

    // console.log("selected Loactions: ")
    // console.log(selectedLocations)

    for(let i=0; i<n; i++)  {visited[i] = 0;}
    matrix = await fillMatrix()
    printMatrix(matrix, n)

    var bfsOP = await bfs(0);
    const path = bfsOP.path;
    const cost = bfsOP.cost;
    console.log("Circult Cost: " + cost)


    // setTimeout(()=>{console.log("Waiting...")}, 2000)



    console.log("Path: "+path)

    var temp = []
    temp.push(selectedLocations[0])

    for(let i=1; i<n; i++)  
    {
        // temp[i] = await selectedLocations[path[i]];
        temp.push(selectedLocations[path[i]]);
    }

    
    console.log("Path(Names): ")
    console.log(temp)
    // selectedLocations = temp
    return temp  
}



function getMin(source)
{
    let minCost = Number.MAX_SAFE_INTEGER
    let minIndex = -1;
    for(let i = 0; i < n; i++)
    {
        if(visited[i] === 0 && matrix[source][i] !== 0 && matrix[source][i] < minCost)
        {
            minCost = matrix[source][i];
            minIndex = i
        }
    }
    
    return {dest: minIndex, cost: minCost}
}

async function bfs(source)
{    
    visited[source] = 1;

    let path = []
    let cost = 0

    path.push(source);

    var node = source
    while(node !== -1)
    {
        var next = getMin(node);
        node = next.dest;
        if(node !== -1)
        {
            path.push(node)
            visited[node] = 1;
            cost += next.cost;
        }
    }
    cost += matrix[path[path.length - 1]][source];

    return {path: path, cost: cost}
}



































// let matrix = [[0    , 2.186, 2.122, 2.19 ],
//               [2.302, 0    , 3.262, 5.018],
//               [2.724, 2.783, 0    , 1.784], 
//               [2.145, 3.468, 0.713, 0    ]]

// let n = 4

// let visited = [0,0,0,0];

// function getMin(source)
// {
//     let minCost = Number.MAX_SAFE_INTEGER
//     let minIndex = -1;
//     for(let i = 0; i < n; i++)
//     {
//         if(visited[i] === 0 && matrix[source][i] !== 0 && matrix[source][i] < minCost)
//         {
//             minCost = matrix[source][i];
//             minIndex = i
//             // console.log("source: " + source + "\ti: " + i + "\tminIndex: " + minIndex);
//         }
//     }
    
//     return {dest: minIndex, cost: minCost}
// }

// function bfs(source)
// {    
//     visited[source] = 1;

//     let path = []
//     let cost = 0

//     path.push(source);

    

//     var node = source
//     while(node !== -1)
//     {
//         var next = getMin(node);
//         node = next.dest;
//         if(node !== -1)
//         {
//             path.push(node)
//             visited[node] = 1;
//             cost += next.cost;
//         }
//     }
    
//     cost += matrix[path[path.length - 1]][source];

//     let out = ""
//     path.forEach(x => {
//         out += x + "=>"
//     });
//     out += source


//     console.log("Path: "+out)
//     console.log("Cost: "+cost)

//     // bfs(getMin(source))
// }

// bfs(0)
// // console.log(getMin(0))

