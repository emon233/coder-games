const Application = PIXI.Application;
const Container = PIXI.Container;
const Graphics = PIXI.Graphics;

const appWidth = window.innerWidth;
const appHeight = window.innerHeight;

const groundCoordinatesArray = [];

const app = new Application({
    width: appWidth,
    height: appHeight,
    transparent: false,
    antialias: true,
});

app.renderer.background.color = 0xc6f5ef;
app.renderer.view.style.position = 'absolute';
document.getElementById('canvas').appendChild(app.view);

const container1 = new Container();
const container2 = new Container();

app.stage.addChild(container1);
app.stage.addChild(container2);

const containerWidth = app.screen.width;
const containerHeight = app.screen.height / 3;

container1.width = containerWidth;
container1.height = containerHeight;
container1.position.y = 0;

container2.width = containerWidth;
container2.height = containerHeight * 2;
container2.position.y = containerHeight;

const background1Color = 0x87CEEB; // sky blue
const background2Color = 0x556B50; // grass green

const container1Graphics = new Graphics();
const container2Graphics = new Graphics();

container1Graphics.beginFill(background1Color)
    .drawRect(0, 0, containerWidth, containerHeight)
    .endFill();
container1.addChild(container1Graphics);

container2Graphics.beginFill(background2Color)
    .drawRect(0, 0, containerWidth, containerHeight * 2)
    .endFill();
container2.addChild(container2Graphics);

