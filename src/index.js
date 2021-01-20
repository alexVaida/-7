import './index.css'
import { clearCanvas, canvas } from "./canvas"
import { drawBall } from "./ball"
import { drawBricks, collisionDetection } from "./bricks"
import { drawLives } from "./lives"
import { drawPaddle } from "./paddle"
import { drawScore } from "./score"

var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var score = 0;
var lives = 3;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

export function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

export function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

export function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function updatePaddlePosition() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}
function updateBallPosition() {
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
        console.log(dx)
    }
    if (y + dy < ballRadius) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            lives--
            if (!lives) {
                console.log('GAME OVER')
                document.location.reload()
            } else {
                x = canvas.width / 2
                y = canvas.height - 30
                dx = 3
                dy = -3
                paddleX = (canvas.width - paddleWidth) / 2
            }
        }
    }

    x += dx;
    y += dy;
}

function draw() {
	clearCanvas();

	drawBricks();
	drawBall(x, y, ballRadius);
	drawPaddle(paddleX, paddleWidth, paddleHeight);
	drawScore(score);
    drawLives(lives);
    
	collisionDetection(x, dy, y, score);

	updateBallPosition();
	updatePaddlePosition();

	requestAnimationFrame(draw);
}

draw();