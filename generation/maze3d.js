/**
 * This class represents the maze
 */
class Maze3d{
    constructor(maze,s,g, playerLocation = s){
        this.maze = maze
        this.s = s;
        this.g = g;
        this.playerLocation = playerLocation;
    }
    /**
     * 
     * @returns string representation of the maze
     */
    toString(){
        /*
        cell values = [left, right, forward, backward, up, down]
        cell[0] = true => |
        cell[1] = true => |
        cell[2] = true => -
        cell[3] = true => -
        cell[4] = true => up arrow
        cell[5] = true => down arrow
        if cell[4] && cell[5] = true => updown arrow
        */ 
        let printing = '';
        const up = '\u{2191}';
        const down = '\u{2193}';
        const upDown = '\u{2195}';
        for (let level = 0;  level < this.maze.length; level ++){
            printing += 'Level ' + level + '\n ';
            //printing top border
            for (let side = 0; side < (this.maze[0][0].length)* 2 - 1; side ++){
                printing += '_';
            }
            printing +='\n';
            //printing maze
            for (let row = 0; row < this.maze[0].length; row ++){
                for (let col = 0; col < this.maze[0][0].length; col ++){
                    let cell = this.maze[level][row][col];
                    //checking for left border
                    if (cell[0]){
                        printing += '|';
                    } else {printing += ' '};
                    //checking for arrows
                    if (cell[4] && cell[5]){
                        printing += upDown;
                    } else if (cell[4]){
                        printing += up;
                    } else if (cell[5]){
                        printing += down;
                    } else {
                        printing += ' '
                    }   
                    //checking for exit, start and current location             
                    if (this.s[0] === level && this.s[1] === row && this.s[2] === col){
                        printing = printing.slice(0,printing.length - 1) + 'S';
                    }
                    if (this.g[0] === level && this.g[1] === row && this.g[2] === col){
                        printing = printing.slice(0,printing.length - 1) + 'G';
                    }
                    if (this.playerLocation[0] === level && this.playerLocation[1] === row && this.playerLocation[2] === col){
                        printing = printing.slice(0,printing.length - 1) + 'X';
                    }
                }
                //adding last right border of the row
                printing += '|\n';
                //adding bottom border
                if (row < this.maze[level].length - 1){
                    printing += '|';
                for (let col = 0; col < this.maze[0][0].length; col ++){
                    let cell = this.maze[level][row][col];
                    if (cell[2]){
                        printing += '-';
                    } else {printing += ' '};
                    printing += '+'
                }
                printing = printing.slice(0,printing.length - 1) + '|\n';
            }
            }
            //printing last border
            printing += ' '; 
            for (let side = 0; side < this.maze[0][0].length * 2-1; side ++){
                printing += '\u{2015}';
            }
            printing +='\n ';
        }
        return printing;
    } 
}
export default Maze3d;

/*
TESTING 

let r1cell1 = [true, true, false, true, true, false];
let r1cell2 = [true, true, false, true, false, false];
let r1cell3 = [true, false, true, true, false, false];
let r1cell4 = [false, false, true, true, true, false];
let r1cell5 = [false, true, true, true, false, false];

let r2cell1 = [true, true, true, false, false, false];
let r2cell2 = [true, true, true, false, false, false];
let r2cell3 = [true, false, true, true, false, false];
let r2cell4 = [false, false, true, true, true, false];
let r2cell5 = [false, true, true, true, false, false];

let r3cell1 = [true, false, false, true, true, false];
let r3cell2 = [false, false, true, true, true, false];
let r3cell3 = [false, false, true, false, true, false];
let r3cell4 = [false, false, true, false, true, false];
let r3cell5 = [false, true, false, true, true, false];

let r4cell1 = [true, true, true, false, false, false];
let r4cell2 = [true, false, false, true, true, false];
let r4cell3 = [false, true, false, true, true, false];
let r4cell4 = [true, true, false, true, false, false];
let r4cell5 = [true, true, true, false, false, false];

let r5cell1 = [true, true, true, true, false, false];
let r5cell2 = [true, true, true, false, false, false];
let r5cell3 = [true, false, true, false, true, false];
let r5cell4 = [false, false, true, false, true, false];
let r5cell5 = [false, true, true, true, true, false];

let r6cell1 = [true, true, true, true, false, true];
let r6cell2 = [true, true, true, true, false, true];
let r6cell3 = [true, true, true, true, true, true];
let r6cell4 = [true, true, true, true, false, false];
let r6cell5 = [true, true, true, true, false, false];

let maze = [[[r1cell1,r1cell2,r1cell3,r1cell4,r1cell5],
[r2cell1,r2cell2,r2cell3,r2cell4,r2cell5],
[r3cell1,r3cell2,r3cell3,r3cell4,r3cell5],
[r4cell1,r4cell2,r4cell3,r4cell4,r4cell5],
[r5cell1,r5cell2,r5cell3,r5cell4,r5cell5]],
[[r1cell1,r1cell2,r1cell3,r1cell4,r1cell5],
[r2cell1,r2cell2,r2cell3,r2cell4,r2cell5],
[r3cell1,r3cell2,r3cell3,r3cell4,r3cell5],
[r4cell1,r4cell2,r4cell3,r4cell4,r5cell5],
[r6cell1,r6cell2,r6cell3,r6cell4,r6cell5]]]

s = [1,2,4];
g = [0,4,2];
you = [1,1,1];


const drawMaze = new Maze3d(maze, s, g, you);
console.log(drawMaze.toString());
*/




