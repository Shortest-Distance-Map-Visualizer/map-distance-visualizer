
const V = 4;
    // implementation of traveling
    // Salesman Problem
function travllingSalesmanProblem(graph, s) 
{
     // store all vertex apart
    // from source vertex
    var vertex = new Array();
    for (var i = 0; i < V; i++) {
        if (i !== s) {
            vertex.push(i);
        }
    }
    // store minimum weight
    // Hamiltonian Cycle.
    var min_path = Number.MAX_VALUE;
    do 
    {
        // store current Path weight(cost)
        var current_pathweight = 0;
        // compute current path weight
        var k = s;
        for (i; i < vertex.length; i++) {
            current_pathweight += graph[k][vertex[i]];
            k = vertex[i];
        }
        current_pathweight += graph[k][s];
        // update minimum
        min_path = Math.min(min_path, current_pathweight);
    } while (findNextPermutation(vertex));
    return min_path;
}
    // Function to swap the data
    // present in the left and right indices
function swap(data, left, right)
{
    // Swap the data
    var temp = data[left];
    data[left] = data[right];
    data[right] = temp;
    // Return the updated array
    return data;
}
    // Function to reverse the sub-array
    // starting from left to the right
    // both inclusive
function reverse(data, left, right)
{
    // Reverse the sub-array
    while (left < right) {
        var temp = data[left];
        data[left++] = data[right];
        data[right--] = temp;
    }
    // Return the updated array
    return data;
}
    // Function to find the next permutation
    // of the given integer array
function findNextPermutation(data)
{
    // If the given dataset is empty
    // or contains only one element
    // next_permutation is not possible
    if (data.length <= 1) {
        return false;
    }
    var last = data.length - 2;
    // find the longest non-increasing
    // suffix and find the pivot
    while (last >= 0) {
        if (data[last] < data[last + 1]) {
            break;
        }
        last--;
    }
    // If there is no increasing pair
    // there is no higher order permutation
    if (last < 0) {
        return false;
    }
    var nextGreater = data.length - 1;
    // Find the rightmost successor
    // to the pivot
    for (var i = data.size; i > last; i--) {
        if (data[i] > data[last]) {
            nextGreater = i;
            break;
        }
    }
    // Swap the successor and
    // the pivot
    data = swap(data, nextGreater, last);
    // Reverse the suffix
    data = reverse(data, last + 1, data.length - 1);
    // Return true as the
    // next_permutation is done
    return true;
}

// Driver Code
function main()
{
    // matrix representation of graph
    var graph =
        [
            [0, 10, 15, 20],
            [10, 0, 35, 25],
            [15, 35, 0, 30],
            [20, 25, 30, 0]];
    var s = 0;
    return travllingSalesmanProblem(graph, s);
}

console.log(main());