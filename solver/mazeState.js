/**
 * This class represents state of the node of the maze
 */
import State from "./state.js";
class mazeState extends State{
    constructor(key,maze, level, row, col){
        super(key);
        this.level = level;
        this.row = row;
        this.col = col;
        this.maze = maze;
        this.currState = [level, row, col];
        this.initialState = [0,0,0];
        this.goalState = [this.maze.maze.length-1, this.maze.maze[0].length-1, this.maze.maze[0][0].length-1];
        this.state = [key, this.currState, this.initialState, this.goalState]

    }
}

export default mazeState;