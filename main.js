//캔버스세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroudImage,bulletImage,enemyImage,gameoverImage,spaceshipImage;
let gameOver=false // true이면 게임이 끝남, false이면 게임이 안끝남.
let score = 0;
// 우주선 좌표
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;

let bulletList = [] //총알들을 저장하는 리스트
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init=function() {
        this.x = spaceshipX + 18;
        this.y = spaceshipY;
        this.alive = true; //true면 살아있는 총알 false면 죽은 총알
        bulletList.push(this);
    };
 this.update = function() {
    this.y -= 7;
 };

this.checkHit = function() {
    // 총알.y <= 적군.y And
    // 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
    for(let i=0; i<enemyList.length;i++){
        if(
            this.y <=enemyList[i].y && 
            this.x>=enemyList[i].x && 
            this.x<=enemyList[i].x+50
            ){
           // 총알이 죽게됨 적군의 우주선이 없어짐, 점수 획득
            score++;
            this.alive = false //죽은 총알
            enemyList.splice(i,1);
         }
        }
    };

}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum;
}

let enemyList = [];
function Enemy() {
    this.x=0;
    this.y=0;
    this.init = function() {
        this.y= 0;
        this.x=generateRandomValue(0, canvas.width-32);
        enemyList.push(this);
    };
this.update=function(){
    this.y += 2; // 적군의 속도 조절

    if(this.y >= canvas.height-32){
        gameOver = true;
        console.log("gameover");
    }
 };
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
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }


    for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
    }
}

function render() {
    ctx.drawImage(backgroudImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY); 
    ctx.fillText(`score:${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px arial";
    for(let i=0;i<bulletList.length;i++){
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
        } 
    }

    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
}

function main(){
        if(!gameOver) {
        update(); //좌표값을 업데이트하고
        render(); //그려주고
        requestAnimationFrame(main);
    }else{
        ctx.drawImage(gameoverImage, 10, 100, 380, 380);
    }  
}

loadImage();
setupKeyboardListener();
createEnemy();
main();