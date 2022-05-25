
let ary = [[0, 10, 15, 20],
           [10, 0, 35, 25],
           [15, 35, 0, 30],
           [20, 25, 30, 0]];

let completed = [0,0,0,0,0,0,0,0,0,0];
let n = 4;
let cost = 0;

let out = ""

function least(c)
{
    let nc = 999
    let min = 999
    let kmin;

    for (let i = 0; i < n; i++)
    {
        if ((ary[c][i] !== 0) && (completed[i] === 0))
        {
            if (ary[c][i] + ary[i][c] < min)
            {
                min = ary[i][0] + ary[c][i];
                kmin = ary[c][i];
                nc = i;
            }
        }
    }

    if (min !== 999)
        cost += kmin;

    return nc;
}


function mincost(city)
{

    completed[city] = 1;

    out += city + "--->";
    let ncity = least(city);

    if (ncity === 999)
    {
        ncity = 0;
        out += ncity;
        cost += ary[city][ncity];

        return;
    }

    mincost(ncity);
}


console.log("The Path is:");
mincost(0); // passing 0 because starting vertex

console.log(out)

console.log("\nMinimum cost is " + cost);
