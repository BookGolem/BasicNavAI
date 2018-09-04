//The player's class and abilities

var Player = function(playerID, numMoves){
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
            this.draw();

            //Set player to Dead if it's out of bounds or out of moves, or AtGoal if it's at the goal.
            if(this.position.x > boardWidth || this.position.x < 0 || this.position.y > boardHeight || this.position.y < 0){
                this.dead = true;
            }else if(this.position.x == goalLocation.x && this.position.y == goalLocation.y){
                this.atGoal = true;
            }else if(this.brain.currentMove < brainLength-1){
                this.brain.currentMove++;
            }else{
                this.dead = true;
            }

        }
    }

    this.draw = function(){
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, boardWidth, boardHeight);
        ctx.fillRect(this.position.x-1,this.position.y-1,3,3);  //The player is a 3x3 pixel square.
    };

    //Initiate player stats
    this.score = 0;
    this.accelleration = new Coordinate(0, 0);
    this.position = new Coordinate(300,550);
    this.id = playerID;
    this.brain = new Brain(numMoves);
    this.dead = false;
    this.atGoal = false;
    
    //Initiate player
    this.canvas = createCanvas(this.id);
    this.draw();
}

function createCanvas(id){
    var canv = document.createElement('canvas');
    canv.id = id;
    canv.width = "600";
    canv.height = "600";
    canv.class="canvas";
    canv.style="z-index: 1";
    
    document.getElementById('canvases').appendChild(canv); // adds the canvas to #someBox

    return canv;
}

function calculateScore(player){
    //Accepts a Coordinate. Returns the player's final score.
    //Will have to change based on circumstances.
    //Score the player based on proximity to goalLocation (defined in Index).
    var score = 0;

    if(player.atGoal){
        score = (1/16) + (4000/player.brain.currentMove*player.brain.currentMove);
    }else{
        var position = player.position;
        
        var b = position.x - goalLocation.x;
        var c = position.y - goalLocation.y;

        var score = 1/((b*b) + (c*c)); //Pythagoras. Score remains squared to encourage getting closer to the goal. Then inverted.
    }
    return score;
}
