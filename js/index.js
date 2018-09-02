document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    createBoard();
    drawBoard();
    player = new Player("001");
});

////// Variables & Constants //////
var board = document.getElementById("board");

const boardWidth = 600;
const boardHeight = 600;

////// Functions //////
function createBoard(){
    //Add a goal
    var ctx = board.getContext("2d");
        
    ctx.fillStyle="#FF0000";    
    ctx.fillRect(0,0,boardWidth,50);
    ctx.stroke();

    //Add obstacles
    //TODO
}

function drawBoard(){
    //draw the board
    var ctx = board.getContext("2d");
    
    ctx.rect(0,0,boardWidth,boardHeight);
    ctx.stroke();
}

////// Classes //////

var Coordinate = function(x, y){
    this.x = x,
    this.y = y
}
