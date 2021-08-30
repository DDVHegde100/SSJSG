var world, engine;
var player, sword;
var enemy, sun;
var backgroundImg;
var ground;
var playerImg;
var cloud, cloudImg;
var obstacle, obstacleImg;
var platform;
var invisibleGround;
var invisibleGroundGroup;
var riverImg, river;
var obstacleGroup;
var cloudsGroup;
var gameState = "PLAY";
var jumpSound,jump ,music,gameOverSound; 
var score=0;
function preload() {
    backgroundImg = loadImage("Forest.jpg");
    playerImg = loadImage("Imported piskel (3).gif");
    cloudImg = loadImage("580b585b2edbce24c47b263e.png");
    obstacleImg = loadImage("Imported piskel (2).gif");
    riverImg = loadImage("Intro_Image.gif");
    jumpSound=loadSound("maro-jump-sound-effect-1 (1).mp3");
    music=loadSound("HVj6CjP61oDxGDcog1tAzb8oNzJIJ2o2bZTDiH5L.mp3")
    gameOverSound=loadSound("mixkit-arcade-retro-game-over-213.wav");
}

function setup() {
  createCanvas(3000, 800);
    music.play()
    player = createSprite(300, 400, 80, 80);
    player.addImage("player", playerImg);

    ground = createSprite(1500, 650, 3000, 20);

    platform = createSprite(300, 550, 80, 10);
    platform.lifetime = 240;
    river = createSprite(1500, 700, 3000, 20);

    obstacleGroup = new Group();
    cloudsGroup = new Group();
    invisibleGroundGroup = new Group();
  
    player.setCollider("rectangle", 0, 0, 40, player.height);
    player.debug = true;
    ground.visible=false;
    river.visible=false;
}

function draw() {
   background(backgroundImg);
   fill(135,206,235); 
   rect(0,600,width,200);
  
//camera.position.x=displayWidth;
    if (gameState === "PLAY") {
      
      if (keyDown("space")) {
        player.velocityY = -10;
        jumpSound.play();
      }
      
      if (river.x < 0) {
        river.x = river.width / 2;
      }
      
  textSize(40)
  text("Score: "+score, 20, 50);
  fill("white");
    score=score +Math.round(frameCount/240);

    player.velocityY = player.velocityY + 1;
    river.velocityX = -10;
      
    if (obstacleGroup.isTouching(player)) {
      player.velocityY = -10
    }
      
    spawnCloud();
    spawnObstacles();
    player.collide(platform);

    //invisibleGround.visible=false;

    if (keyDown("A")) {
      player.x = player.x - 3;
    }
      
    if (keyDown("D")) {
      player.x = player.x + 3;
    }
      
    if (player.isTouching(river)) {
      gameState = "END"
      gameOverSound.play();
    }
      
  } 
      else if (gameState === "END") {
      obstacleGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      invisibleGroundGroup.setVelocityXEach(0);
        
      obstacleGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
        
      river.velocityX = 0;
      textSize(40);
      fill("red")
      text("GAME OVER", 300, 400);
  }
  drawSprites();

}

function spawnCloud() {
    if (frameCount % 60 === 0) {
      cloud = createSprite(2500, 450, 40, 10);
      cloud.y = Math.round(random(150, 350));
      cloud.addImage("clouds", cloudImg);
      cloud.scale = 0.1;
      cloud.velocityX = -6;

    //assign lifetime to the variable
    cloud.lifetime = 500;

    cloudsGroup.add(cloud);
    //adding cloud to the group
    //cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(1500, 610, 10, 40);
    invisibleGround = createSprite(1500, 580, 68, 10);
    
    obstacle.x = invisibleGround.x;
    invisibleGroundGroup.add(invisibleGround);
    obstacle.addImage("obstacle", obstacleImg);
    obstacle.velocityX = -6;
    invisibleGround.velocityX = -6;
    //player.collide(obstacle);
    //obstacle.x = Math.round(random(50,100));
    //generate random obstacles
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;

    //add each obstacle to the group
    //obstaclesGroup.add(obstacle);
    obstacleGroup.add(obstacle)
  }
}