const Application = PIXI.Application;
const Container = PIXI.Container;
const Graphics = PIXI.Graphics;

const appWidth = window.innerWidth;
const appHeight = window.innerHeight * 2/3;

const containerTopPositionX = 0;
const containerTopPositionY = 0;

const containerFieldPositionX = 0;
const containerFieldPositionY = Math.floor(appHeight * 1/3);

const containerBottomPositionX = 0;
const containerBottomPositionY = containerFieldPositionY + 400;

const app = new Application({
    width: 250,
    height: 250,
    transparent: false,
    antialias: true
});

app.renderer.background.color = 0xc6f5ef;
app.renderer.resize(appWidth, appHeight);
app.renderer.view.style.position = 'absolute';
document.getElementById('canvas').appendChild(app.view);

// const container = new PIXI.Container();
// container.position.set(0,0);
// app.stage.addChild(container);


// const backgroundTexturePromise = PIXI.Assets.load('../assets/level1/background.jpg');

// backgroundTexturePromise.then((resolvedTexture) => {
//     const background = PIXI.Sprite.from(resolvedTexture);
//     background.x = 0;
//     background.y = 0;
//     background.width = app.screen.width;
//     background.height = app.screen.height;
//     app.stage. (background);
// })

const containerTop = new Container();
containerTop.position.set(containerTopPositionX, containerTopPositionY);
app.stage.addChild(containerTop);

const containerField = new Container();
containerField.position.set(containerFieldPositionX, containerFieldPositionY);
app.stage.addChild(containerField);

const containerBottom = new Container();
containerBottom.position.set(containerBottomPositionX, containerBottomPositionY);
app.stage.addChild(containerBottom);

// const groundXTexture = PIXI.Assets.load('../assets/vertical.png');
// const groundYTexture = PIXI.Assets.load('../assets/horizontal.png');

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
            // groundXTexture.then((resolvedTexture) => {
            //     const groundX = PIXI.Sprite.from(resolvedTexture);
            //     groundX.width = groundCubeWidth;
            //     groundX.height = groundCubeWidth;
            //     groundX.x = groundCubePrefix + (groundX.width + 2) * i;
            //     groundX.y = 0 + (groundX.height + 2) * j;
            //     containerField.addChild(groundX);
            // });
        } else {
            // groundYTexture.then((resolvedTexture) => {
            //     const groundY = PIXI.Sprite.from(resolvedTexture);
            //     groundY.width = groundCubeWidth;
            //     groundY.height = groundCubeWidth;
            //     groundY.x = groundCubePrefix + (groundY.width + 2) * i;
            //     groundY.y = 0 + (groundY.height + 2) * j;
            //     containerField.addChild(groundY);
            // });
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
let ballPositionY = groundCoordinatesArray[ballPositionYi][ballPositionYj].y;

const ballTexture = PIXI.Texture.from("../assets/ball.png");
const ball = new PIXI.Sprite(ballTexture);
ball.width = groundCubeWidth/2;
ball.height = groundCubeWidth/2;
ball.eventMode = 'static';

ball.anchor.set(0.5);
ball.position.set(ballPositionX, ballPositionY);
containerField.addChild(ball);

const onKeyDown = (e) => {
    if (e.keyCode === 37) {
        // Left arrow key
        moveBall("Left");
    } else if (e.keyCode === 39) {
        // Right arrow key
        moveBall("Right");
    } else if (e.keyCode === 38) {
        // Up arrow key
        moveBall("Up");
    } else if (e.keyCode === 40) {
        // Down arrow key
        moveBall("Down");
    }
}

window.addEventListener('keydown', onKeyDown);


const moveBall = (direction) => {
    prevBallPositionXi = ballPositionXi;
    prevBallPositionXj = ballPositionXj;
    prevBallPositionYi = ballPositionYi;
    prevBallPositionYj = ballPositionYj;

    if(direction == "Left") {
        ballPositionXi = ballPositionXi - 1;
    } else if(direction == "Right") {
        ballPositionXi = ballPositionXi + 1;
    } else if(direction == "Up") {
        ballPositionYj = ballPositionYj - 1;
    } else if(direction == "Down") {
        ballPositionYj = ballPositionYj + 1;
    }

    if(ballPositionXi < 0 || ballPositionXi >= (groundCubeNumber - 2) || ballPositionYj < 0 || ballPositionYj >= 4) {
        console.log("End of Line");
        ballPositionXi = prevBallPositionXi;
        ballPositionYj = prevBallPositionYj;
    }

    ballPositionX = groundCoordinatesArray[ballPositionXi][ballPositionXj].x;
    ballPositionY = groundCoordinatesArray[ballPositionYi][ballPositionYj].y;

    ball.position.set(ballPositionX, ballPositionY);
}

/** Test Code */
const graphics = new PIXI.Graphics();

for (let i = 0; i < (groundCubeNumber - 2); i++) {
    for (let j = 0; j < 4; j++) {
        const dotSize = 4;

        const { x, y } = groundCoordinatesArray[i][j];
        
        graphics.beginFill(0xFF0000);
        graphics.drawCircle(x, y, dotSize);
        graphics.endFill();
    }
}

containerField.addChild(graphics);

/** End Test Code */