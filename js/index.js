document.addEventListener("DOMContentLoaded", function(event) {
    //Set Variables
    goalLocation = new Coordinate(301, 50);

    //do work
    createBoard();
    drawBoard();

    //Create players
    for(var i = 0; i<numberOfPlayers; i++){
        players.push(new Player(i, brainLength, true));
    }
});

////// Variables & Constants //////
var board = document.getElementById("board");
var players = [];

const boardWidth = 601;
const boardHeight = 601;

const goalX = 301;
const goalY = 50;
var goalLocation = null;

const brainLength = 400;
const numberOfPlayers = 100;


////// Functions //////
function createBoard(){
    //Add a goal
    var ctx = board.getContext("2d");
        
    ctx.fillStyle="#FF0000";    
    ctx.fillRect(goalLocation.x-2,goalLocation.y-2,5,5);   //Target point is (301, 50)
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

function runGame(moveNumber){
    //Runs all of the AIs.
    
    if(moveNumber <= brainLength){
        players.forEach(function(player){
            player.move();
        });

        moveNumber++;

        setTimeout(function(){runGame(moveNumber)}, 25);
    }else{
        console.log("Game Ended");
        players.forEach(function(player){
            player.score = calculateScore(player);
        });
    }
}

////// Game Logic ///////
function checkIsDead(player){
    //Checks whether the player is dead
    if(player.dead){
        return true;
    }else if(player.brain.currentMove > player.brain.moves.length-1){
        player.dead = true;
        return true;
    }else{
        return false;
    }
}

////// Classes //////
var Coordinate = function(x, y){
    this.x = x,
    this.y = y
}
