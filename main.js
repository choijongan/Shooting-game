//캔버스세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroudImage,bulletImage,enemyImage,gameoverImage,spaceshipImage;

// 우주선 좌표
let spaceshipX = canvas.width/2-30
let spaceshipY = canvas.height-60
function loadImage(){
 backgroudImage =new Image();
 backgroudImage.src="images/background2.png";

 bulletImage = new Image();
 bulletImage.src="images/bullet.png";

 enemyImage = new Image();
 enemyImage.src="images/enemy.png";

 gameoverImage = new Image();
 gameoverImage.src="images/gameover.png";

 spaceshipImage = new Image();
 spaceshipImage.src="images/spaceship.png";
}

function render() {
    ctx.drawImage(backgroudImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY); 
}

function main(){
    render()
    requestAnimationFrame(main);
}

loadImage();
main();