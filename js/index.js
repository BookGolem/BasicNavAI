document.addEventListener("DOMContentLoaded", function(event) {
    //do work
    createBoard();
    drawBoard();

    //Create players
    //var player = new Player("001", brainLength);

    for(var i = 0; i<numberOfPlayers; i++){
        players.push(new Player(i, brainLength));
    }
});

////// Variables & Constants //////
var board = document.getElementById("board");
var players = [];

const boardWidth = 600;
const boardHeight = 600;

const brainLength = 400;
const numberOfPlayers = 100;


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

function runGame(moveNumber){
    //Runs all of the AIs.
    players.forEach(function(player){
        player.move(player.brain.moves[player.brain.currentMove]);
        player.brain.currentMove++;
    })

    moveNumber++;
    if(moveNumber <= brainLength){
        setTimeout(function(){runGame(moveNumber)}, 33);
    }else{
        console.log("Game Ended");
    }
}

////// Game Logic ///////
function checkIsDead(player){
    //Checks whether the player is dead
    if(player.dead){
        return true;
    }else if(player.position.x > 600 || player.position.x < 0 || player.position.y > 600 || player.position.y < 0){
        player.dead = true;
        return true;
    }
}

////// Classes //////
var Coordinate = function(x, y){
    this.x = x,
    this.y = y
}
