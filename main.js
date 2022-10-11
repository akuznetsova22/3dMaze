import DFSMaze3dGenerator from "/generation/DFSMaze3dGenerator.js";

const levels = document.getElementById('levels');
const rows = document.getElementById('rows');
const cols = document.getElementById('cols');
const btnStart = document.getElementById('start');
const btnSolve = document.getElementById('solve');
const searchAlgo = document.getElementById('algo');
const mazeField = document.getElementById('graph');
const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnReset = document.getElementById('reset');




function mazeWidth(cols){
    let size = '';
    for (let i=0; i< cols; i++){
        size += '1fr '
    }
    return size

}
function markCurrent(cell){
    cell.textContent = 'X';
    cell.style.color = 'blue';

}
btnStart.addEventListener('click', () =>{
    const nLevels = levels.value;
    const nRows = rows.value;
    const nCols = cols.value;
    mazeField.style.width = nCols * 41 + 'px';
    mazeField.style.gridTemplateColumns = mazeWidth(nCols);
    for (let i = 0; i< nRows; i++){
        for (let j = 0; j < nCols; j++){
            let square = document.createElement('div');
            square.classList.add('cell');
            square.id = `r${i+1}c${j+1}`
            mazeField.append(square);
        }
    }
    btnDown.hidden= false;
    btnUp.hidden=false;
    btnReset.hidden = false;
    let start = document.getElementById('r1c1');
    let maze = new DFSMaze3dGenerator(nLevels, nRows, nCols).generate();
    console.log(maze.toString())
    let currLevel = 0;
    drawLevel(maze, currLevel);
    markCurrent(start);
    playGame(maze);
});


function drawLevel(maze,level){
    const up = '\u{2191}';
    const down = '\u{2193}';
    const upDown = '\u{2195}';
    for (let row = 0; row < maze.maze[0].length; row++){
        for (let col = 0; col < maze.maze[0][0].length; col++){
            let cell = document.getElementById(`r${row+1}c${col+1}`)
            if(row === 0){
                cell.style.borderTop = '1px solid black'

            }
            if(maze.maze[level][row][col][0] === true){
                cell.style.borderLeft = '1px solid black'

            }
            if(maze.maze[level][row][col][2] === true){
                cell.style.borderBottom = '1px solid black'
            }
            if(maze.maze[level][row][col][4] === true && maze.maze[level][row][col][5] === true  ){
                cell.textContent = upDown;
            } else if (maze.maze[level][row][col][4] === true ){
                cell.textContent = up;
            } else if (maze.maze[level][row][col][5] === true ){
                cell.textContent = down;
            }
            if (col === maze.maze[0][0].length-1){
                cell.style.borderRight = '1px solid black'
            }
        }
    }
};

function playGame(maze){
    let currLocation = document.getElementById('r1c1');
    console.log(currLocation);
}

