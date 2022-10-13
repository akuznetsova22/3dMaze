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
const errorMsg = document.getElementById('error');
const instructions = document.getElementById('instructions');
const levelTitle = document.getElementById('lHeader');
const welcome = document.getElementById('welcome');
const G = document.getElementById('over');
const solution = document.getElementById('solution')

const up = '\u{2191}';
const down = '\u{2193}';
const upDown = '\u{2195}';


function mazeWidth(cols){
    let size = '';
    for (let i=0; i< cols; i++){
        size += '1fr '
    }
    return size

}
function markCurrent(cell){
    cell.textContent = 'X';

}
btnStart.addEventListener('click', () =>{
    solution.hidden = false;    
    mazeField.innerHTML = '';
    const nLevels = levels.value;
    const nRows = rows.value;
    const nCols = cols.value;
    mazeField.style.width = nCols * 41 + 'px';
    mazeField.style.gridTemplateColumns = mazeWidth(nCols);
    for (let i = 0; i< nRows; i++){
        for (let j = 0; j < nCols; j++){
            let square = document.createElement('div');
            square.classList.add('cell');
            square.id = `${i+1}${j+1}`
            mazeField.append(square);
        }
    }
    btnDown.hidden= false;
    btnUp.hidden=false;
    btnReset.hidden = false;
    instructions.hidden = false;
    levelTitle.hidden = false;

    let start = document.getElementById('11');
    let currLoc = Number(start.id);
    const maze = new DFSMaze3dGenerator(nLevels, nRows, nCols).generate();
    console.log(maze.toString())
    let currLevel = 0;
    drawLevel(maze, currLevel);
    btnDisable(maze,currLevel, currLoc);
    markCurrent(start);

    document.addEventListener('keydown', e => {
        let currRow = Math.floor(currLoc / 10);
        let currCol = currLoc % 10;
        let currCell = document.getElementById(`${currRow}${currCol}`);
        currLoc = Number(currCell.id);
        console.log(currLoc);        

        if (e.code === 'ArrowDown'){
            if (currRow < rows.value && maze.maze[currLevel][currRow -1][currCol -1][2] === false){
                errorMsg.hidden = true;
                let newLoc = currLoc + 10;
                if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow -1][currCol -1][5] === true  ){
                    currCell.textContent = upDown;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
                    currCell.textContent = up;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
                    currCell.textContent = down;
                } else {
                    currCell.textContent = '';
                }
                currCell = document.getElementById(String(newLoc));
                currLoc = Number(currCell.id);
                console.log(currLoc);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                }
            } else {
                errorMsg.hidden = false;
            }
        }

        if (e.code === 'ArrowUp'){
            if (currRow > 0 && maze.maze[currLevel][currRow -1][currCol -1][3] === false){
                errorMsg.hidden = true;
                let newLoc = currLoc - 10;
                if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow -1][currCol -1][5] === true  ){
                    currCell.textContent = upDown;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
                    currCell.textContent = up;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
                    currCell.textContent = down;
                } else {
                    currCell.textContent = '';
                }
                currCell = document.getElementById(String(newLoc));
                currLoc = Number(currCell.id);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                }
            }else {
                errorMsg.hidden = false;
            }
        };
        if (e.code === 'ArrowLeft'){
            if (currCol > 0 && maze.maze[currLevel][currRow -1][currCol -1][0] === false){
                errorMsg.hidden = true;
                let newLoc = currLoc - 1;
                if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow-1][currCol-1][5] === true  ){
                    currCell.textContent = upDown;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
                    currCell.textContent = up;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
                    currCell.textContent = down;
                } else {
                    currCell.textContent = '';
                }
                currCell = document.getElementById(String(newLoc));
                currLoc = Number(currCell.id);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                }
            }else {
                errorMsg.hidden = false;
            }
        };

        if (e.code === 'ArrowRight'){
            if (currCol < cols.value && maze.maze[currLevel][currRow -1][currCol -1][1] === false){
                errorMsg.hidden = true;
                let newLoc = currLoc + 1;
                if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow-1][currCol-1][5] === true  ){
                    currCell.textContent = upDown;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
                    currCell.textContent = up;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
                    currCell.textContent = down;
                } else {
                    currCell.textContent = '';
                }
                currCell = document.getElementById(String(newLoc));
                currLoc = Number(currCell.id);
                console.log(currLoc);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                }
            }else {
                errorMsg.hidden = false;
            }
        };
        if (e.code === 'Digit2'){
            if (maze.maze[currLevel][currRow -1][currCol -1][4] === true){
                errorMsg.hidden = true;
                currLevel+=1;
                if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow-1][currCol-1][5] === true  ){
                    currCell.textContent = upDown;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
                    currCell.textContent = up;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
                    currCell.textContent = down;
                } else {
                    currCell.textContent = '';
                }
                let newLoc = currLoc;
                console.log(currLevel);

                drawLevel(maze, currLevel);
                currCell = document.getElementById(String(newLoc));
                currLoc = Number(currCell.id);
                console.log(currLoc);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);
                if (currLevel === levels.value -1){
                    let finish = document.getElementById(`${rows.value}${cols.value}`);
                    finish.textContent = 'G';
                };
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                }
            }else {
                errorMsg.hidden = false;
            }
        }
        if (e.code === 'Digit3'){
            if (maze.maze[currLevel][currRow -1][currCol -1][5] === true){
                errorMsg.hidden = true;
                currLevel-=1;
                if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow-1][currCol-1][5] === true  ){
                    currCell.textContent = upDown;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
                    currCell.textContent = up;
                } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
                    currCell.textContent = down;
                } else {
                    currCell.textContent = '';
                }
                let newLoc = currLoc;
                drawLevel(maze, currLevel);
                currCell = document.getElementById(String(newLoc));
                currLoc = Number(currCell.id);
                console.log(currLoc);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                }
            }else {
                errorMsg.hidden = false;
            }
        }
        

    });

    btnReset.addEventListener('click', () => {
        currLevel = 0;
        G.hidden = true;
        let currRow = Math.floor(Number(currLoc) / 10);
        let currCol = Number(currLoc) % 10;
        let currCell = document.getElementById(`${currRow}${currCol}`);
        if(maze.maze[currLevel][currRow -1][currCol -1][4] === true && maze.maze[currLevel][currRow -1][currCol -1][5] === true  ){
            currCell.textContent = upDown;
        } else if (maze.maze[currLevel][currRow -1][currCol -1][4] === true ){
            currCell.textContent = up;
        } else if (maze.maze[currLevel][currRow -1][currCol -1][5] === true ){
            currCell.textContent = down;
        } else {
            currCell.textContent = '';
        }
        drawLevel(maze, currLevel);
        markCurrent(start);
        currCell = start;
        currLoc = Number(currCell.id);
        btnDisable(maze,currLevel, currLoc);
    });

});


function drawLevel(maze,level){
    levelTitle.textContent = `Level ${level + 1}`
    for (let row = 0; row < maze.maze[0].length; row++){
        for (let col = 0; col < maze.maze[0][0].length; col++){
            let cell = document.getElementById(`${row+1}${col+1}`)
            if(row === 0){
                cell.style.borderTop = '1px solid black'

            }
            if(maze.maze[level][row][col][0] === true){
                cell.style.borderLeft = '1px solid black'
            } else {
                cell.style.borderLeft = 'none'
            }
            if(maze.maze[level][row][col][2] === true){
                cell.style.borderBottom = '1px solid black'
            }else {
                cell.style.borderBottom = 'none'
            }
            if(maze.maze[level][row][col][4] === true && maze.maze[level][row][col][5] === true  ){
                cell.textContent = upDown;
            } else if (maze.maze[level][row][col][4] === true ){
                cell.textContent = up;
            } else if (maze.maze[level][row][col][5] === true ){
                cell.textContent = down;
            } else {
                cell.textContent ='';
            }
            if (col === maze.maze[0][0].length-1){
                cell.style.borderRight = '1px solid black'
            }
        }
    }
};

function btnDisable(maze, currLevel,currLoc){
    let currRow = Math.floor(currLoc / 10);
    let currCol = currLoc % 10;
    if(maze.maze[currLevel][currRow-1][currCol -1][4] === true ){
        btnUp.disabled=false;
    } else {
        btnUp.disabled=true;
    }
    if (maze.maze[currLevel][currRow-1][currCol -1][5] === true ){
        btnDown.disabled= false;
    } else {
        btnDown.disabled=true;
    };
}



