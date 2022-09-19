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
    getUnvisitedNeighbours(visited, cell){
        const neighbours = this.getNeighbours(cell);
        let unvisited = new Array();
        for (let neighbour of neighbours){
            if (!visited.includes(String(neighbour))){
                unvisited.push(neighbour);
            }
        }
        return unvisited;
    }
    generate(){
        const start = [Math.floor(Math.random() * this.level), Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        const finish = [Math.floor(Math.random() * this.level), Math.floor(Math.random() * this.row), Math.floor(Math.random() * this.col)];
        let visited = new Array();

        //creating maze with all walls
        let maze = super.generate(start, finish);
        let step;
        let currLocation = start;
        let n;
        visited.push(String(currLocation))
        while (visited.length){
            let unvisited = this.getUnvisitedNeighbours(visited, currLocation);
            //checking if current cell has unvisited neighbours
            if (unvisited.length){
                n = unvisited[0];
                //removing the wall beween the current cell and chosen unvisited neighbour
                step = [n[0] - currLocation[0], n[1] - currLocation[1], n[2] - currLocation[2]]
                if(step[0] === 1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][4] = true;
                    maze.maze[n[0]][n[1]][n[2]][5] = true;
                } else if (step[0] === -1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][5] = true;
                    maze.maze[n[0]][n[1]][n[2]][4] = true;
                } else if (step[1] === 1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][2] = false;
                    maze.maze[n[0]][n[1]][n[2]][3] = false;
                } else if (step[1] === -1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][3] = false;
                    maze.maze[n[0]][n[1]][n[2]][2] = false;
                } else if (step[2] === 1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][1] = false;
                    maze.maze[n[0]][n[1]][n[2]][0] = false;
                } else if (step[2] === -1){
                    maze.maze[currLocation[0]][currLocation[1]][currLocation[2]][0] = false;
                    maze.maze[n[0]][n[1]][n[2]][1] = false;
                } 
                //adding the neighbour to visited and removing from unvisited
                visited.push(String(n));
                currLocation = n;

            } else {
                let newLocation = visited.pop();
                currLocation = [Number(newLocation[0]),Number(newLocation[1]), Number(newLocation[2])]
            }

        }
        console.log(maze.toString())
        return maze;
    }
}

export default DFSMaze3dGenerator;


let newMaze = new DFSMaze3dGenerator(2,6,5);
console.log(newMaze.measureAlgorithmTime())