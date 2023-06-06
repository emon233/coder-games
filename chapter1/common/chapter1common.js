const Application = PIXI.Application;
const Container = PIXI.Container;
const Graphics = PIXI.Graphics;

const appWidth = window.innerWidth;
const appHeight = window.innerHeight;

const containerTopPositionX = 0;
const containerTopPositionY = 0;

const containerFieldPositionX = 0;
const containerFieldPositionY = Math.floor(appHeight * 1/3);

const containerBottomPositionX = 0;
const containerBottomPositionY = containerFieldPositionY + 400;

let isGameOver = false;

const app = new Application({
    width: 250,
    height: 350,
    transparent: false,
    antialias: true
});

app.renderer.background.color = 0xc6f5ef;
app.renderer.resize(appWidth, appHeight);
app.renderer.view.style.position = 'absolute';
document.getElementById('canvas').appendChild(app.view);

const containerTop = new Container();
containerTop.position.set(containerTopPositionX, containerTopPositionY);
app.stage.addChild(containerTop);

const containerField = new Container();
containerField.position.set(containerFieldPositionX, containerFieldPositionY);
app.stage.addChild(containerField);

const containerBottom = new Container();
containerBottom.position.set(containerBottomPositionX, containerBottomPositionY);
app.stage.addChild(containerBottom);

const groundXTexture = PIXI.Texture.from('../assets/vertical.png');
const groundYTexture = PIXI.Texture.from('../assets/horizontal.png');

const groundCubeNumber = 20;
const groundCubeWidth = app.screen.width / groundCubeNumber;
const groundCubePrefix = (app.screen.width - ((groundCubeWidth + 2) * 18)) / 2;

const groundCoordinatesArray = [];

for(let i=0; i<(groundCubeNumber - 2); i++) {
    const row = [];
    for(let j=0; j<4; j++) {
        if(((i%2) == 0 && (j%2) == 0) || (i%2) == 1 && (j%2) == 1) {
            const groundX = new PIXI.Sprite(groundXTexture);
            groundX.height = groundCubeWidth;
            groundX.width = groundCubeWidth;
            groundX.x = groundCubePrefix + (groundX.width + 2) * i;
            groundX.y = 0 + (groundX.height + 2) * j;
            containerField.addChild(groundX);
        } else {
            const groundY = new PIXI.Sprite(groundYTexture);
            groundY.width = groundCubeWidth;
            groundY.height = groundCubeWidth;
            groundY.x = groundCubePrefix + (groundY.width + 2) * i;
            groundY.y = 0 + (groundY.height + 2) * j;
            containerField.addChild(groundY);
        }

        const coordinates = {
            x: groundCubePrefix + (groundCubeWidth + 2) * i + groundCubeWidth / 2,
            y: (groundCubeWidth + 2) * j + groundCubeWidth / 2
        };
        row.push(coordinates);
    }
    groundCoordinatesArray.push(row);
}

let prevBallPositionXi = 0;
let prevBallPositionXj = 0;
let prevBallPositionYi = 0;
let prevBallPositionYj = 0;

let ballPositionXi = 0;
let ballPositionXj = 0;
let ballPositionYi = 0;
let ballPositionYj = 0;

let ballPositionX = groundCoordinatesArray[ballPositionXi][ballPositionXj].x;
let ballPositionY = groundCoordinatesArray[ballPositionXi][ballPositionXj].y;

let goalpostPositionX = groundCoordinatesArray[ballPositionXi][ballPositionXj].x;
let goalpostPositionY = groundCoordinatesArray[ballPositionXi][ballPositionXj].y;


const goalpostTexture = PIXI.Texture.from("../assets/goal-post.png");
const goalpost = new PIXI.Sprite(goalpostTexture);
goalpost.width = groundCubeWidth;
goalpost.height = groundCubeWidth;
goalpost.anchor.set(0.5);
goalpost.position.set(goalpostPositionX, goalpostPositionY);

containerField.addChild(goalpost);

const ballTexture = PIXI.Texture.from("../assets/ball.png");
const ball = new PIXI.Sprite(ballTexture);
ball.width = groundCubeWidth/2;
ball.height = groundCubeWidth/2;
ball.eventMode = 'static';

ball.anchor.set(0.5);
ball.position.set(ballPositionX, ballPositionY);
containerField.addChild(ball);

const nextMove = (e) => {
    if(!isGameOver) {
        moveBall(e);
    }
}

/**
 * Direction Map
 * 
 * 0 none
 * 1 bottom-left
 * 2 bottom
 * 3 bottom-right
 * 4 left
 * 5 none
 * 6 right
 * 7 top-left
 * 8 top
 * 9 top-right
 */

const moveBall = (direction) => {
    prevBallPositionXi = ballPositionXi;
    prevBallPositionXj = ballPositionXj;
    prevBallPositionYi = ballPositionYi;
    prevBallPositionYj = ballPositionYj;

    if(direction == 4) {
        ballPositionXi = ballPositionXi - 1;
    } else if(direction == 6) {
        ballPositionXi = ballPositionXi + 1;
    } else if(direction == 8) {
        ballPositionYj = ballPositionYj - 1;
    } else if(direction == 2) {
        ballPositionYj = ballPositionYj + 1;
    }

    if(ballPositionXi < 0 || ballPositionXi >= (groundCubeNumber - 2) || ballPositionYj < 0 || ballPositionYj >= 4) {
        ballPositionXi = prevBallPositionXi;
        ballPositionYj = prevBallPositionYj;
    }

    ballPositionX = groundCoordinatesArray[ballPositionXi][ballPositionXj].x;
    ballPositionY = groundCoordinatesArray[ballPositionYi][ballPositionYj].y;

    ball.position.set(ballPositionX, ballPositionY);
    checkBallPosition();
}

const checkBallPosition = () => {
    if(ball.position.x == goalpost.position.x && ball.position.y == goalpost.position.y) {
        gameover();
    }
}

const gameover = () => {
    console.log("Game Over");
    const gameoverTexture = PIXI.Texture.from("../assets/game-over.png");
    const gameoverSprite = new PIXI.Sprite(gameoverTexture);
    gameoverSprite.anchor.set(0.5);
    gameoverSprite.position.x = containerField.width/2;
    gameoverSprite.position.y = containerField.height/2;
    gameoverSprite.scale.set(0.75);
    containerField.addChild(gameoverSprite);
    isGameOver = true;
}