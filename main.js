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

let keysDown= {};
function setupKeyboardListener() {
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
        console.log("키다운객체에 들어간 값은?", keysDown);
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode]
        console.log("버튼 클릭후", keysDown);
    });
}

function update() {
    if(39 in keysDown){
        spaceshipX += 5; //우주선의 속도
    } //right
    if(37 in keysDown){
        spaceshipX -= 5;
    } //left

    if(spaceshipX <= 0){
        spaceshipX=0;
    }
    
    if(spaceshipX >= canvas.width - 64) {
        spaceshipX = canvas.width - 64;
    }
    // 우주선의 좌표값이 무한대로 업데이트가 되는게 아닌! 경기장 안에서만 있게 하려면??

}

function render() {
    ctx.drawImage(backgroudImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY); 
}

function main(){
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();