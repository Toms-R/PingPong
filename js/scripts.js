// Canvas.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background_img = new Image();
background_img.src = "assets/background.jpg";
const paddleWidth = 100;
const paddleHeight = 10;
const paddleMargin = 10;
const paddleMargin2 = 380;
const ballRadius = 7;
let userScore = 0;
let user2Score = 0;

// Player 1 paddle
const paddle = {
    x: canvas.width / 2 - paddleWidth / 2,
    y: canvas.height - paddleHeight - paddleMargin,
    width: paddleWidth,
    height: paddleHeight,
    dx: 5
}

// Player 2 paddle
const paddle2 = {
        x: canvas.width / 2 - paddleWidth / 2,
        y: canvas.height - paddleHeight - paddleMargin2,
        width: paddleWidth,
        height: paddleHeight,
        dx: 5
    }
    // Draw both paddles
function drawPaddle() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawPaddlePlayer2() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

// First player controls.

let leftArrow = false;
let rightArrow = false;

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        leftArrow = true;
    } else if (event.keyCode == 39) {
        rightArrow = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 37) {
        leftArrow = false;
    } else if (event.keyCode == 39) {
        rightArrow = false;
    }
});

function movePaddle() {
    if (rightArrow && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;
    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// Second player controls.

let aButton = false;
let dButton = false;

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 65) {
        aButton = true;
        console.log('a button pressed');
    } else if (event.keyCode == 68) {
        dButton = true;
        console.log('d button pressed');
    }
});

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 65) {
        aButton = false;
    } else if (event.keyCode == 68) {
        dButton = false;
    }
});

function movePaddle2() {
    if (dButton && paddle2.x + paddle2.width < canvas.width) {
        paddle2.x += paddle2.dx;
    } else if (aButton && paddle2.x > 0) {
        paddle2.x -= paddle2.dx;
    }
}
// Ball
const ball = {
        x: canvas.width / 2,
        y: paddle.y - ballRadius,
        radius: ballRadius,
        speed: 7,
        dx: 3,
        dy: -3
    }
    // Ball draw
function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();

    ctx.closePath();
}

// Ball moving
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//Ball with wall collision
function ballWithWallCol() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        //ball.dy = -ball.dy;
        userScore += 1;
        console.log(userScore);
        resetBall();
    }
    if (ball.y + ball.radius > canvas.height) {
        user2Score += 1;
        console.log(user2Score);
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}
// Collision with player 1 paddle.
function ballWithPaddleCol() {
    if (ball.y > paddle.y && ball.y + paddle.height && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {

        let colissionPoint = ball.x - (paddle.x + paddle.width / 2);
        colissionPoint = colissionPoint / (paddle.width / 2);
        let angle = colissionPoint * (Math.PI / 3);

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}

// Collision with player 2 paddle
function ballWithPaddle2Col() {
    if (ball.y < paddle2.y + paddle2.height && ball.y > paddle2.y && ball.x < paddle2.x + paddle2.width) {


        let colissionPoint = ball.x - (paddle2.x + paddle2.width / 2);
        colissionPoint = colissionPoint / (paddle2.width / 2);
        let angle = colissionPoint * (Math.PI / 3);
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = +ball.speed * Math.cos(angle);
    }
}
// draw player 1 score
function drawScore() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(userScore, 300, 350);
}

// draw  player 2 score
function drawScore2() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(user2Score, 300, 70);
}




function draw() {
    drawPaddle();
    drawPaddlePlayer2()
    drawBall();
};

function update() {
    movePaddle();
    movePaddle2()
    moveBall();
    ballWithWallCol();
    ballWithPaddleCol();
    ballWithPaddle2Col();
    drawScore();
    drawScore2();
};

function loop() {

    ctx.drawImage(background_img, 0, 0);

    draw();

    update();

    requestAnimationFrame(loop);
}
loop();