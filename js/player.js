//The player's class and abilities

var Player = function(playerID){
    //Player abilities
    this.moveUp = function(){
        this.position.y-=5;
        this.draw();
    };

    this.moveDown = function(){
        this.position.y+=5;
        this.draw();
    };

    this.moveRight = function(){
        this.position.x+=5;
        this.draw();
    };

    this.moveLeft = function(){
        this.position.x-=5;
        this.draw();
    };

    this.draw = function(){
        var ctx = this.canvas.getContext("2d");
        ctx.clearRect(0, 0, boardWidth, boardHeight);
        ctx.fillRect(this.position.x-1,this.position.y-1,3,3);       
    };

    //Initiate player stats
    this.score = 0;
    this.remainingMoves = 100;
    this.position = new Coordinate(300,550);
    this.id = playerID;
    
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