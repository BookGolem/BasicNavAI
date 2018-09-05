//Manages things to do with population and evolution.

function findBestPlayer(playerSet){
    var bestPlayerIndex = 0; //Default to index 0
    var topScore = 0;
    playerSet.forEach(function(player){
        if(player.score > topScore){
            bestPlayerIndex = player.id;
            topScore = player.score;
        }
    });

    playerSet[bestPlayerIndex].isBest = true;
    if(playerSet[bestPlayerIndex].atGoal){
        document.getElementById("bestMoves").innerHTML = playerSet[bestPlayerIndex].brain.currentMove;
    }
    return(playerSet[bestPlayerIndex]);
}

function selectNextGeneration(currentGeneration){
    var newGeneration = [];

    //clone best player's brain
    bestPlayer = new Player(0, 0, false)
    bestPlayer.brain = findBestPlayer(currentGeneration).extractBrain();
    bestPlayer.brain.currentMove = 0;

    newGeneration.push(bestPlayer);  //Add the best player of the previous generation.

    for(var i = 1; i < numberOfPlayers; i++){
        var selectedBrain = selectOneParent(currentGeneration).extractBrain();
        var newPlayer = new Player(i, brainLength, false);
        
        var mutatedBrain = mutateBrain(selectedBrain);
        
        newPlayer.brain = mutatedBrain;

        newGeneration.push(newPlayer);
    }
    return newGeneration;
}

function getTotalScore(playerSet){
    var total = 0;
    for(var i = 0; i < numberOfPlayers; i++){
        total += playerSet[i].score;
    }
    return total;
}

function selectOneParent(playerSet){
    var totalScore = getTotalScore(playerSet);
    
    var selection = Math.random()*totalScore; //generates a number between 0 and (almost) totalScore

    var runningTotal = 0;
    for(var i = 0; i < numberOfPlayers; i++){
        runningTotal += playerSet[i].score;
        if (runningTotal > selection) {
            return playerSet[i];
        }
    }

    //will only reach this point if the selection is the maximum possible.
    return playerSet[playerSet.length-1];
}

function mutateBrain(originalBrain){
    //Mutates the brain passed in, assigning new random values to 1% of its instructions.
    var mutationChance = 0.01;
    var mutatedBrain = new Brain(0);
    mutatedBrain.moves = [];

    for(var i = 0; i < originalBrain.moves.length; i++){
        var randomRoll = Math.random();
        if(randomRoll < mutationChance){
            var x = randomIntFromInterval(-1,1);
            var y = randomIntFromInterval(-1,1);

            mutatedBrain.moves.push(new Coordinate(x, y));
        }else{
            mutatedBrain.moves.push(originalBrain.moves[i]);
        }
    }
    return mutatedBrain;
}