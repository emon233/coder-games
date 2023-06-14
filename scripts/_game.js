const display_play_button = () => {
    const playButtonTexture = PIXI.Texture.from("../assets/button-play.png");
    const playButtonSprite = new PIXI.Sprite(playButtonTexture);
    playButtonSprite.anchor.set(0.5);
    playButtonSprite.scale.set(0.25);
    playButtonSprite.position.set(editorContainer.width/2, editorContainer.height/2);
    editorContainer.addChild(playButtonSprite);

    playButtonSprite.eventMode = 'static';

    playButtonSprite.on('pointerover', () => {
        if(!lockCode) {
            playButtonSprite.cursor = 'pointer';
        }
    })

    playButtonSprite.on('pointerout', () => {
        if(!lockCode) {
            playButtonSprite.cursor = 'auto';
        }
    })

    playButtonSprite.on('click', () => {
        if(!lockCode) {
            lockCode = true;
            movesMade = arrayCode.length;
            play();
        }
    })
}

display_play_button();

const play = () => {
    isPlaying = true;
    if(arrayCode.length && !isGameOver) {
        const removeElement = arrayCode.shift();
        nextMove(removeElement);
        display_code();
        checkIsGameOver();
        setTimeout(play, 500);
    }
}

const nextMove = (direction) => {
    if(!isGameOver) {
        movePlayer(direction);
    }
}

const movePlayer = async (direction) => {
    prevPlayerPositionX = playerPositionX;
    prevPlayerPositionY = playerPositionY;

    if(direction == 4) {
        playerPositionX--;
    } else if(direction == 6) {
        playerPositionX++;
    } else if(direction == 8) {
        playerPositionY--;
    } else if(direction == 2) {
        playerPositionY++;
    }

    const varIsMoveValid = await isMoveValid();
    
    if(varIsMoveValid) {
        setPlayerPosition();
    } else {
        gameover();
    }
}

const isMoveValid = async () => {
    let checkPlayerOutOfField = await playerOutOfField();

    if(checkPlayerOutOfField) {
        return false;
    }

    return true;
}

const checkIsGameOver = async () => {
    const varPlayerHitObstacle = await playerHitObstacle();
    const varPlayerOutOfMove = await playerOutOfMove();
    const varPlayerReachedDestination = await playerReachedDestination();

    if(varPlayerHitObstacle || varPlayerOutOfMove || varPlayerReachedDestination) {
        gameover();
    }
}

const containerGameoverBackground = new Container();
const containerGameoverWindow = new Container();
const containerGameoverBackgroundGraphics = new Graphics();
const gameoverWindow = new Graphics();

const gameover = () => {
    isGameOver = true;
    
    loadGameoverWindow();
    displayStar();
    if(isPlayerReachedDestination) {
        successfulGameover();
    } else {
        failedGameover();
    }
}

const loadGameoverWindow = async () => {
    app.stage.addChild(containerGameoverBackground);
    const _colorContainerGameoverBackground = 0xAADDFF;
    containerGameoverBackgroundGraphics.beginFill(_colorContainerGameoverBackground, 0.25)
        .drawRect(0, 0, app.screen.width, app.screen.height)
        .endFill();

    containerGameoverBackground.addChild(containerGameoverBackgroundGraphics);
    containerGameoverBackground.addChild(containerGameoverWindow);

    containerGameoverWindow.position.set(appWidth/4, appHeight/4);
    gameoverWindow.beginFill(0XDDFFAA)
        .drawRect(0, 0, appWidth/2, appHeight/2)
        .endFill();

    containerGameoverWindow.addChild(gameoverWindow);

    await displayGameoverButtons(containerGameoverWindow);
}

const successfulGameover = () => {
    const text = new PIXI.Text("Challenge Successful", {
        fontFamily: "Palatino", 
        fontSize: 48, 
        fill: 0x117A15,
        stroke: 0x117A15,
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowOffsetX: 2,
        dropShadowOffsetY: 2
    });
    text.anchor.set(0.5, 0.5);
    text.x = containerGameoverWindow.width / 2;
    text.y = containerGameoverWindow.height / 4;
    containerGameoverWindow.addChild(text);
}

const failedGameover = () => {
    const text = new PIXI.Text("Challenge Failed", {
        fontFamily: "Palatino", 
        fontSize: 48, 
        fill: 0xBF1327,
        stroke: "#000000",
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: "#000000",
        dropShadowBlur: 4,
        dropShadowOffsetX: 2,
        dropShadowOffsetY: 2
    });
    text.anchor.set(0.5, 0.5);
    text.x = containerGameoverWindow.width / 2;
    text.y = containerGameoverWindow.height / 4;
    containerGameoverWindow.addChild(text);
}

const displayStar = () => {
    const heartFillTexture = PIXI.Texture.from("../assets/heart-fill.png");
    const heartEmptyTexture = PIXI.Texture.from("../assets/heart-empty.png");

    let stars = 0;

    if(isPlayerReachedDestination) {
        if(movesMade == movesRequired) stars = 3;
        else if(movesMade > movesRequired && movesMade <= movesRequired * 2) stars = 2;
        else stars = 1;
    }

    const heart1Sprite = new PIXI.Sprite(stars > 0 ? heartFillTexture : heartEmptyTexture);
    const heart2Sprite = new PIXI.Sprite(stars >= 2 ? heartFillTexture : heartEmptyTexture);
    const heart3Sprite = new PIXI.Sprite(stars >= 3 ? heartFillTexture : heartEmptyTexture);

    heart1Sprite.anchor.set(0.5);
    heart1Sprite.width = appWidth / 20;
    heart1Sprite.height = appWidth / 20;
    heart1Sprite.position.set(containerGameoverWindow.width / 2 - appWidth / 20, containerGameoverWindow.height / 2);

    heart2Sprite.anchor.set(0.5);
    heart2Sprite.width = appWidth / 20;
    heart2Sprite.height = appWidth / 20;
    heart2Sprite.position.set(containerGameoverWindow.width / 2, containerGameoverWindow.height / 2);

    heart3Sprite.anchor.set(0.5);
    heart3Sprite.width = appWidth / 20;
    heart3Sprite.height = appWidth / 20;
    heart3Sprite.position.set(containerGameoverWindow.width / 2 + appWidth/20, containerGameoverWindow.height / 2);

    containerGameoverWindow.addChild(heart1Sprite);
    containerGameoverWindow.addChild(heart2Sprite);
    containerGameoverWindow.addChild(heart3Sprite);
}
