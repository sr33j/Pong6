Here's the content for static/script.js:

const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;
const paddleSpeed = 8;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0) {
        resetBall();
    }

    if (ballX >= canvas.width - ballSize) {
        resetBall();
    }

    if (ballX <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX >= canvas.width - paddleWidth - ballSize && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function movePaddles(event) {
    const key = event.keyCode;

    if (key === 87 && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    }
    if (key === 83 && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed;
    }
    if (key === 38 && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    }
    if (key === 40 && rightPaddleY < canvas.height - paddleHeight) {
        rightPaddleY += paddleSpeed;
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawRect(0, leftPaddleY, paddleWidth, paddleHeight, "#fff");
    drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, "#fff");
    drawCircle(ballX, ballY, ballSize, "#fff");
}

document.addEventListener("keydown", movePaddles);

function gameLoop() {
    moveBall();
    render();
}

setInterval(gameLoop, 1000 / 60);