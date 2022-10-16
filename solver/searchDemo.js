/**
 * This class compares different solver algorythms
 */

import BFS from "./BFS.js";
import DFS from "./DFS.js";
import DFSMaze3dGenerator from "../generation/DFSMaze3dGenerator.js";
import Searchable from "./searchable.js";


class searchDemo{
    constructor(){
    }
    /**
     * 
     * @param {Searchable} algo 
     * @returns 
     */
    measureAlgoTime(algo){
        let start = new Date().getTime();
        algo.findSolution();
        let end = new Date().getTime();
        const runTime = end- start;
        return `Runtime: ${runTime} milliseconds`;
    }
    /**
     * returns runtime of search algorithms and number of steps taken
     */
    run(){
        let newMaze = new DFSMaze3dGenerator(10,10,10).generate()
        let dfsSearch = new DFS(newMaze);
        let dfsSteps = dfsSearch.findSolution().length
        let dfsTime = this.measureAlgoTime(dfsSearch);
        let bfsSearch = new BFS(newMaze);
        let bfsTime = this.measureAlgoTime(bfsSearch);
        let bfsSteps = bfsSearch.findSolution().length
        console.log('DFS:', dfsTime);
        console.log('DFS steps:', dfsSteps);
        console.log('BFS:', bfsTime);
        console.log('BFS steps:', bfsSteps);
    }
}

let search = new searchDemo();
search.run()

export default searchDemo;