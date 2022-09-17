import Maze3dGenerator from "./maze3dGenerator.js";
import Maze3d from "./maze3d.js";

class SimpleMaze3dGenerator extends Maze3dGenerator{
    constructor(level, row, col){
        super(level, row, col);

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
    generate(){
        //creating maze with all walls

        //randomly selecting start and end locations
        const start = [Math.floor(Math.random() * this.level), Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        const finish = [Math.floor(Math.random() * this.level), Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        const directions = [[0,1,0], [0,0,1], [0,0,-1],[0,-1,0],[1,0,0], [-1,0,0]];
        let maze = super.generate(start, finish);
        let step;
        let prevLocation;
        let currLocation = start;
        //while not reached finish coordinates
        do{
            //chossing random valid move
            step = directions[Math.floor(Math.random() * directions.length)];

            let newLocation = [currLocation[0] + step[0], currLocation[1] + step[1], currLocation[2] + step[2]]
            if (this.isInMaze(newLocation) ){
                prevLocation = currLocation;
                currLocation = newLocation;

                //breaking the walls for that move to be possible
                if(step[0] === 1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][5] = true;
                    maze.maze[prevLocation[0]][prevLocation[1]][prevLocation[2]][4] = true;
                } else if (step[0] === -1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][4] = true;
                    maze.maze[prevLocation[0]][prevLocation[1]][prevLocation[2]][5] = true;
                } else if (step[1] === 1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][3] = false;
                    maze.maze[prevLocation[0]][prevLocation[1]][prevLocation[2]][2] = false;
                } else if (step[1] === -1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][2] = false;
                    maze.maze[prevLocation[0]][prevLocation[1]][prevLocation[2]][3] = false;
                } else if (step[2] === 1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][0] = false;
                    maze.maze[prevLocation[0]][prevLocation[1]][prevLocation[2]][1] = false;
                } else if (step[2] === -1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][1] = false;
                    maze.maze[prevLocation[0]][prevLocation[1]][prevLocation[2]][0] = false;
                }     
            }   
        } while (currLocation[0]!== finish[0] || currLocation[1]!== finish[1] || currLocation[2]!== finish[2])
        console.log(maze.toString())
        return maze;
    }
}
export default SimpleMaze3dGenerator;

let newMaze = new SimpleMaze3dGenerator(2,7,6);
console.log(newMaze.measureAlgorithmTime())