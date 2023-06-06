/** Input buttons */
const arrayButtons = [6, 4, 8, 2, 9, 7, 3, 1];

class CustomSprite extends PIXI.Sprite {
    constructor(texture, arrayButtonValue) {
        super(texture);
        this.arrayButtonValue = arrayButtonValue;
    }
}

const buttonContainer = new Container();
buttonContainer.position.set(appWidth * 2/3, 0);
containerBottom.addChild(buttonContainer);

let buttonSprites = new Array(8);

const display_buttons = (number_of_buttons = 8) => {
    number_of_buttons = number_of_buttons >= 8 ? 8 : number_of_buttons;

    for(let i = 0; i < number_of_buttons; i++) {
        const buttonTexture = PIXI.Texture.from("../assets/arrow-buttons/"+arrayButtons[i]+".png");
        const buttonSprite = new CustomSprite(buttonTexture, arrayButtons[i]);
        buttonSprite.anchor.set(0.5);
        buttonSprite.scale.set(0.0625);
        buttonSprite.position.set(50 * i, 0);
        buttonSprite.eventMode = 'static';
        buttonContainer.addChild(buttonSprite);

        buttonSprites[i] = buttonSprite;

        buttonSprite.on('pointerover', () => {
            buttonSprite.cursor = 'pointer'; // Set the cursor style directly on the sprite
        });
        
        // Add 'pointerout' event listener
        buttonSprite.on('pointerout', () => {
            buttonSprite.cursor = 'auto'; // Reset the cursor style on the sprite
        });

        buttonSprite.on('click', () => {
            set_array_instructions(buttonSprite.arrayButtonValue);
        });
    }

    const playButtonTexture = PIXI.Texture.from("../assets/button-play.png");
    const playButtonSprite = new PIXI.Sprite(playButtonTexture);

    playButtonSprite.scale.set(0.25);
    playButtonSprite.position.set(0, 25);
    playButtonSprite.eventMode = 'static';
    buttonContainer.addChild(playButtonSprite);

    playButtonSprite.on('pointerover', () => {
        playButtonSprite.cursor = 'pointer'; // Set the cursor style directly on the sprite
    });
    
    // Add 'pointerout' event listener
    playButtonSprite.on('pointerout', () => {
        playButtonSprite.cursor = 'auto'; // Reset the cursor style on the sprite
    });

    playButtonSprite.on('click', () => {
        play();
    });
}

/** End Input Buttons */

/** Instructions */

const arrayInstructions = new Array();

const instructionContainer = new Container();
instructionContainer.position.set(100, 0);
containerBottom.addChild(instructionContainer);

const set_array_instructions = (button_value) => {
    arrayInstructions.push(button_value);

    for(let i=0; i < arrayInstructions.length; i++) {
        const instructionTexture = PIXI.Texture.from("../assets/arrow-buttons/" + arrayInstructions[i] + ".png");
        const instructionSprite = new PIXI.Sprite(instructionTexture);
        instructionSprite.anchor.set(0.5);
        instructionSprite.scale.set(0.0625);
        instructionSprite.position.set(50 * (i % 10), 50 * Math.floor(i/10));
        instructionContainer.addChild(instructionSprite);
    }
}


const play = () => {
    if(arrayInstructions.length && !isGameOver) {
        const removeElement = arrayInstructions.shift();
        nextMove(removeElement);
        rearrangeInstructionsArray();
        setTimeout(play, 1000);
    }
}

const rearrangeInstructionsArray = () => {
    instructionContainer.removeChildren();
    for(let i=0; i < arrayInstructions.length; i++) {
        const instructionTexture = PIXI.Texture.from("../assets/arrow-buttons/" + arrayInstructions[i] + ".png");
        const instructionSprite = new PIXI.Sprite(instructionTexture);
        instructionSprite.anchor.set(0.5);
        instructionSprite.scale.set(0.0625);
        instructionSprite.position.set(50 * (i % 10), 50 * Math.floor(i/10));
        instructionContainer.addChild(instructionSprite);
    }
}

/** End Instructions */


/**
 * Input Indicators
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