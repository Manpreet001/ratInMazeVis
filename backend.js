
let rows = [0,0,-1,1];
let cols = [-1,1,0,0];

let dims = {
    x:-1,
    y:-1
}
let grid_gen = document.getElementsByClassName("grid")[0];
let rat = document.querySelector(".rat");
let grid_btn = document.getElementsByClassName("grid_btn")[0];
let input = document.getElementsByTagName("input");
let container = document.getElementsByClassName("container")[0];
let input_div = document.getElementsByClassName("input_area")[0];
let input_btn = document.getElementsByClassName("input_btn")[0];
let input_heading = document.getElementById("input_heading");
let output_div = document.getElementsByClassName("output_div")[0];
let reloadBtn = document.getElementsByClassName("reload")[0];
let output_span = document.getElementById("paths");

let changeMat = [];
let myMatrix = [];
let paths = [];
let str = [];
let add = -1;
let total_paths = 0;

grid_btn.addEventListener("click", ()=>{
    grid_gen.style.display = "none";
    let rows = parseInt(input[0].value);
    dims.x = rows;
    dims.y = rows;
    for(let i=0; i<rows*rows; i++){
        let elm = document.createElement("div");
        elm.classList += "box";
        container.appendChild(elm);
    }
    let temp = rows;
    temp = 25/temp;
    let ratDim = temp;
    console.log(ratDim);
    add = parseInt(temp);
    container.style.gridTemplateRows = `repeat(${rows},${parseInt(temp)}vw)`;
    container.style.gridTemplateColumns = `repeat(${rows}, ${parseInt(temp)}vw)`;
    input_div.style.display = 'flex';
    input_heading.innerText = `Enter ${rows*rows} values 0 : for blocked cell, 1 : for valid cell (comma separated without spaces).`
    getInput(temp/2, ratDim);
});

function getInput(temp, ratDim){
    let matrix = document.querySelectorAll(".box");

    input_btn.addEventListener("click", ()=>{
        let values = input[1].value.split(",");
        input_div.style.display = "none";
        Array.from(matrix).forEach((box, i)=>{
            let sp = document.createElement("span")
            sp.classList = "box_text";
            sp.style.fontSize = `${temp/2}vw`;
            sp.innerText = values[i];
            box.appendChild(sp);
            // box.innerHTML = sp;
            // box.innerText = values[i];
        })
        container.style.display=  "grid";
        output_div.style.display = "flex";
        let sub = matrix[0].getBoundingClientRect();
        myMatrix = storeValues(values, matrix);
        console.log(changeMat);
        let t1 = matrix[1].getBoundingClientRect();
        let t2 = matrix[0].getBoundingClientRect();
        // let t = rat.getBoundingClientRect();
        // let width = parseInt(t.right-t.left);
        // let stpoint = parseInt((t1.x + t2.x)/2 - t2.left - width);
        let stpoint = ratDim-temp;
        console.log(temp);
        console.log(stpoint);
        let diff = t1.x-t2.x;
        console.log(diff);
        
        start(sub, myMatrix, diff, Math.round(stpoint), ratDim);
    })
    
}

function storeValues(values, matrix){
    let it=0;
    let myMatrix = [];

    for(let i=0; i<dims.x; i++){
        let temp = [];
        let temp2 = [];
        for(let j=0; j<dims.y; j++){
                temp.push(values[it]);
                temp2.push(matrix[it++]);
            }
            myMatrix.push(temp);
            changeMat.push(temp2);
        }

    return myMatrix;
}

function isSafe(x,y, myMatrix, row, col){
    if(x>=0 && y>=0 && x<row && y<col && (myMatrix[x][y]==1 || myMatrix[x][y] == '1')) return 1;

    return 0 ;
}
function  util(x,y, myMatrix, dims) {
    myMatrix[x][y] = 0;
    for(let i=0; i<4; i++){
        let adjx = x + rows[i];
        let adjy = y + cols[i];
        if(isSafe(adjx, adjy, myMatrix, dims.x, dims.y)){

            let dir = getDirection(rows[i], cols[i]);
            str.push(dir);
            if(adjx == dims.x-1 && adjy==dims.y-1){
                paths.push(...str);
                paths.push('0');
            }
            else  util(adjx, adjy, myMatrix, dims);
            str.pop();
        }
    }
    
    myMatrix[x][y] = 1;
    return paths;
}

function getDirection( x ,  y){
    if(x == 0 && y == 1) return "R";
    if(x == 0 && y == -1) return "L";
    if(x == 1 && y == 0) return "D";
    return "U";
}

function moveUtil(x, y,sub, prevX, prevY){
    let cod = rat.getBoundingClientRect();
    // rat.style.transform = `translate(${cod.x+x-sub.x}px, ${y+cod.y-sub.y}px)`;
    // rat.style.transform = `translate(${cod.x-sub.x+x}vw, ${cod.y+y-sub.y}vw)`;
    rat.style.transform = `translate(${prevX + x}vw, ${prevY+y}vw)`;
}

function move(path, diff, sub, prevX, prevY){
    let len = path.length;
    let i=0;
    // let add = 5.92;
    while(i<len){

        (function(i){
               switch(path[i]){
            case 'R' : 
                setTimeout(() => {
                moveUtil(add, 0, sub, prevX, prevY);
                    prevX += add;
                }, 2000*(i+2));
                break;
            case 'L' : 
                setTimeout(() => {
                moveUtil(-add, 0, sub, prevX, prevY);
                    prevX -=add;
                }, 2000*(i+2));
                break;
            case 'D' : 
                setTimeout(() => {
                moveUtil(0, add,sub, prevX, prevY);
                    prevY +=add;
                }, 2000*(i+2));
                break;
            case 'U' : 
                setTimeout(() => {
                moveUtil(0, -add, sub, prevX, prevY);
                    prevY -= add;
                }, 2000*(i+2));
                break;
            default : 
                setTimeout(() => {
                moveUtil(0, -add, sub, prevX, prevY);
                prevX = 0;
                prevY = 0;
                // rat.style.transform = `translate(39px, 37px)`;
                rat.style.transform = `translate(0vw, 0vw)`;
                console.log("Helo")
                total_paths += 1;
                output_span.innerText = `${total_paths}`
                }, 2000*(i+2));
                break;
            }
        })(i)
        i++;
    }
}

function start(sub, myMatrix, diff, temp, ratDim){
    rat.style.display = "block";
    console.log(ratDim);
    add = parseInt(ratDim);
    rat.style.width = `${ratDim}vw`;
    rat.style.height = `auto`;
    rat.style.transform = `translate(0vw, 0vw)`;
    prevX = 0;
    prevY = 0;
    // rat.style.transform = `translate(32px, 32px)`;
    paths = util(0,0, myMatrix,dims);
    if(paths.length ==0){
        output_span.innerText = '0';
    }
    else{
        move(paths,diff,sub, prevX, prevY);

    }
    console.log(paths)
}

reloadBtn.addEventListener("click", ()=>{
    window.location.reload();
})