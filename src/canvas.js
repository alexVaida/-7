
export var canvas = document.getElementById("myCanvas");
export var ctx = canvas.getContext("2d");

export function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}