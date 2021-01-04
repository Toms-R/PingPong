// Canvas.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background_img = new Image();
background_img.src = "assets/background.jpg";
const paddleWidth = 100;
const paddleHeight = 10;
const paddleMargin = 10;
const ballRadius = 7;
let userScore = 0;


const paddle = {
    x: canvas.width / 2 - paddleWidth / 2,
    y: canvas.height - paddleHeight - paddleMargin,
    width: paddleWidth,
    height: paddleHeight,
    dx: 5
}

function drawPaddle() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}



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

const ball = {
    x: canvas.width / 2,
    y: paddle.y - ballRadius,
    radius: ballRadius,
    speed: 7,
    dx: 3,
    dy: -3
}

function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();

    ctx.closePath();
}


function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function ballWithWallCol() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
    userScore = 0;
}

function ballWithPaddleCol() {
    if (ball.y > paddle.y && ball.y + paddle.height && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {

        let colissionPoint = ball.x - (paddle.x + paddle.width / 2);
        colissionPoint = colissionPoint / (paddle.width / 2);
        let angle = colissionPoint * (Math.PI / 3);

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);

        userScore += 1;
        console.log(userScore);
    }
}

function drawScore() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(userScore, 300, 50);
}


function draw() {
    drawPaddle();

    drawBall();
};

function update() {
    movePaddle();
    moveBall();
    ballWithWallCol();
    ballWithPaddleCol();
    drawScore();
};

function loop() {

    ctx.drawImage(background_img, 0, 0);

    draw();

    update();

    requestAnimationFrame(loop);
}
loop();