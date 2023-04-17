var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg, restartImg


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(600, 200);

  //Crear sprite de Trex
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  //Crear sprite de suelo
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  // Crear Gameover
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  // crear Restart
  restart = createSprite(300, 140);
  restart.addImage(restartImg)

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  ////Crear suelo invisible
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  //crear grupos de obstáculos y nubes 
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  score = 0;
}

function draw() {
  background(180);
  text("Puntuación: " + score, 500, 50);

  if (gameState === PLAY) {
    //mover el suelo
    ground.velocityX = -4;
    score = score + Math.round(frameCount / 60);
    //Movimiento suelo
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //Salto t rex
    if (keyDown("space") && trex.y >= 150) {
      trex.velocityY = -13;
    }

    trex.velocityY = trex.velocityY + 0.8

    //aparecer las nubes
    spawnClouds();

    //aparecer los obstáculos en el suelo
    spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }
  }

  else if (gameState === END) {
    //detener el suelo
    ground.velocityX = 0;
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

  }

  trex.collide(invisibleGround);


  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(400, 165, 10, 40);
    obstacle.velocityX = -6;


    //generar obstáculos al azar
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;
      default: break;
    }

    //asignar escala y lifetime al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  }
}




function spawnClouds() {
  //escribir aquí el código para aparecer las nubes 
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10, 60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //asignar lifetime a la variable
    cloud.lifetime = 200;

    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //agregar cada nube al grupo
    cloudsGroup.add(cloud);
  }

}
