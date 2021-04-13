const canvas = document.getElementById("jsCanvas");                 
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor"); 
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");                  

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height =CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;     //처음 색칠하는 색깔이 검정색이 되도록 설정
ctx.lineWidth = 2.5; 
ctx.fillStyle = INITIAL_COLOR; 


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);       //path 이전 위치부터 현재 위치까지 선을 그리는 function lineTo function만 있다면 선이 그려지지 않는다.                     
        ctx.stroke();           //획을 그려는 function
    }
}

function handleColorClick(event){
    const color =  event.target.style.backgroundColor;
    ctx.strokeStyle = color;        //기존에 있던 기본 색상에 override해서 배열에 담긴 색깔에 따라 위 코드에 있는 target 속성에 의해 색이 바뀜
    ctx.fillStyle = color;
} 

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size; 
}

function handleModeClick(){
    if (filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    console.log(event);
}

function hadleSaveClick(){
    const image = canvas.toDataURL  ("image/png ");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);    // 클릭 했을 때
    canvas.addEventListener("mouseup", stopPainting);       //로직을 줄일수 있음 (?)
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); 

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", hadleSaveClick);
}