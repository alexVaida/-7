
import {canvas, ctx} from "./canvas"

export function drawPaddle(paddleX, paddleWidth, paddleHeight) {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
