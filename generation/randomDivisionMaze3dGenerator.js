import Maze3dGenerator from "./maze3dGenerator.js";
/**
 * This class creates a maze using random division method
 */
class RandomDivisionMaze3dGenerator extends Maze3dGenerator{
    constructor(level, row, col){
        super(level, row, col);
    }

    /**
     * creates maze with no walls
     * @param {Maze3d} maze 
     * @returns Maze3d
     */
    createChamber(maze){
        for (let i = 0; i < maze.length; i++){
            for (let j = 0; j < maze[0].length; j++){
                for (let k = 0; k < maze[0][0].length; k++){
                    maze[i][j][k] = [false, false, false, false, false, false]
                }
            }
        }
        return maze;
    }
    /**
     * creates random walls within the maze with exits
     * @param {Maze3d} maze 
     * @returns Maze3d
     */
    fillWalls(maze){
        //create a random vertical wall with an exit
        let vertical = Math.floor(Math.random() * this.col);
        let exitVert = Math.floor(Math.random() * this.row);
        for (let row = 0; row < maze[0].length; row++){
            if (row!==exitVert){
                maze[row][vertical][0] = true
        }else{
            continue}
        }
        //create a random horizontal wall with an exit
        let horizontal = Math.floor(Math.random() * this.row)
        let exitHorizontal = Math.floor(Math.random() * this.col);
        for (let row = 0; row < maze[0].length; row++){
            for (let col = 0; col < maze[0][0].length; col ++)
                if(row === horizontal && col!== exitHorizontal){
                    maze[row][col][2] = true
            }else{
                continue}
        }
        return maze;
    }

    /**
     * fills maze with walls and lifts
     * @param {Maze3d} maze 
     * @returns Maze3d
     */
    buildMaze(maze){
        //repeatedly build random walls with exits
        for (let level = 0; level < maze.maze.length; level++){
            for (let i = 0; i < 4; i++){
                maze.maze[level] = this.fillWalls(maze.maze[level]);
            }
        }
        //create lifts
        maze = this.createLifts(maze);
        //Insert check whether there is a solution; else a loop until there is a solution
        return maze;
    }

    /**
     * breaks walls between levels of the maze
     * @param {Maze3d} maze 
     * @returns Maze3d
     */
    createLifts(maze){
        for (let i = 0; i < Math.floor(this.row * this.col/2); i++){
            let upCol = Math.floor(Math.random() * this.col);
            let upLevel = Math.floor(Math.random() * this.level);
            let upRow = Math.floor(Math.random() * this.row);
            if (upLevel === this.level-1){
                maze.maze[upLevel][upRow][upCol][5] = true;
                maze.maze[upLevel-1][upRow][upCol][4] = true;
            }
            else if (upLevel === 0){
                maze.maze[upLevel][upRow][upCol][4] = true;
                maze.maze[upLevel+1][upRow][upCol][5] = true;
            } else {
                maze.maze[upLevel-1][upRow][upCol][4] = true;
                maze.maze[upLevel][upRow][upCol][4] = true;
                maze.maze[upLevel][upRow][upCol][5] = true;
                maze.maze[upLevel+1][upRow][upCol][5] = true;
            }
        }
        return maze
    }
    /**
     * generates the maze
     */
    generate(){
        const start = [0, Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        const finish = [this.level-1, Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];

        //creating maze with all walls
        let maze = super.generate(start, finish);
        for (let i = 0; i < maze.maze.length; i++){
            for (let j = 0; j < maze.maze[0].length; j++){
                for (let k = 0; k < maze.maze[0][0].length; k++){
                    if (k === 0){
                        maze.maze[i][j][k] = [true, false, false, false, false, false]
                    } else{
                        maze.maze[i][j][k] = [false, false, false, false, false, false]
                    }
                }
            }
        }
        maze = this.buildMaze(maze);
        //assures exits and entrances are accessible
        if (start[2]>0){
            maze.maze[start[0]][start[1]][start[2]] = [false,false,false,false,true,false]
        } else {
            maze.maze[start[0]][start[1]][start[2]] = [true,false,false,false,true,false]

        }
        if (finish[2]>0){
            maze.maze[finish[0]][finish[1]][finish[2]] = [false,false,false,false,false,true]
        } else {
            maze.maze[finish[0]][finish[1]][finish[2]] = [true,false,false,false,false,true]

        }
        
    }
}
export default RandomDivisionMaze3dGenerator;

/*
let maze = new RandomDivisionMaze3dGenerator(2,7,6);
let newMaze = maze.generate();
console.log(maze);
console.log(maze.measureAlgorithmTime())
*/