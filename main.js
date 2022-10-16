import DFSMaze3dGenerator from "/generation/DFSMaze3dGenerator.js";
import DFS from "./solver/DFS.js";
import BFS from "./solver/BFS.js";

// assigning elements of the HTML
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
const G = document.getElementById('over');
const solution = document.getElementById('solution');
const btnHint = document.getElementById('hint');
const btnSave = document.getElementById('btnSave');
const btnLoad = document.getElementById('load');
const loadGame = document.getElementById('savedGame');
const saveGame = document.getElementById('save');
const currGame = document.getElementById('game');
const load = document.getElementById('loadGame');

// declaring representation arrows codes 
const up = '\u{2191}';
const down = '\u{2193}';
const upDown = '\u{2195}';

btnStart.addEventListener('click', e =>{
    // creating design of the playing field with empty cells
    mazeField.innerHTML = '';
    mazeField.style.width = cols.value * 39 + 'px';
    mazeField.style.gridTemplateColumns = mazeWidth(cols.value);
    // each cell gets id accoring to its coordinates, starting from 11 (row 0, col 0)
    for (let i = 0; i< rows.value; i++){
        for (let j = 0; j < cols.value; j++){
            let square = document.createElement('div');
            square.classList.add('cell');
            square.id = `${i + 1}${j + 1}`
            mazeField.append(square);
        }
    }
    // revealing buttons and fields 
    G.hidden = true;
    btnDown.hidden = false;
    btnUp.hidden =false;
    btnReset.hidden = false;
    instructions.hidden = false;
    levelTitle.hidden = false;
    solution.hidden = false;  
    saveGame.hidden = false;
    load.hidden = false;

    // creating maze and drawing it on the console.
    let maze = new DFSMaze3dGenerator(levels.value, rows.value, cols.value).generate();
    console.log(maze.toString());
    //localStorage.setItem('maze', JSON.stringify(maze.maze));

    let start = document.getElementById('11');
    let currLoc = Number(start.id);
    let currLevel = 0;
    let currCell = start
    
    // drawing the maze on the html and marking the current location
    drawLevel(maze, currLevel);
    btnDisable(maze, currLevel, currLoc);
    markCurrent(currCell);

    btnSolve.addEventListener('click', () => {
        //implementing search algorithm starting from current location
        let currRow = Math.floor(currLoc / 10);
        let currCol = currLoc % 10;
        let currCell = document.getElementById(`${currRow}${currCol}`);
        let showSolution = [];
        if (searchAlgo.value === 'DFS'){
            let solve = new DFS(maze).findSolution([currLevel, currRow - 1, currCol - 1],[levels.value - 1, rows.value - 1, cols.value - 1]);
            console.log(solve);
        for (let i =0; i < solve.length; i++){
            showSolution.push(solve[i])
        }
        } else if (searchAlgo.value === 'BFS'){
            let solve = new BFS(maze).findSolution([currLevel, currRow - 1, currCol - 1],[levels.value - 1, rows.value - 1, cols.value - 1]);
            console.log(solve);
        for (let i =0; i < solve.length; i++){
            showSolution.push(solve[i])
        }
        }
        
        //adding animation to show solution to the user
        let idx = 0;
        let timerId = setInterval(() => {
            
            //finding next cell
            let nextMoveLevel = showSolution[idx][0];
            let nextMoveRow = showSolution[idx][1] + 1;
            let nextMoveCol = showSolution[idx][2] + 1;
            
            //restoring arrows in current cell
            restoreArrows(maze, currLevel, currLoc, currCell);
            
            //making a move to the next cell
            currLoc = nextMoveRow * 10 + nextMoveCol;
            currLevel = nextMoveLevel;
            currCell = document.getElementById(String(currLoc));
            
            //drawing the change to the user
            drawLevel(maze, currLevel);
            if (currLevel === levels.value -1){
                let finish = document.getElementById(`${rows.value}${cols.value}`);
                finish.textContent = 'G';
            };
            markCurrent(currCell); 

            idx++
        },300);
        setTimeout(() => {clearInterval(timerId);}, 300 * showSolution.length);
    });

    btnHint.addEventListener('click', () => {
        //assigning current location 
        let currRow = Math.floor(currLoc / 10);
        let currCol = currLoc % 10;
        let idx = 0;
        //setting the algorithm
        if (searchAlgo.value === 'DFS'){
            let solve = new DFS(maze).findSolution([0,0,0],[levels.value - 1, rows.value - 1, cols.value - 1]);
            // finding the next best move
            for (let i = 0; i< solve.length; i++){
                if (String(solve[i]) === String([currLevel, currRow - 1, currCol - 1])){
                    idx = i + 1;
                    break;
                }
            }
            let nextMove = solve[idx];
            let nextMoveLevel = nextMove[0];
            let nextMoveRow = nextMove[1] + 1;
            let nextMoveCol = nextMove[2] + 1;
            // saving the context of the next move cell
            let hintCell = document.getElementById(`${nextMoveRow}${nextMoveCol}`);
            let currContent = hintCell.textContent;
            
            //setting the hint value
            if (currLevel === nextMoveLevel){
                hintCell.textContent = 'X';
            }else if (currLevel < nextMoveLevel){
                hintCell.textContent = up;
            }else{
                hintCell.textContent = down;
            }
            hintCell.style.color = 'red';
            
            //restoring cell value
            setTimeout(() => {
                hintCell.textContent = currContent;
                hintCell.style.color = 'black';
            },2000); 
        };
    });
    btnLoad.addEventListener('click', () => {
        let gameName = loadGame.value;
        let currCell;
        let pastMaze = JSON.parse(localStorage.getItem(gameName));
        //checking if game exists
        if(pastMaze.length > 0){
            //loading parameters
            let rememberedLevel = Number(localStorage.getItem(`${gameName} level`));
            let rememberedLoc = Number(localStorage.getItem(`${gameName} location`));
            let rememberedLvls = Number(localStorage.getItem(`${gameName} levels`));
            let rememberedRows = Number(localStorage.getItem(`${gameName} rows`));
            let rememberedCols = Number(localStorage.getItem(`${gameName} cols`));
            maze = new DFSMaze3dGenerator(rememberedLvls, rememberedRows, rememberedCols).generate();
            maze.maze = pastMaze;
            console.log(maze.toString());
            //assigning current location
            currLoc = rememberedLoc;
            currLevel = rememberedLevel;
            let currRow = Math.floor(currLoc / 10);
            let currCol = currLoc % 10;
            currCell = document.getElementById(`${currRow}${currCol}`);

            // creating design of the playing field with empty cells
            mazeField.innerHTML = '';
            mazeField.style.width = rememberedCols * 39 + 'px';
            mazeField.style.gridTemplateColumns = mazeWidth(rememberedCols);
            // each cell gets id accoring to its coordinates, starting from 11 (row 0, col 0)
            for (let i = 0; i< rememberedRows; i++){
                for (let j = 0; j < rememberedCols; j++){
                    let square = document.createElement('div');
                    square.classList.add('cell');
                    square.id = `${i + 1}${j + 1}`
                    mazeField.append(square);
                }
            }
            loadGame.value = '';
            // drawing the maze on the html and marking the current location
            drawLevel(maze, currLevel);
            btnDisable(maze, currLevel, currLoc);
            markCurrent(currCell);
            loadGame.value = '';
        } else {
            alert('No such game saved')
        }
    });
    btnSave.addEventListener('click', () => {
        let game = currGame.value;
        //checking if entered name of game session
        if (!game){
            alert('Please enter game name')
        } else {
            //saving parameters to memory
            localStorage.setItem(`${game} location`, currLoc);
            localStorage.setItem(`${game} level`, currLevel);
            localStorage.setItem(game, JSON.stringify(maze.maze) );
            localStorage.setItem(`${game} rows`, rows.value);
            localStorage.setItem(`${game} cols`, cols.value);
            localStorage.setItem(`${game} levels`, levels.value);
            //alerting of success
            currGame.value = 'Saved!';
            setTimeout(() => {
                currGame.value = '';
            },2000); 
        }

    })
    // creating move commands
    document.addEventListener('keydown', e => {
        // location current coordinates
        let currRow = Math.floor(currLoc / 10);
        let currCol = currLoc % 10;
        let currCell = document.getElementById(`${currRow}${currCol}`);
        currLoc = Number(currCell.id);

        // Moving down
        if (e.code === 'ArrowDown'){
            // if the move is available: no border between cells and cell withing the maze size
            // if true - changing location and moving the current location mark.
            // Else announcing the error
            if (currRow < rows.value && maze.maze[currLevel][currRow - 1][currCol - 1][2] === false){
                errorMsg.hidden = true;

                // restoring the arrow indication in the current cell
                restoreArrows(maze, currLevel, currLoc, currCell);

                // assigning new cell
                currLoc += 10;
                currCell = document.getElementById(String(currLoc));

                // adding indication of ladder availability, marking current location
                btnDisable(maze, currLevel, currLoc);
                markCurrent(currCell);

                // checking whether game is over. if true - revealing the GAME OVER message
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                };
            } else {
                errorMsg.hidden = false;
            }
        }

        // Moving up
        if (e.code === 'ArrowUp'){
            // if the move is available: no border between cells and cell withing the maze size
            // if true - changing location and moving the current location mark.
            // Else announcing the error
            if (currRow > 0 && maze.maze[currLevel][currRow - 1][currCol - 1][3] === false){
                errorMsg.hidden = true;

                // restoring the arrow indication in the current cell
                restoreArrows(maze, currLevel, currLoc, currCell);

                // assigning new cell
                currLoc -= 10;
                currCell = document.getElementById(String(currLoc));

                // adding indication of ladder availability, marking current location
                btnDisable(maze, currLevel, currLoc);
                markCurrent(currCell);

                // checking whether game is over. if true - revealing the GAME OVER message
                if (currLevel === levels.value - 1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                };
            }else {
                errorMsg.hidden = false;
            }
        };
        // Moving left
        if (e.code === 'ArrowLeft'){
            // if the move is available: no border between cells and cell withing the maze size
            // if true - changing location and moving the current location mark.
            // Else announcing the error
            if (currCol > 0 && maze.maze[currLevel][currRow - 1][currCol - 1][0] === false){
                errorMsg.hidden = true;

                // restoring the arrow indication in the current cell
                restoreArrows(maze, currLevel, currLoc, currCell);

                // assigning new cell
                currLoc -= 1;
                currCell = document.getElementById(String(currLoc));
                
                // adding indication of ladder availability, marking current location
                btnDisable(maze, currLevel, currLoc);
                markCurrent(currCell);

                // checking whether game is over. if true - revealing the GAME OVER message
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                };

            }else {
                errorMsg.hidden = false;
            }
        };
        // Moving right
        if (e.code === 'ArrowRight'){
            // if the move is available: no border between cells and cell withing the maze size
            // if true - changing location and moving the current location mark.
            // Else announcing the error
            if (currCol < cols.value && maze.maze[currLevel][currRow -1][currCol -1][1] === false){
                errorMsg.hidden = true;

                // restoring the arrow indication in the current cell
                restoreArrows(maze, currLevel, currLoc, currCell);

                //assigning new cell
                currLoc += 1;
                currCell = document.getElementById(String(currLoc));

                // adding indication of ladder availability, marking current location
                btnDisable(maze, currLevel, currLoc);
                markCurrent(currCell);
                
                // checking whether game is over. if true - revealing the GAME OVER message
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                };
            }else {
                errorMsg.hidden = false;
            }
        };
        // Moving level up
        if (e.code === 'Digit2'){
            // if the move is available: ladder available and level withing the maze size
            // if true - changing location and moving the current location mark.
            // Else announcing the error
            if (maze.maze[currLevel][currRow -1][currCol -1][4] === true){
                errorMsg.hidden = true;
                
                // restoring the arrow indication in the current cell
                restoreArrows(maze, currLevel, currLoc, currCell);
                
                //assigning new cell
                currLevel += 1;

                // adding indication of ladder availability, marking current location, drawing new level
                drawLevel(maze, currLevel);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);

                //marking the exit, if applicable
                if (currLevel === levels.value -1){
                    let finish = document.getElementById(`${rows.value}${cols.value}`);
                    finish.textContent = 'G';
                };
                
                // checking whether game is over. if true - revealing the GAME OVER message
                if (currLevel === levels.value - 1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                };
            }else {
                errorMsg.hidden = false;
            }
        }
        //Moving level down
        if (e.code === 'Digit3'){
            // if the move is available: ladder available and level withing the maze size
            // if true - changing location and moving the current location mark.
            // Else announcing the error
            if (maze.maze[currLevel][currRow -1][currCol -1][5] === true){
                errorMsg.hidden = true;
                
                // restoring the arrow indication in the current cell
                restoreArrows(maze, currLevel, currLoc, currCell);
                
                //assigning new cell
                currLevel -= 1;

                // adding indication of ladder availability, marking current location, drawing new level
                drawLevel(maze, currLevel);
                btnDisable(maze,currLevel, currLoc);
                markCurrent(currCell);

                // checking whether game is over. if true - revealing the GAME OVER message
                if (currLevel === levels.value -1 && currCell.id === `${rows.value}${cols.value}`){
                    G.hidden = false;
                };
            }else {
                errorMsg.hidden = false;
            }
        }

    });

    btnReset.addEventListener('click', () => {
        // hiding GAME OVER message
        G.hidden = true;

        // setting current location
        let currRow = Math.floor(Number(currLoc) / 10);
        let currCol = Number(currLoc) % 10;
        let currCell = document.getElementById(`${currRow}${currCol}`);

        // restoring arrows in previous cell, drawing starting level and marking current cell
        restoreArrows(maze, currLevel, currLoc, currCell);

        currLevel = 0;
        drawLevel(maze, currLevel);
        markCurrent(start);
        
        // assingning current location to start
        currCell = start;
        currLoc = Number(currCell.id);

        // adding indication of ladder availability
        btnDisable(maze,currLevel, currLoc);
    });

});

/**
 * returns size of the maze graph for the grid creation
 * @param {number} cols 
 * @returns number
 */
function mazeWidth(cols){
    let size = '';
    for (let i = 0; i < cols; i++){
        size += '1fr '
    }
    return size

}

/**
 * marks current location with X
 * @param {HTMLElement} cell 
 */
function markCurrent(cell){
    cell.textContent = 'X';

}

/**
 * draws maze in html
 * @param {Maze3d} maze 
 * @param {number} level 
 */
function drawLevel(maze,level){
    // create level indicator
    levelTitle.textContent = `Level ${level + 1}`
    for (let row = 0; row < maze.maze[0].length; row++){
        for (let col = 0; col < maze.maze[0][0].length; col++){
            // connects cell from js to element in html
            let cell = document.getElementById(`${row + 1}${col + 1}`);
            // draws top border
            if(row === 0){
                cell.style.borderTop = '1px solid black'
            };
            // draws left border
            if(maze.maze[level][row][col][0] === true){
                cell.style.borderLeft = '1px solid black'
            } else {
                cell.style.borderLeft = 'none'
            };
            // draws bottom border
            if(maze.maze[level][row][col][2] === true){
                cell.style.borderBottom = '1px solid black'
            }else {
                cell.style.borderBottom = 'none'
            }
            // draws right border
            if (col === maze.maze[0][0].length-1){
                cell.style.borderRight = '1px solid black'
            }
            // draws ladder indication
            if(maze.maze[level][row][col][4] === true && maze.maze[level][row][col][5] === true  ){
                cell.textContent = upDown;
            } else if (maze.maze[level][row][col][4] === true ){
                cell.textContent = up;
            } else if (maze.maze[level][row][col][5] === true ){
                cell.textContent = down;
            } else {
                cell.textContent ='';
            }
        }
    }
};

/**
 * anables and disables ladder indications where applicable
 * @param {Maze3d} maze 
 * @param {number} currLevel 
 * @param {number} currLoc 
 */
function btnDisable(maze, currLevel,currLoc){
    let currRow = Math.floor(currLoc / 10);
    let currCol = currLoc % 10;
    if(maze.maze[currLevel][currRow - 1][currCol - 1][4] === true ){
        btnUp.disabled=false;
    } else {
        btnUp.disabled=true;
    }
    if (maze.maze[currLevel][currRow - 1][currCol - 1][5] === true ){
        btnDown.disabled= false;
    } else {
        btnDown.disabled=true;
    };
};

/**
 * draws ladder arrows where applicable
 * @param {Maze3d} maze 
 * @param {number} currLevel 
 * @param {number} currLoc 
 * @param {HTMLElement} currCell 
 */
function restoreArrows(maze, currLevel, currLoc, currCell){
    let currRow = Math.floor(currLoc / 10);
    let currCol = currLoc % 10;
    if(maze.maze[currLevel][currRow - 1][currCol - 1][4] === true && maze.maze[currLevel][currRow - 1][currCol - 1][5] === true  ){
        currCell.textContent = upDown;
    } else if (maze.maze[currLevel][currRow - 1][currCol - 1][4] === true ){
        currCell.textContent = up;
    } else if (maze.maze[currLevel][currRow - 1][currCol - 1][5] === true ){
        currCell.textContent = down;
    } else {
        currCell.textContent = '';
    }
}



