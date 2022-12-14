import Maze3dGenerator from "./maze3dGenerator.js";
/**
 * This class creates a Maze using DFS algorythm
 */
class DFSMaze3dGenerator extends Maze3dGenerator{
    constructor(level, row, col){
        super(level, row, col);
    }
    /**
     * returns all neighbours of the current cell
     * @param {Array} cell 
     * @returns array
     */
    getNeighbours(cell){
        const directions = [[0,1,0], [0,0,1], [0,0,-1],[0,-1,0],[1,0,0], [-1,0,0]];
        let neighbours = new Array(directions.length);
        neighbours = directions.map(x => [x[0] + cell[0], x[1]+cell[1], x[2]+cell[2]]);
        let validNeighbours = [];
        for (let neighbour of neighbours){
            //adds neighbour if it is in the maze dimentions
            if (this.isInMaze(neighbour)){
                validNeighbours.push(neighbour)
            }
        }
        return validNeighbours;
    }
    /**
     * returns all unvisited neighbours of the cell
     * @param {Maze3d} maze 
     * @param {Array} cell 
     * @returns array
     */
    getUnvisitedNeighbours(maze,cell){
        const neighbours = this.getNeighbours(cell);
        let unvisited = new Array();
        for (let neighbour of neighbours){
            if (maze.maze[neighbour[0]][neighbour[1]][neighbour[2]][6] === false){
                unvisited.push(neighbour);
            }
        }
        return unvisited;
    }
    /**
     * generates maze
     * @returns Maze3d
     */
    generate(){
        const start = [0, 0, 0];
        let finish = [this.level-1, this.row-1, this.col-1];
        let visited = new Array();

        //creating maze with all walls
        let maze = super.generate(start, finish);
        let step;
        let n;
        let currLocation = start;
        //marking cell as visited 
        maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][6] = true;
        visited.push(currLocation)

        while (visited.length){
            let unvisited = this.getUnvisitedNeighbours(maze,currLocation);
            //checking if current cell has unvisited neighbours
            if (unvisited.length){
                let randomIdx = Math.floor(Math.random() * unvisited.length);
                n = unvisited[randomIdx];
                //removing the wall beween the current cell and chosen unvisited neighbour
                step = [n[0] - currLocation[0], n[1] - currLocation[1], n[2] - currLocation[2]]
                maze = this.breakWalls(maze, currLocation,n,step);
                //adding the neighbour to visited
                visited.push(n)
                currLocation = n;
                //marking cell as visited
                maze.maze[n[0]][n[1]][n[2]][6] = true;
            } else {
                currLocation = visited.pop();
            }

        }
        return maze;
    }
}

export default DFSMaze3dGenerator;


//let maze = new DFSMaze3dGenerator(2,3,3)
//let newMaze = maze.generate();
//console.log(maze.measureAlgorithmTime())