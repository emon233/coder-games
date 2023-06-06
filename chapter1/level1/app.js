ballPositionXi = 1;
ballPositionXj = 3;
ballPositionYi = 0;
ballPositionYj = 3;

ballPositionX = groundCoordinatesArray[ballPositionXi][ballPositionXj].x;
ballPositionY = groundCoordinatesArray[ballPositionYi][ballPositionYj].y;

goalpostPositionX = groundCoordinatesArray[ballPositionXi+8][ballPositionXj].x;
goalpostPositionY = groundCoordinatesArray[ballPositionXi][ballPositionXj].y;

ball.position.set(ballPositionX, ballPositionY);
goalpost.position.set(goalpostPositionX, goalpostPositionY);

display_buttons(1);
