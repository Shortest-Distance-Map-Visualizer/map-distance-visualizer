var N, start;
var distance=[];//double dimention array
var tour=[]; // arraylist of integer
var minTourCost = Number.MAX_VALUE;
var ranSolver = false;

  public Main(double[][] distance) {
    this(0, distance);
  } 

  public Main(int start, double[][] distance) {
    N = distance.length;

    if (N <= 2) throw new IllegalStateException("N <= 2 not yet supported.");
    if (N != distance[0].length) throw new IllegalStateException("Matrix must be square (n x n)");
    if (start < 0 || start >= N) throw new IllegalArgumentException("Invalid start node.");

    this.start = start;
    this.distance = distance;
  }

  // Returns the optimal tour for the traveling salesman problem.
function getTour() 
{
    if (!ranSolver) 
    {
        solve();
    }
    return tour;
}

  // Returns the minimal tour cost.
function getTourCost() 
{
    if (!ranSolver) solve();
    return minTourCost;
}

  // Solves the traveling salesman problem and caches solution.
function solve() 
{

    if (ranSolver) return;

    const END_STATE = (1 << N) - 1;
    Double[][] memo = new Double[N][1 << N];

    // Add all outgoing edges from the starting node to memo table.
    for (var end = 0; end < N; end++) 
    {
      if (end == start) continue;
      memo[end][(1 << start) | (1 << end)] = distance[start][end];
    }

    for (var r = 3; r <= N; r++) {
      for (int subset : combination(r, N)) {
        if (notIn(start, subset)) continue;
        for (int next = 0; next < N; next++) {
          if (next == start || notIn(next, subset)) continue;
          int subsetWithoutNext = subset ^ (1 << next);
          double minDist = Double.POSITIVE_INFINITY;
          for (int end = 0; end < N; end++) {
            if (end == start || end == next || notIn(end, subset)) continue;
            double newDistance = memo[end][subsetWithoutNext] + distance[end][next];
            if (newDistance < minDist) {
              minDist = newDistance;
            }
          }
          memo[next][subset] = minDist;
        }
      }
    }

    // Connect tour back to starting node and minimize cost.
    for (int i = 0; i < N; i++) {
      if (i == start) continue;
      double tourCost = memo[i][END_STATE] + distance[i][start];
      if (tourCost < minTourCost) {
        minTourCost = tourCost;
      }
    }

    int lastIndex = start;
    int state = END_STATE;
    tour.add(start);

    // Reconstruct TSP path from memo table.
    for (int i = 1; i < N; i++) {

      int index = -1;
      for (int j = 0; j < N; j++) {
        if (j == start || notIn(j, state)) continue;
        if (index == -1) index = j;
        double prevDist = memo[index][state] + distance[index][lastIndex];
        double newDist  = memo[j][state] + distance[j][lastIndex];
        if (newDist < prevDist) {
          index = j;
        }
      }

      tour.add(index);
      state = state ^ (1 << index);
      lastIndex = index;
    }

    tour.add(start);
    Collections.reverse(tour);

    ranSolver = true;
}

function notIn(elem,subset) 
{
    return ((1 << elem) & subset) == 0;
}

  // This method generates all bit sets of size n where r bits 
  // are set to one. The result is returned as a list of integer masks.
function combination(r,n) 
{
    var subsets = [];
    combinations(0, 0, r, n, subsets);
    return subsets;
}

  // To find all the combinations of size r we need to recurse until we have
  // selected r elements (aka r = 0), otherwise if r != 0 then we still need to select
  // an element which is found after the position of our last selected element
function combinations(set, at, r, n, subsets) 
{
    // Return early if there are more elements left to select than what is available.
    elementsLeftToPick = n - at;
    if (elementsLeftToPick < r) return;

    // We selected 'r' elements so we found a valid subset!
    if (r == 0) 
    {
      subsets.push(set);
    } 
    else 
    {
      for (var i = at; i < n; i++) 
      {
        // Try including this element
        set |= 1 << i;

        combinations(set, i + 1, r - 1, n, subsets);

        // Backtrack and try the instance where we did not include this element
        set &= ~(1 << i);
      }
    }
}

function main() 
{
    // Create adjacency matrix
    n = 6;
    var distanceMatrix =[];
    for (double[] row : distanceMatrix) java.util.Arrays.fill(row, 10000);
    distanceMatrix[5][0] = 10;
    distanceMatrix[1][5] = 12;
    distanceMatrix[4][1] = 2;
    distanceMatrix[2][4] = 4;
    distanceMatrix[3][2] = 6;
    distanceMatrix[0][3] = 8;

    var startNode = 0;
    Main solver = new Main(startNode, distanceMatrix);

    // Prints: [0, 3, 2, 4, 1, 5, 0]
    console.log("Tour: " + solver.getTour());

    // Print: 42.0
    console.log("Tour cost: " + solver.getTourCost());
}
