const ground1Texture = PIXI.Texture.from('../assets/field-1.png');
const ground2Texture = PIXI.Texture.from('../assets/field-2.png');

const groundCubeWidth = app.screen.width / (_COL + 2);
const _minDistanceX = (app.screen.width - ((groundCubeWidth + 2) * _COL)) / 2;
const _minDistanceY = 10;

for(let i=0; i<_COL; i++) {
    const row = [];
    for(let j=0; j<_ROW; j++) {
        if(((i%2) == 0 && (j%2) == 0) || (i%2) == 1 && (j%2) == 1) {
            const ground1Sprite = new PIXI.Sprite(ground1Texture);
            ground1Sprite.width = groundCubeWidth;
            ground1Sprite.height = groundCubeWidth;
            ground1Sprite.x = _minDistanceX + (ground1Sprite.width + 2) * i;
            ground1Sprite.y = _minDistanceY + (ground1Sprite.height + 2) * j;
            container2.addChild(ground1Sprite);
        } else {
            const ground2Sprite = new PIXI.Sprite(ground2Texture);
            ground2Sprite.width = groundCubeWidth;
            ground2Sprite.height = groundCubeWidth;
            ground2Sprite.x = _minDistanceX + (ground2Sprite.width + 2) * i;
            ground2Sprite.y = _minDistanceY + (ground2Sprite.height + 2) * j;
            container2.addChild(ground2Sprite);
        }

        const coordinates = {
            x: _minDistanceX + (groundCubeWidth + 2) * i + groundCubeWidth / 2,
            y: _minDistanceY + (groundCubeWidth + 2) * j + groundCubeWidth / 2
        };
        row.push(coordinates);
    }
    groundCoordinatesArray.push(row);
}


const codeContainer = new Container();
codeContainer.position.x = 0;
codeContainer.position.y = groundCoordinatesArray[0][3].y + groundCubeWidth;
container2.addChild(codeContainer);

const editorContainer = new Container();
editorContainer.position.x = containerWidth/2;
editorContainer.position.y = groundCoordinatesArray[0][3].y + groundCubeWidth;
container2.addChild(editorContainer);

const codeContainerGraphics = new Graphics();
const editorContainerGraphics = new Graphics();

const backgroundCodeColor = 0xAAAFFF;
const backgroundEditorColor = 0xFFFAAA;

codeContainerGraphics.beginFill(backgroundCodeColor)
    .drawRect(0, 0, containerWidth / 2, containerHeight)
    .endFill();
codeContainer.addChild(codeContainerGraphics);

editorContainerGraphics.beginFill(backgroundEditorColor)
    .drawRect(0, 0, containerWidth / 2, containerHeight)
    .endFill();
editorContainer.addChild(editorContainerGraphics);


/** Game over condition */

const playerOutOfField = async () => {
    if(playerPositionX >= _COL || playerPositionX < 0 || playerPositionY >= _ROW || playerPositionY < 0) {
        isPlayerOutOfField = true;
        return true;
    }

    return false;
}

/** End Game over condition */
