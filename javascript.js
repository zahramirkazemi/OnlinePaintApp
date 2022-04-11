const brush = document.getElementById('brush');
const eraser = document.getElementById('erase');
const reset = document.getElementById('reset');
const save = document.getElementById('saveLink');
const brushColor = document.getElementById('color');
const brushSize = document.getElementById('size');
const radioBkNone = document.getElementById('Backnone');
const radioBkColor = document.getElementById('hasBack');
const backColor = document.getElementById('bkcolor');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 27;
canvas.height = window.innerHeight - 150;
var mouse = false;
var positionX, positionY;

canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);
canvas.addEventListener("touchstart", brushDown, false);
canvas.addEventListener("touchmove", brushMove, false);
canvas.addEventListener("touchend", brushUp, false);
save.addEventListener('click',saveClick);
reset.addEventListener('click',resetClick);
brush.addEventListener('click',brushClick);
eraser.addEventListener('click',eraserClick);
radioBkColor.addEventListener('click', hasBackgroundColor);
radioBkNone.addEventListener('click', hasBackgroundColor);
backColor.addEventListener('change',hasBackgroundColor)

brushClick();

function brushClick() {
    brush.style.border = "2px solid #ee6c4d";
    eraser.style.border = "none";
    mode = "pen";
}

function eraserClick() {    
    eraser.style.border = "2px solid #ee6c4d";
    brush.style.border = "none";
    mode = "eraser"
}

function brushDown(e) {
    mouse = true;
    var coordinates = getCoordinates(canvas,e);
    canvas.style.cursor = "pointer";
    positionX = coordinates.x;
    positionY = coordinates.y;    
    ctx.strokeStyle = brushColor.value;
    ctx.lineWidth = brushSize.value;
    ctx.beginPath();
    ctx.moveTo(positionX,positionY);
    brushDraw(canvas,positionX,positionY)
}

function brushMove(e) {
    var coordinates = getCoordinates(canvas,e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    brushDraw(canvas, positionX, positionY);
}

function getCoordinates(canvas , e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

function brushDraw(canvas, positionX, positionY) {
    if(mouse){    
        if(mode=="pen"){            
            ctx.globalCompositeOperation="source-over";
            ctx.strokeStyle = brushColor.value;
        }
        else{
            if(document.querySelector('input[name="hasBackground"]:checked').value === 'true'){
                ctx.globalCompositeOperation="source-over";
                ctx.strokeStyle = backColor.value;
            }
            else{                
                ctx.globalCompositeOperation="destination-out";
            }
        }
        
        ctx.lineWidth = brushSize.value;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineTo(positionX,positionY);
        ctx.stroke();
        canvas.style.cursor = "pointer";
    }
}

function brushUp() {
    mouse = false;    
    canvas.style.cursor = "default";
}

function hasBackgroundColor() {
    var hasBackColor = document.querySelector('input[name="hasBackground"]:checked');
    if(hasBackColor.value == 'true'){
        backColor.disabled = false;
        ctx.fillStyle = backColor.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else {
        backColor.disabled = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
} 

function saveClick() {
    save.href = canvas.toDataURL();
    save.download = "paintScreen.png"
}

function resetClick() {
    if(document.querySelector('input[name="hasBackground"]:checked').value === 'true'){
        ctx.fillStyle = backColor.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }   
}


