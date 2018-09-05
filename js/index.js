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

    //Set up listeners on page
    document.getElementById("runButton").addEventListener("click", function(){
        runGame(0);
        document.getElementById("runButton").disabled = true;
    });
    document.getElementById("mutateButton").addEventListener("click", function(){
        players = selectNextGeneration(players);
        generation++;
        document.getElementById("gen").innerHTML = generation;
        document.getElementById("mutateButton").disabled = true;
        document.getElementById("runButton").disabled = false;
    });
    document.getElementById("mutateButton").disabled = true;
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

var generation = 0;
var bestMoves = brainLength;
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
    
    if(moveNumber <= bestMoves){
        players.forEach(function(player){
            player.move();
        });

        moveNumber++;
        if(moveNumber > bestMoves){
            players.forEach(function(player){
                if(!player.atGoal){
                    player.dead = true;
                }
            });
        }

        setTimeout(function(){runGame(moveNumber)}, 25);
    }else{
        console.log("Game Ended");
        players.forEach(function(player){
            player.score = calculateScore(player);
        });
        document.getElementById("mutateButton").disabled = false;
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
