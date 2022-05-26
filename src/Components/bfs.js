import {selectedLocations, customLocations, bfsCost, randomCost} from './Home'
import { fillMatrix} from './MapFunctions'


let n
let visited = []
let matrix 


export const calculate = async () => {

    n = selectedLocations.length
    for(let i=0; i<n; i++)  {visited[i] = 0;}
    matrix = await fillMatrix()
    // printMatrix(matrix, n)

    var matStr = "Bfs Cost Matrix:<br>"
    for(let i=0; i<n; i++)
    {
        matStr += "["
        for(let j=0; j<n; j++)
        {
            if(j!==n-1)
                matStr += matrix[i][j] + ", "
            else
                matStr += matrix[i][j] + "]"
        }
        // matStr += "]"
        matStr += "<br>"
    }
    

    var bfsOP = await bfs(0);
    const path = bfsOP.path;
    const cost = bfsOP.cost;
    // console.log("Cost: " + cost)

    if(bfsCost.length === 0)
        bfsCost.push(cost)

    const bfsDistElement = document.getElementById('bfsDist')
    bfsDistElement.innerHTML = 'BFS Path Distance: ' + bfsCost[0] + ' meters'

    const bfsMatrixElement = document.getElementById('bfsMatrix')
    bfsMatrixElement.innerHTML = matStr

    const distSavedElement = document.getElementById('distSaved')
    distSavedElement.innerHTML = 'Distance Saved: ' + (randomCost[0] - bfsCost[0]) + ' meters'

    // console.log("Path: "+path)
    const petrolPrice = 0.0053333
    const costSavedElement = document.getElementById('costSaved')
    costSavedElement.innerHTML = 'Cost Saved: ₹' + ((randomCost[0] - bfsCost[0])*petrolPrice.toFixed(2)) + " (₹96/L)"


    customLocations.push(selectedLocations[0])

    for(let i=1; i<n; i++)  
    {
        customLocations.push(selectedLocations[path[i]]);
    }
    
    // console.log("Path(Names): ")
    // console.log(customLocations)
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
    // cost += matrix[path[path.length - 1]][source];

    return {path: path, cost: cost}
}
































