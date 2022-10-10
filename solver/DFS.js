import Searchable from "./searchable.js";
import Node from "./node.js";
import DFSMaze3dGenerator from "../generation/DFSMaze3dGenerator.js";
class DFS extends Searchable{
    constructor(search){
        super(search);
    }
    findSolution(){
        let node = new Node(this.search, 0, 0, 0);
        node.addNeighbours([0,0,0]);
        let frontier = [];
        frontier.push(node);
        node.frontier = 1;

        let explored = [];
       // while (true){
        for (let i = 0; i < 5; i++){
            if (!frontier.length){
                return false;
            }
            let currNode = frontier.pop()
            console.log('currnode:', currNode.state.currState);
            currNode.neighbours = [];
            currNode.addNeighbours(currNode.state.currState);
            console.log( explored);
            console.log(explored.includes(currNode.state.currState))
            if (currNode.visited === 0){
                explored.push(currNode.state.currState);
                currNode.visited = 1;
            }
            if (currNode.neighbours.includes(currNode.state.goalState)){
                explored.push(currNode.state.goalState);
                return explored;
            }
            //console.log(currNode.neighbours)
            for (let node of currNode.neighbours){
                console.log('node:'+node)
                console.log(frontier.includes(node));
                console.log(explored.includes(node))
                if(!frontier.includes(node) && !explored.includes(node)){
                    let newNode = new Node(this.search, node[0], node[1], node[2]);
                    newNode.addNeighbours(currNode.state.currState);
                    frontier.push(newNode);
                    newNode.visited = 1;
                    newNode.fronier = 1;
                }
            }
        }
        return false;
    }
}

export default DFS;
let maze = new DFSMaze3dGenerator(2,3,3)
let newMaze = maze.generate();
let dfsSearch = new DFS(newMaze);
console.log(dfsSearch.findSolution());