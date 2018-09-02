document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    createBoard();
    drawBoard();
    player = new Player();
});

////// Variables & Constants //////
var board = document.getElementById("board");
var actors = document.getElementById("actors");

const boardWidth = 600;
const boardHeight = 600;

var player = null;

////// Functions //////
function createBoard(){
    //adds obstacles to the board
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
