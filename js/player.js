//The player's class and abilities

var Player = function(playerID, numMoves, isProgenitor){
    //Player abilities

    this.move = function(){
        //Accepts a Coordinate object.
        var vector = this.brain.moves[this.brain.currentMove];

        if(!this.dead && !this.atGoal){
            this.accelleration.x += vector.x;
            if(this.accelleration.x>5){this.accelleration.x=5}
            if(this.accelleration.x<-5){this.accelleration.x=-5}

            this.accelleration.y += vector.y;
            if(this.accelleration.y>5){this.accelleration.y=5}
            if(this.accelleration.y<-5){this.accelleration.y=-5}
            
            this.position.x += this.accelleration.x;
            this.position.y += this.accelleration.y;

            //Set player to Dead if it's out of bounds or out of moves, or AtGoal if it's at the goal.
            if(this.position.x > boardWidth || this.position.x < 0 || this.position.y > boardHeight || this.position.y < 0){
                this.dead = true;
            }else if((this.position.x > goalLocation.x-2 && this.position.x < goalLocation.x+2) && (this.position.y > goalLocation.y-2 && this.position.y < goalLocation.y+2)){ 
                this.atGoal = true;
            }else if((this.position.x > 250 && this.position.x < 350) && (this.position.y > 250 && this.position.y < 270)){ 
                this.dead = true;
            }else if(this.brain.currentMove < brainLength-1){
                this.brain.currentMove++;
            }else{
                this.dead = true;
            }

        }
    }

    this.extractBrain = function(){
        return this.brain;
    }

    //Initiate player stats
    this.score = 0;
    this.accelleration = new Coordinate(0, 0);
    this.position = new Coordinate(300,550);
    this.id = playerID;
    this.brain = new Brain(numMoves);
    this.dead = false;
    this.atGoal = false;
    this.isBest = false;
    
}

function calculateScore(player){
    //Accepts a Coordinate. Returns the player's final score.
    //Will have to change based on circumstances.
    //Score the player based on proximity to goalLocation (defined in Index).
    var score = 0;

    if(player.atGoal){
        score = 10000/(player.brain.currentMove*player.brain.currentMove);
    }else{
        var position = player.position;
        
        var b = position.x - goalLocation.x;
        var c = position.y - goalLocation.y;

        var score = 1/((b*b) + (c*c)); //Pythagoras. Score remains squared to encourage getting closer to the goal. Then inverted.
    }
    return score;
}
