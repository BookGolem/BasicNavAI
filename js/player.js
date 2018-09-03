//The player's class and abilities

var Player = function(playerID){
    //Player abilities

    this.move = function(vector){
        //Accepts a Coordinate object.
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

            checkIsDead(this);
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
    this.brain = new Brain();
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
    //Returns the player's final score. Will have to change based on circumstances.
    //Score the player based on proximity to y=50.

    var score = 0;
    if(position.y<=50){
        score = 1000;
    }else{
        score = 1000 - position.y;
    }

    return score;
}
