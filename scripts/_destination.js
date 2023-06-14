const destinationTexture = PIXI.Texture.from("../assets/destination.png");
const destinationSprite = new PIXI.Sprite(destinationTexture);
container2.addChild(destinationSprite);
destinationSprite.width = groundCubeWidth;
destinationSprite.height = groundCubeWidth;
destinationSprite.anchor.set(0.5);
destinationSprite.position.set(groundCoordinatesArray[destinationPositionX][destinationPositionY].x, groundCoordinatesArray[destinationPositionX][destinationPositionY].y);


const setDestinationPosition = (x = destinationPositionX, y = destinationPositionY) => {
    destinationSprite.position.set(groundCoordinatesArray[x][y].x, groundCoordinatesArray[x][y].y);
}


/** Game over condition */

const playerReachedDestination = async () => {
    if(playerPositionX == destinationPositionX && playerPositionY == destinationPositionY) {
        isPlayerReachedDestination = true;
        return true;
    }
}

/** End Game over condition */