let playerPositionX = 5;
let playerPositionY = 3;

let destinationPositionX = 10;
let destinationPositionY = 3;

let obstaclePositionX = 10;
let obstaclePositionY = 2;
let arrayObstaclePositions = new Array();

let prevPlayerPositionX = 0;
let prevPlayerPositionY = 0;

let isPlayerOutOfField = false;
let isPlayerHitObstacle = false;
let isPlayerReachedDestination = false;
let isPlayerOutOfMove = false;

let isPlaying = false;
let isGameOver = false;
let lockCode = false;

let movesMade = 0;
let movesRequired = 0;

const _ROW = 4;
const _COL = 23;

let buttonHomeUrl = "";
let buttonNextUrl = "";

const setButtonHomeUrl = (url = null) => {
    buttonHomeUrl = url;
}

const setButtonNextUrl = (url = null) => {
    buttonNextUrl = url;
}
