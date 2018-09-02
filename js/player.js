//The player's class and abilities

var Player = function(){
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
    this.position = new Coordinate(300,550);
    
    //Initiate player
    this.canvas = createCanvas();
    this.draw();
}

function createCanvas(){
    var canv = document.createElement('canvas');
    canv.id = 'player';
    canv.width = "600";
    canv.height = "600";
    canv.class="canvas"
    canv.style="z-index: 1";
    
    document.getElementById('canvases').appendChild(canv); // adds the canvas to #someBox

    return canv;
}