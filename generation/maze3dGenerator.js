import Maze3d from "./maze3d.js";

class Maze3dGenerator{
    constructor(level, row, col){
        if (this.constructor === Maze3dGenerator) {
            throw new Error('Abstract class Maze3dGenerator cannot be instantiated');
          }
        this.level = level;
        this.row = row;
        this.col = col;
    }
    isInMaze(cell){
        if(cell[1]>=0 && cell[1] < this.row){
            if(cell[2]>=0 && cell[2] < this.col){
                if(cell[0]>=0 && cell[0] < this.level){  
                    return true;
                }
            }
        }
        return false;
    }
    addVisitedIdentifier(maze){
        //each cell is added a boolean value identifying whether it has been visited
        for (let level = 0; level < this.level; level++){
            for (let row = 0; row < this.row; row++){
                for (let col = 0; col < this.col; col++){
                    maze.maze[level][row][col].push(false)
                }
            }
        } return maze;
    }
    generate(start, finish){
        const maze = this.createWalls()
        return new Maze3d(maze, start, finish)
    }
    createWalls(){
        let maze = new Array(this.level);
        for (let i = 0; i < this.level; i++){
            maze[i] = new Array(this.row);
            for (let j = 0; j < this.row; j++){
                maze[i][j] = new Array(this.col);
                for (let k = 0; k < this.col; k++){
                    maze[i][j][k] = [true, true, true, true, false, false,false];
                }
            }
        }
        return maze;
    }
    breakWalls(maze, prevCell, newCell, step){
        if(step[0] === 1){
            maze.maze[newCell[0]][newCell[1]][newCell[2]][5] = true;
            maze.maze[prevCell[0]][prevCell[1]][prevCell[2]][4] = true;
        } else if (step[0] === -1){
            maze.maze[newCell[0]][newCell[1]][newCell[2]][4] = true;
            maze.maze[prevCell[0]][prevCell[1]][prevCell[2]][5] = true;
        } else if (step[1] === 1){
            maze.maze[newCell[0]][newCell[1]][newCell[2]][3] = false;
            maze.maze[prevCell[0]][prevCell[1]][prevCell[2]][2] = false;
        } else if (step[1] === -1){
            maze.maze[newCell[0]][newCell[1]][newCell[2]][2] = false;
            maze.maze[prevCell[0]][prevCell[1]][prevCell[2]][3] = false;
        } else if (step[2] === 1){
            maze.maze[newCell[0]][newCell[1]][newCell[2]][0] = false;
            maze.maze[prevCell[0]][prevCell[1]][prevCell[2]][1] = false;
        } else if (step[2] === -1){
            maze.maze[newCell[0]][newCell[1]][newCell[2]][1] = false;
            maze.maze[prevCell[0]][prevCell[1]][prevCell[2]][0] = false;
        }  
        return maze;
    }

    measureAlgorithmTime(){
        let start = new Date().getTime();
        this.generate();
        let end = new Date().getTime();
        const runTime = end- start;
        return `Runtime: ${runTime} milliseconds`;
    }
}
export default Maze3dGenerator;