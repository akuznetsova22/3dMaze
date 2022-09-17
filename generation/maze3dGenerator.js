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
    generate(start, finish){
        const maze = this.createWalls()
        return new Maze3d(maze, start, finish)
    }
    createWalls(){
        let maze = new Array(this.level);
        for (let i = 0; i < maze.length; i++){
            maze[i] = new Array(this.row);
            for (let j = 0; j < maze[0].length; j++){
                maze[i][j] = new Array(this.col);
                for (let k = 0; k < maze[0][0].length; k++){
                    maze[i][j][k] = [true, true, true, true, false, false]
                }
            }
        }
        return maze;
    }
    measureAlgorithmTime(){
        let start = new Date().getTime();
        console.log(start);
        this.generate();
        let end = new Date().getTime();
        const runTime = end- start;
        return `Runtime: ${runTime} milliseconds`;
    }
}
export default Maze3dGenerator;