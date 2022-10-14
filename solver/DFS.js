import Searchable from "./searchable.js";
import Node from "./node.js";
import DFSMaze3dGenerator from "../generation/DFSMaze3dGenerator.js";
class DFS extends Searchable{
    constructor(search){
        super(search);
    }
    findSolution(start = [0,0,0], finish = [this.search.maze.length-1, this.search.maze[0].length-1, this.search.maze[0][0].length-1]){
        //initialising first node
        let node = new Node(this.search, start[0], start[1], start[2]);
        node.addNeighbours(start);
        node.addAccessibleNeighbours(start);

        //setting frontier with first node in it
        let frontier = [];
        frontier.push(node);
        node.frontier = 1;

        //setting explored to be empty
        let explored = [];
        while (true){
            // return failure if the frontier is empty
            if (!frontier.length){
                return false;
            }
            // choosing the deepest node from the frontier
            let currNode = frontier.pop();
            currNode.addNeighbours(currNode.state.currState);
            currNode.addAccessibleNeighbours(currNode.state.currState);
            //returning solution if node contains goal state
            if (String(currNode.state.currState) === String(currNode.state.goalState)){
                explored.push(currNode.state.currState);
                return explored;
            }
            //adding node to the explored
            if (currNode.visited === 0){
                explored.push(currNode.state.currState);
                currNode.visited = 1;
            }
            for (let node of currNode.neighbours){
                //initialising child node
                let newNode = new Node(this.search, node[0], node[1], node[2]);
                newNode.addNeighbours(node);
                newNode.addAccessibleNeighbours(node);
                for (let i of frontier){
                    if (String(i.state.currState) === String(newNode.state.currState)){
                        newNode.frontier = 1;
                    };
                }
                for (let j of explored){
                    if (String(j) === String(newNode.state.currState)){
                        newNode.visited = 1;
                    };
                }
                if(newNode.visited === 0 && newNode.frontier === 0){
                    //adding children nodes to the frontier if not visited and not in frontier
                    frontier.push(newNode);
                    newNode.frontier = 1;
                }
            }
        }
    return false;
    }

}

export default DFS;
/*
let maze = new DFSMaze3dGenerator(2,3,3)
let newMaze = maze.generate();
let dfsSearch = new DFS(newMaze);
console.log(dfsSearch.findSolution());
*/