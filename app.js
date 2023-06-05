const Application = PIXI.Application;

const app = new Application({
    width: 500,
    height: 500,
    transparent: false,
    antialias: true,
});

app.renderer.background.color = 0x0d0d0d;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);

const buttonTextStyle = new PIXI.TextStyle({
    fontFamily: 'Montserrat',
    fontSize: 48, 
    fill: 'deepskyblue', 
    stroke: '#000000',
    strokeThickness: 1, 
    dropShadow: true,
    dropShadowDistance: 5,
    dropShadowAngle: Math.PI/2,
    dropShadowBlur: 4,
    dropShadowColor: '#000000',
});

/** Level Button 01 */

const buttonContainer01 = new PIXI.Container;
buttonContainer01.position.set(100, 25);
app.stage.addChild(buttonContainer01);

const Graphics = PIXI.Graphics;

const buttonLevel01 = new Graphics();
buttonLevel01.beginFill(0xab1bb3).drawRect(0, 0, 250, 100).lineStyle(4, 0xAAAAAA).endFill();
buttonContainer01.addChild(buttonLevel01);

const buttonText01 = new PIXI.Text("Chapter 01", buttonTextStyle);
buttonText01.anchor.set(0.5, 0.5);
buttonText01.position.set(130, 50);
buttonContainer01.addChild(buttonText01);

/** End Level Button 01 */

/** Try Dynamic Button Coding */

const numberOfButtons = 1;
let buttonContainerArray = [];
let buttonLevelArray = [];
let buttonTextArray = [];

for(let i = 0; i<numberOfButtons; i++) {
    buttonContainerArray[i] = new PIXI.Container;
    buttonContainerArray[i].position.set(100, (i+1) * 150);
    app.stage.addChild(buttonContainerArray[i]);

    buttonLevelArray[i] = new Graphics();

    buttonLevelArray[i].beginFill(0xFFFFFF).drawRect(0, 0, 250, 100).lineStyle(4, 0xAAAAAA).endFill();
    buttonLevelArray[i].tint = 0xAAFFBB;
    buttonLevelArray[i].eventMode = 'static';
    buttonLevelArray[i].cursor = 'pointer';
    buttonContainerArray[i].addChild(buttonLevelArray[i]);

    buttonLevelArray[i].addEventListener('mouseenter', function(e){
        this.tint = 0xFFFFFF;
    });
    
    buttonLevelArray[i].addEventListener('mouseleave', function(e){
        this.tint = 0xAAFFBB;
    });

    buttonLevelArray[i].addEventListener('mousedown', function(e){
        window.location = 'chapter1/level'+(i+1)+'/index.html';
    });

    buttonTextArray[i] = new PIXI.Text("Level "+(i+1), buttonTextStyle);
    buttonTextArray[i].anchor.set(0.5, 0.5);
    buttonTextArray[i].position.set(130, 50);
    buttonLevelArray[i].addChild(buttonTextArray[i]);
}

/** End Try Dynamic Button Coding */