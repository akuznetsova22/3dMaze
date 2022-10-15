import mazeState from "./mazeState.js";

class Node{
    static numNode = 0;
    constructor(maze,level, row, col){
        this.maze = maze;
        this.level = level;
        this.row = row;
        this.col = col;
        this.state = new mazeState(Node.numNode,maze,level,row, col);
        this.neighbours = [] ;
        this.visited = 0;
        this.frontier = 0;
        Node.numNode++;
    }
    isInMaze(cell){
        if(cell[1] >=0 && cell[1] <= this.maze.maze[0].length){
            if(cell[2] >=0 && cell[2] <= this.maze.maze[0][0].length){
                if(cell[0] >=0 && cell[0] <= this.maze.maze.length){  
                    return true;
                }
            }
        }
        return false;
    }
    addNeighbours(cell){
        const n = [];
        const directions = [[0,1,0], [0,0,1], [0,0,-1],[0,-1,0],[1,0,0], [-1,0,0]];
        let neighbours = new Array(directions.length);
        neighbours = directions.map(x => [x[0] + cell[0], x[1]+cell[1], x[2]+cell[2]]);
        for (let neighbour of neighbours){
            if (this.isInMaze(neighbour)){
                this.neighbours.push(neighbour)
            }
        }
    
    }
    addAccessibleNeighbours(cell){
        let accessibleNeighbours = [];
        for (let neighbour of this.neighbours){
            let step = [neighbour[0] - cell[0], neighbour[1] - cell[1], neighbour[2] - cell[2]];
            if (String(step) === String([0,1,0])){
                if (this.maze.maze[cell[0]][cell[1]][cell[2]][2] === false){
                    accessibleNeighbours.push(neighbour);
                }
            }
            else if (String(step) === String([0,0,1])){
                if (this.maze.maze[cell[0]][cell[1]][cell[2]][1] === false){
                    accessibleNeighbours.push(neighbour);
                }
            }
            else if (String(step) === String([0,0,-1])){
                if (this.maze.maze[cell[0]][cell[1]][cell[2]][0] === false){
                    accessibleNeighbours.push(neighbour);
                }
            }
            else if (String(step) === String([0,-1,0])){
                if (this.maze.maze[cell[0]][cell[1]][cell[2]][3] === false){
                    accessibleNeighbours.push(neighbour);
                }
            }
            else if (String(step) === String([1,0,0])){
                if (this.maze.maze[cell[0]][cell[1]][cell[2]][4] === true){
                    accessibleNeighbours.push(neighbour);
                }
            }
            else if (String(step) === String([-1,0,0])){
                if (this.maze.maze[cell[0]][cell[1]][cell[2]][5] === true){
                    accessibleNeighbours.push(neighbour);
                }
            }
            this.neighbours = [];
            this.neighbours = accessibleNeighbours;
        }
    }
}

export default Node;