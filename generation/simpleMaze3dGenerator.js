import Maze3dGenerator from "./maze3dGenerator.js";

class SimpleMaze3dGenerator extends Maze3dGenerator{
    constructor(level, row, col){
        super(level, row, col);

    }

    
    generate(){
        //randomly selecting start and end locations
        const start = [Math.floor(Math.random() * this.level), Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        const finish = [Math.floor(Math.random() * this.level), Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        const directions = [[0,1,0], [0,0,1], [0,0,-1],[0,-1,0],[1,0,0], [-1,0,0]];
        
        //creating maze with all walls
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
                maze = this.breakWalls(maze,prevLocation,currLocation,step);
            }   
        } while (currLocation[0]!== finish[0] || currLocation[1]!== finish[1] || currLocation[2]!== finish[2])
        console.log(maze.toString())
        return maze;
    }
}
export default SimpleMaze3dGenerator;

let newMaze = new SimpleMaze3dGenerator(2,7,6);
console.log(newMaze.measureAlgorithmTime())