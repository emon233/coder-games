const homeButtonTexture = PIXI.Texture.from("../assets/button-home.png");
const homeButtonSprite = new PIXI.Sprite(homeButtonTexture);
const buttonWidth = app.screen.width / 40;

homeButtonSprite.anchor.set(0.5);
homeButtonSprite.width = buttonWidth;
homeButtonSprite.height = buttonWidth;
homeButtonSprite.eventMode = 'static';

const loadHomeButton = async () => {
    return homeButtonSprite;
}

const displayHomeButtonOnContainer = async (container) => {
    homeButton = await loadHomeButton();
    homeButton.position.set(container.width/2 - (buttonWidth*2), container.height * 3/4);
    container.addChild(homeButton);
}

homeButtonSprite.on('pointerover', () => {
    homeButtonSprite.cursor = "pointer";
})

homeButtonSprite.on('click', () => {
    window.location = buttonHomeUrl;
})

const replayButtonTexture = PIXI.Texture.from("../assets/button-replay.png");
const replayButtonSprite = new PIXI.Sprite(replayButtonTexture);

replayButtonSprite.anchor.set(0.5);
replayButtonSprite.width = buttonWidth;
replayButtonSprite.height = buttonWidth;
replayButtonSprite.eventMode = 'static';

const loadReplayButton = () => {
    return replayButtonSprite;
}

const displayReplayButtonOnContainer = async (container) => {
    replayButton = await loadReplayButton();
    replayButton.position.set(container.width/2, container.height * 3/4);
    container.addChild(replayButton);
}

replayButtonSprite.on('pointerover', () => {
    replayButtonSprite.cursor = "pointer";
})

replayButtonSprite.on('click', () => {
    window.location.reload();
})

const nextButtonTexture = PIXI.Texture.from("../assets/button-next.png");
const nextButtonSprite = new PIXI.Sprite(nextButtonTexture);

nextButtonSprite.anchor.set(0.5);
nextButtonSprite.width = buttonWidth;
nextButtonSprite.height = buttonWidth;
nextButtonSprite.eventMode = 'static';

const loadNextButton = () => {
    return nextButtonSprite;
}

nextButtonSprite.on('pointerover', () => {
    nextButtonSprite.cursor = "pointer";
})

nextButtonSprite.on('click', () => {
    window.location = buttonNextUrl;
})

const displayNextButtonOnContainer = async (container) => {
    nextButton = await loadNextButton();
    nextButton.position.set(container.width/2 + (buttonWidth * 2), container.height * 3/4);
    container.addChild(nextButton);
}

const displayGameoverButtons = async (container) => {
    await displayHomeButtonOnContainer(container);
    await displayReplayButtonOnContainer(container);
    await displayNextButtonOnContainer(container);
}
