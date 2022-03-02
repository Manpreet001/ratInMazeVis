
let arr = [1,1,0,1,1,0,0,1,1];

let rat = document.querySelector(".rat");

let matrix = document.querySelectorAll(".box");

// for(let i=0; i<9; i++){
//     matrix[i].innerText = arr[i];
// }

// for(let i=0; i<9; i++){
//     console.log(matrix[i].innerText);
// }

// setTimeout(() => {
//     for(let i=0; i<9; i++){
//         let dims = matrix[i].getBoundingClientRect();
//         rat.style.transform =  `translate(${dims.x}px, ${dims.y}px)`;
//         console.log(dims);
//     }

// }, 3000);

function getDirection( x ,  y){
    if(x == 0 && y == 1) return "R";
    if(x == 0 && y == -1) return "L";
    if(x == 1 && y == 0) return "D";
    return "U";
}



let rows = [0,0,-1,1];
let cols = [-1,1,0,0];


let i=0;
let temp = [];


let visited = [[0,0,0], [0,0,0], [0,0,0]];
console.log(matrix);
// console.log(myMatrix[0][0].getBoundingClientRect())
// let values  = [[1,1,0], [1,1,0], [0,1,0]];
// for(let i=0; i<4; i++){
//    for(let j=0; j<4; j++){
//        myMatrix[i][j].innerText=values[i][j];
//    }
// }

let paths = [];
let str = [];
let matR = -1, matC = -1;
function isSafe(x,y, myMatrix){
    if(x>=0 && y>=0 && x<3 && y<3 && myMatrix[x][y]==1) return 1;
    return 0 ;
}
function  util(x,y, myMatrix) {
    myMatrix[x][y] = 0;
    for(let i=0; i<4; i++){
        let adjx = x + rows[i];
        let adjy = y + cols[i];
        if(isSafe(adjx, adjy, myMatrix)){

            let dir = getDirection(rows[i], cols[i]);
            str.push(dir);
            if(adjx == 2 && adjy==2){
                paths.push(...str);
                paths.push('0');
            }
            else  util(adjx, adjy);
            str.pop();
        }
    }
    
    myMatrix[x][y] = 1;
    return paths;
}

function moveUtil(x, y,sub){
    let cod = rat.getBoundingClientRect();
    rat.style.transform = `translate(${cod.x+x-sub.x}px, ${y+cod.y-sub.y}px)`;
}

function move(path, diff, sub){
    let len = path.length;
    let i=0;
    let add = diff;
    while(i<len){
        // switch(path[i]){
        //     case 'R' : 
        //         moveUtil(89, 0);
        //         wait();
        //         i++;
        //         break;
        //     case 'D' : 
        //         moveUtil(0, 89);
        //         wait();
        //         i++;
        //         break;
        // }
        // i++;

        (function(i){
               switch(path[i]){
            case 'R' : 
                setTimeout(() => {
                moveUtil(add, 0, sub);
                    
                }, 2000*(i+2));
                break;
            case 'L' : 
                setTimeout(() => {
                moveUtil(-add, 0, sub);
                    
                }, 2000*(i+2));
                break;
            case 'D' : 
                setTimeout(() => {
                moveUtil(0, add,sub);
                    
                }, 2000*(i+2));
                break;
            case 'U' : 
                setTimeout(() => {
                moveUtil(0, -add, sub);
                    
                }, 2000*(i+2));
                break;
            default : 
                setTimeout(() => {
                moveUtil(0, -add, sub);
                rat.style.transform = `translate(39px, 37px)`;
                console.log("Helo")
                    
                }, 2000*(i+2));
                break;
            }
        })(i)
        i++;
    }
}




// setTimeout(() => {
//     paths = util(0,0);
//     console.log(paths);
//     // move(paths);
// }, 2000);


let grid_btn = document.getElementsByClassName("grid_btn")[0];
let input = document.getElementsByTagName("input");
let container = document.getElementsByClassName("container")[0];
let input_div = document.getElementsByClassName("input_area")[0];
let input_btn = document.getElementsByClassName("input_btn")[0];
grid_btn.addEventListener("click", ()=>{
    let rows = parseInt(input[0].value);
    let cols = parseInt(input[1].value);
    matR = rows;
    matC = cols;
    for(let i=0; i<rows*cols; i++){
        let elm = document.createElement("div");
        elm.classList += "box";
        container.appendChild(elm);
    }
    let temp = rows > cols ? rows : cols;
    temp = parseInt(30/temp);
    container.style.gridTemplateRows = `repeat(${rows},${temp}vw)`;
    container.style.gridTemplateColumns = `repeat(${cols}, ${temp}vw)`;
    input_div.style.display = 'block';
    getInput(rows, cols);
})

function getInput(rows, cols){
    let matrix = document.querySelectorAll(".box");

    input_btn.addEventListener("click", ()=>{
        let values = input[2].value.split(",");
        input_div.style.display = "none";
        Array.from(matrix).forEach((box, i)=>{
            box.textContent = values[i];
        })
        container.style.display=  "grid";
        let sub = matrix[0].getBoundingClientRect();
        // let myMatrix = storeValues(values, rows, cols);
        myMatrix = [[1,1,0], [1,1,0], [1,1,1]];
        console.log(myMatrix);

        start(sub, myMatrix);
    })
    
}

function start(sub, myMatrix){
    rat.style.display = "block";
    paths = util(0,0, myMatrix);
    // move(paths,93,sub);
}

function storeValues(values, rows, cols){
    myMatrix = [];
    let it=0;
    console.log(values);
    for(let i=0; i<rows; i++){
        let temp = [];
        for(let j=0; j<cols;j++){
            temp.push(values[it++]);
        }
        console.log(temp);
        myMatrix.push(temp);
    }
    return myMatrix;
}