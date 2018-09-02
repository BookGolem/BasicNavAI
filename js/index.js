document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    createBoard();
    drawBoard();
    player = new Player('img/player.png');

    drawActor(player);
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

function drawActor(actor){
    var ctx = actors.getContext("2d");


    //   var img = new Image();
    //   img.src = actor.sprite;
        
    //   img.onload = function(){
    //       var ctx = actors.getContext("2d");
    //       actor;
    //       ctx.drawImage(img, (actor.position.x)-(img.width/2), (actor.position.y)-(img.height/2));
    //   }.bind(actor);
    ctx.fillRect(actor.position.x,actor.position.y,3,3);

}

function drawBoard(){
    //draw the board
    var ctx = board.getContext("2d");
    
    ctx.rect(0,0,boardWidth,boardHeight);
    ctx.stroke();
}



function clearActor(actor){
    var ctx = actors.getContext("2d");
    ctx.clearRect(actor.position.x*squareSide, actor.position.y*squareSide, squareSide, squareSide);
}

////// Listeners //////





////// Classes //////

var Coordinate = function(x, y){
    this.x = x,
    this.y = y
}

var Player = function(sprite){
    this.sprite = sprite;
    this.score = 0,
    this.position = new Coordinate(100,200)
}