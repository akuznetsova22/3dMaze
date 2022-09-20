import Maze3dGenerator from "./maze3dGenerator.js";

class DFSMaze3dGenerator extends Maze3dGenerator{
    constructor(level, row, col){
        super(level, row, col);
    }


    getNeighbours(cell){
        const directions = [[0,1,0], [0,0,1], [0,0,-1],[0,-1,0],[1,0,0], [-1,0,0]];
        let neighbours = new Array(directions.length);
        neighbours = directions.map(x => [x[0] + cell[0], x[1]+cell[1], x[2]+cell[2]]);
        let validNeighbours = [];
        for (let neighbour of neighbours){
            if (this.isInMaze(neighbour)){
                validNeighbours.push(neighbour)
            }
        }
        return validNeighbours;
    }
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

    generate(){
        const start = [0, Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        let finish = [this.level-1, Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        let visited = new Array();

        //creating maze with all walls
        let maze = super.generate(start, finish);
        maze = this.addVisitedIdentifier(maze);
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
                //adding the neighbour to visited and removing from unvisited
                visited.push(n)
                currLocation = n;
                //marking cell as visited
                maze.maze[n[0]][n[1]][n[2]][6] = true;
            } else {
                let newLocation = visited.pop();
                currLocation = newLocation
            }
        }
        console.log(maze.toString())
        return maze;
    }
}

export default DFSMaze3dGenerator;


let newMaze = new DFSMaze3dGenerator(2,7,6);
console.log(newMaze.measureAlgorithmTime())