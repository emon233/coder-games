const obstacleTexture = PIXI.Texture.from("../assets/obstacle.png");

const setObstaclePositions = (positionsArray = new Array()) => {
    arrayObstaclePositions = positionsArray;
    if(positionsArray.length) {
        for(let i = 0; i < positionsArray.length; i++) {
            const obstacleSprite = new PIXI.Sprite(obstacleTexture);
            container2.addChild(obstacleSprite);
            obstacleSprite.width = groundCubeWidth;
            obstacleSprite.height = groundCubeWidth;
            obstacleSprite.anchor.set(0.5);
            obstacleSprite.position.set(groundCoordinatesArray[positionsArray[i][0]][positionsArray[i][1]].x, groundCoordinatesArray[positionsArray[i][0]][positionsArray[i][1]].y);
        }
    }
}

// setObstaclePositions([[1,0], [10,1]]);

const playerHitObstacle = async () => {
    for (let i = 0; i < arrayObstaclePositions.length; i++) {
        const obj = arrayObstaclePositions[i];
        if(obj[0] == playerPositionX && obj[1] == playerPositionY) {
            isPlayerHitObstacle = true;
            return true;
        }
    }

    return false;
}
