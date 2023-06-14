const playerTexture = PIXI.Texture.from("../assets/player.png");
const playerSprite = new PIXI.Sprite(playerTexture);
container2.addChild(playerSprite);
playerSprite.width = groundCubeWidth/2;
playerSprite.height = groundCubeWidth/2;
playerSprite.anchor.set(0.5);
playerSprite.position.set(groundCoordinatesArray[playerPositionX][playerPositionY].x, groundCoordinatesArray[playerPositionX][playerPositionY].y);


const setPlayerPosition = (x = playerPositionX, y = playerPositionY) => {
    playerSprite.position.set(groundCoordinatesArray[x][y].x, groundCoordinatesArray[x][y].y);
}



