//The player's class and abilities

var Player = function(playerID, numMoves){
    //Player abilities

    this.move = function(vector){
        //Accepts a Coordinate object.
        checkIsDead(this);
        if(!this.dead){
            this.accelleration.x += vector.x;
            if(this.accelleration.x>5){this.accelleration.x=5}
            if(this.accelleration.x<-5){this.accelleration.x=-5}

            this.accelleration.y += vector.y;
            if(this.accelleration.y>5){this.accelleration.y=5}
            if(this.accelleration.y<-5){this.accelleration.y=-5}
            
            this.position.x += this.accelleration.x;
            this.position.y += this.accelleration.y;
            this.draw();

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

function calculateScore(position){
    //Accepts a Coordinate. Returns the player's final score.
    //Will have to change based on circumstances.
    //Score the player based on proximity to Coordinate (301, 50).
    var goalLocation = new Coordinate(301, 50);
    var score = 0;

    var b = position.x - goalLocation.x;
    var c = position.y - goalLocation.y;

    var score = (b*b) + (c*c); //Pythagoras. Score remains squared to encourage getting closer to the goal. 

    return score;
}
