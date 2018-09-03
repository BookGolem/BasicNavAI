//The AI brain that determines moves for the player.

var Brain = function(){
    this.moves = [];
    this.currentMove = 0;

    this.generateMoves = function(){
        for(var i = 0; i < 400; i++){
            var x = randomIntFromInterval(-1,1);
            var y = randomIntFromInterval(-1,1);

            this.moves.push(new Coordinate(x, y));
        }
    }


    //Setup
    this.generateMoves();
}

function randomIntFromInterval(min,max) //From StackOverflow
{
    return Math.floor(Math.random()*(max-min+1)+min);
}