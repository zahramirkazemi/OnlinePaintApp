var canvas = document.getElementById('canvas');
var brush = document.getElementById('brush');
var eraser = document.getElementById('erase');
var reset = document.getElementById('reset');
var save = document.getElementById('saveLink');
var brushColor = document.getElementById('color');
var brushSize = document.getElementById('size');
var mouse = false;
var positionX, positionY;
brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";
canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 100;

var ctx = canvas.getContext("2d");
ctx.lineJoin = "round";
ctx.lineCap = "round";

function brushClick(){
    ctx.strokeStyle = brushColor.value;
    ctx.lineWidth = brushSize.value;
    brush.style.border = "2px solid red";
    eraser.style.border = "none";
    canvas.addEventListener("mousedown", brushDown, false);
    canvas.addEventListener("mousemove", brushMove, false);
    canvas.addEventListener("mouseup", brushUp, false);
}

function eraserClick(){
    
    ctx.strokeStyle = "white";
    ctx.lineWidth = brushSize.value;
    eraser.style.border = "2px solid red";
    brush.style.border = "none";
    canvas.addEventListener("mousedown", brushDown, false);
    canvas.addEventListener("mousemove", brushMove, false);
    canvas.addEventListener("mouseup", brushUp, false);
}

function saveClick(){
    var data = canvas.toDataURL();
    save.href = data;
    save.download = "paintScreen.png"
}

function resetClick(){
    window.location.reload();
}

function colorChange(){
    ctx.strokeStyle = brushColor.value;
}

function sizeChange(){    
    ctx.lineWidth = brushSize.value;
}

function getCoordinates(canvas , e){
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function brushDraw(canvas, positionX, positionY){
    if(mouse){        
        ctx.lineTo(positionX,positionY);
        ctx.stroke();
        canvas.style.cursor = "pointer";
    }
}

function brushDown(e){
    mouse = true;
    var coordinates =  getCoordinates(canvas,e);
    canvas.style.cursor = "pointer";
    positionX = coordinates.x;
    positionY = coordinates.y;
    ctx.beginPath();
    ctx.moveTo(positionX,positionY);
    ctx.lineTo(positionX,positionY);
    ctx.stroke();
}
function brushMove(e){
    var coordinates = getCoordinates(canvas,e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    brushDraw(canvas, positionX, positionY);
}
function brushUp(){
    mouse = false;    
    canvas.style.cursor = "default";
}

save.addEventListener('click',saveClick);
reset.addEventListener('click',resetClick);
brush.addEventListener('click',brushClick);
eraser.addEventListener('click',eraserClick);
brushColor.addEventListener('change', colorChange);
brushSize.addEventListener('change', sizeChange);

