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
    return(playerSet[bestPlayerIndex]);
}

function selectNextGeneration(currentGeneration){
    var newGeneration = [];

    newGeneration.push(findBestPlayer(currentGeneration));  //Add the best player of the previous generation.

    for(var i = 1; i < numberOfPlayers; i++){
        newGeneration.push(selectOneParent(currentGeneration));
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