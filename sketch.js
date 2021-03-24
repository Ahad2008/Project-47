var ground, player, playerimg, playerP, P1, P2, coin, coinimg, platformGroup, invisp1, invisp2, coinGroup, collectSound;
var score = 0;
var gameState = play;

function preload(){
playerimg = loadImage("man.png");
coinimg = loadImage("coin.png");
collectSound = loadSound("collect.mp3")
}

function setup(){
var canvas = createCanvas(1000, 500); 

ground = createSprite(500, 490, 1000, 20);
ground.shapeColor = "red";

playerP = createSprite(100, 250, 100, 20);
playerP.shapeColor = "yellow";

player = createSprite(100, 205, 20, 70);
player.shapeColor = "lime";
player.addImage("running", playerimg);
player.scale = 0.3;

invisplatformGroup = new Group();
coinGroup = new Group();

}

function draw(){
background("black");
if (gameState === play) {

if(keyDown("SPACE")){
    player.velocityY = - 12;
    playerP.destroy();
}
player.velocityY = player.velocityY + 1;
player.collide(playerP);
player.collide(ground);
player.depth = player.depth + 1;
if(keyDown("RIGHT_ARROW")){
    player.x = player.x + 3;
}

if (invisplatformGroup.isTouching(player)) {
    player.velocityY = 0;
}

if (player.x > 1000) {
    player.x = 100;
}

if(coinGroup.isTouching(player)){
    coinGroup.destroyEach();
    score = score + 1;
    collectSound.play();
}

platform();
scoin();

drawSprites();
}

fill("white");
textSize(20);
text("Score: " + score, 900, 50);
}

function platform(){
if(frameCount % 100 === 0){
    P1 = createSprite(1200, 150, 150, 20);
    P1.shapeColor = "blue";
    P1.velocityX = -5;

    P2 = createSprite(1200, 350, 150, 20);
    P2.shapeColor = "orange";
    P2.velocityX = -5;

    invisp1 = createSprite(1200, 140, 150, 20);
    invisp1.visible = false;    
    invisp1.velocityX = -5;
    
    invisp2 = createSprite(1200, 340, 150, 20);
    invisp2.visible = false;
    invisp2.velocityX = -5;

    var rand = Math.round(random(1,2));
    if(rand === 1){
        P1.y = 150;
        P2.y = 350;
    }
    else if (rand === 2){
        P1.y = 350;
        P2.y = 150;
    }

    invisplatformGroup.add(invisp1);
    invisplatformGroup.add(invisp2);
}
}

function scoin(){
    if(frameCount % 100 === 0){
        coin = createSprite(1200, 150, 50, 50);
        coin.addImage("gold", coinimg);
        coin.scale = 0.1;
        coin.velocityX = -5;
    
        var rand = Math.round(random(1,2));
        if(rand === 1){
            coin.y = 110;
        }
        else if (rand === 2){
            coin.y = 310;
        }
        coinGroup.add(coin);
    }
}