let maze = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  
    ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  
    ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  
    ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  
    ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  
    ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  
    ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];
  
console.log(maze);

let arrayWay = [];
let cordStart = {};
let cordEnd = {};

searchStartEndCords(maze);

console.log(searchPath(cordStart, cordEnd).reverse())


function searchStartEndCords(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            
                if (array[i][j] == "+" && (
                    i == array.length - array.length || 
                    j == array[i].length - array[i].length || 
                    i == array.length - 1 || 
                    j == array[i].length - 1 )
                ) {
                    cordEnd.x = j;
                    cordEnd.y = i;
                } else {
                    if (array[i][j] == "0") {
                        cordStart.x = j;
                        cordStart.y = i;
                    }
                }
            }
        }
    return cordStart, cordEnd;
};

function searchPath(start, end) {
    maze[start.y][start.x] = 'x' ;   
      
    let siblings = getValidSib(start);

    if(siblings.length > 0) {
        for(let i=0; i < siblings.length; i++){
            let current = siblings[i];

            let isSolved = current.x === end.x && current.y === end.y;
            let notVisited = maze[current.y][current.x] !== 'x';

            if (isSolved || (notVisited && searchPath(current,end))) {
                arrayWay.push(current.side);
                return arrayWay;                
            }
        }
    }
    return false;
}

function getValidSib(cord) {
    const { x, y } = cord;  
    let cords = [];
  
    if (maze[y - 1] !== undefined) {
      cords.push({ x: x, y: y - 1, val: maze[y - 1][x], side: "top" });
    }
    if (maze[y + 1] !== undefined) {
      cords.push({ x: x, y: y + 1, val: maze[y + 1][x], side: "bottom" });
    }
    if (maze[y][x - 1] !== undefined) {
      cords.push({ x: x - 1, y: y, val: maze[y][x - 1], side: "left" });
    }
    if (maze[y][x + 1] !== undefined) {
      cords.push({ x: x + 1, y: y, val: maze[y][x + 1], side: "right" });
    }
    return cords.filter((el) => el.val === "+");
}