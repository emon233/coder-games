/** Input buttons */
const arrayButtons = [6, 4, 8, 2, 9, 7, 3, 1];

class CustomSprite extends PIXI.Sprite {
    constructor(texture, value) {
        super(texture);
        this.value = value;
    }
}

let buttonSprites = new Array(8);

const buttonPrefix = editorContainer.width/10;

const display_editor = (number_of_buttons = 8) => {
    number_of_buttons = number_of_buttons >= 8 ? 8 : number_of_buttons;

    for(let i=0; i<number_of_buttons; i++) {
        const buttonTexture = PIXI.Texture.from("../assets/arrow-buttons/" + arrayButtons[i] + ".png");
        const buttonSprite = new CustomSprite(buttonTexture, arrayButtons[i]);
        buttonSprite.anchor.set(0.5);
        buttonSprite.scale.set(0.0625);
        buttonSprite.position.set(buttonPrefix + (buttonPrefix * i), groundCubeWidth/2);
        editorContainer.addChild(buttonSprite);

        buttonSprites[i] = buttonSprite;

        buttonSprite.eventMode = 'static';

        
        buttonSprite.on('pointerover', () => {
            if(!lockCode) {   
                buttonSprite.cursor = 'pointer';
            }
        });

        buttonSprite.on('pointerout', () => {
            if(!lockCode) {   
                buttonSprite.cursor = 'auto';
            }
        });

        buttonSprite.on('click', () => {
            if(!lockCode) {   
                set_array_code(buttonSprite.value);
                display_code();
            }
        });
    }
}

const arrayCode = new Array();
const codePositionX = codeContainer.width/10;
const codePositionY = codeContainer.height/8;

const set_array_code = (button_value) => {
    arrayCode.push(button_value);
}

const remove_array_code = (arrayIndex) => {
    arrayCode.splice(arrayIndex, 1);
}

const display_code = () => {
    delete_code();
    for(let i=0; i < arrayCode.length; i++) {
        const codeTexture = PIXI.Texture.from("../assets/arrow-buttons/" + arrayCode[i] + ".png");
        const codeSprite = new CustomSprite(codeTexture, i);
        codeSprite.anchor.set(0.5);
        codeSprite.scale.set(0.0625);
        codeSprite.position.set(codePositionX + (codePositionX * (i % 8)), codePositionY + (codePositionY * Math.floor(i/8)));
        codeSprite.customClassName = 'CustomSprite';
        codeContainer.addChild(codeSprite);

        codeSprite.eventMode = 'static';
        
        codeSprite.on('pointerover', () => {
            if(!lockCode) {
                codeSprite.cursor = 'move';
            }
        });

        codeSprite.on('pointerout', () => {
            if(!lockCode) {
                codeSprite.cursor = 'auto';
            }
        });

        codeSprite.on('click', () => {
            if(!lockCode) {
                remove_array_code(codeSprite.value);
                display_code();
            }
        })
    }
}

const delete_code = () => {
    const childrenWithClassName = codeContainer.children.filter((child) => child.customClassName === 'CustomSprite');

    childrenWithClassName.forEach((child) => {
        codeContainer.removeChild(child);
    });
}

const playerOutOfMove = async () => {
    if(!arrayCode.length) {
        isPlayerOutOfMove = true;
        return true;
    }
}
