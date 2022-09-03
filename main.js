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
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;

let bulletList = [] //총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init=function() {
        this.x = spaceshipX+18;
        this.y = spaceshipY;

        bulletList.push(this);
    };
 this.update = function() {
    this.y -= 7;
 }
}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

function Enemy() {
    this.x=0;
    this.y=0;
    this.init = function() {
        this.y= 0;
        this.x=generateRandomValue(0, canvas.width-32);
        enemyList.push(this);
    }
}

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
    });
    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode];

        if(event.keyCode == 32) {
            createBullet(); //총알 생성

        }
    });
}

function createBullet(){
    console.log("총알생성");
    let b= new Bullet();//총알 하나 생성
    b.init();
    console.log("새로운 총알 리스트", bulletList);
}

function createEnemy() {
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
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

    // 총알의 y좌표 업데이트하는 함수 호출
    for(let i=0;i<bulletList.length;i++){
        bulletList[i].update();
    }
}

function render() {
    ctx.drawImage(backgroudImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY); 

    for(let i=0;i<bulletList.length;i++){
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
    }

    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
}

function main(){
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
createEnemy();
main();