import Searchable from "./searchable.js";
import Node from "./node.js";
import DFSMaze3dGenerator from "../generation/DFSMaze3dGenerator.js";
class DFS extends Searchable{
    constructor(search){
        super(search);
    }
    findSolution(start = [0,0,0], finish = [this.search.maze.length-1, this.search.maze[0].length-1, this.search.maze[0][0].length-1]){
        //setting frontier with first node in it
        let node = new Node(this.search, start[0], start[1], start[2]);
        node.addNeighbours(node.state.currState);
        node.addAccessibleNeighbours(node.state.currState);
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
            // choosing the deepest node from the frontier and adding it to explored
            let currNode = frontier.pop();
            let lastNode = explored[explored.length - 1];
            
            explored.push(currNode.state.currState);
            currNode.visited = 1;

            for (let node of currNode.neighbours){
                //initialising child node
                let newNode = new Node(this.search, node[0], node[1], node[2]);
                newNode.addNeighbours(node);
                newNode.addAccessibleNeighbours(node);
                //removing nodes in case hitting the deadend
                
                if (!newNode.neighbours){
                    continue
                }
                //making the nodes which have been visited or in frontier
                for (let item of frontier){
                    if (String(item.state.currState) === String(newNode.state.currState)){
                        newNode.frontier = 1;
                        break;
                    };
                }
                for (let nodes of explored){
                    if (String(nodes) === String(newNode.state.currState)){
                        newNode.visited = 1;
                        break;
                    };
                }
                if(!newNode.visited && !newNode.frontier){
                    //returning solution if node contains goal state
                    if (String(currNode.state.currState) === String(currNode.state.goalState)){
                        explored.push(currNode.state.currState);
                        return explored;
                    }
                    //adding children nodes to the frontier if not visited and not in frontier
                    frontier.push(newNode);
                }
            }
        }
    }
}

export default DFS;
/*
let maze = new DFSMaze3dGenerator(2,3,3)
let newMaze = maze.generate();
let dfsSearch = new DFS(newMaze);
console.log(dfsSearch.findSolution());
*/