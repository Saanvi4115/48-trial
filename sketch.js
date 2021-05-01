var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameState = 1;
var gameState = 2;

var score = 0;

var town, townImage;

var tent, tentImage;

var boy, boyStanding, boy_walking;

var paper, paperBall;

function preload(){
  townImage = loadImage("road.png");
  car1Image = loadImage("car.png");
  car2Image = loadImage("car2.png");

  boyStanding = loadImage("boyStatic.png");
  boy_walking = loadAnimation("walking1.png","walking2.png","walking3.png","walking4.png",
                          "walking5.png","walking6.png","walking7.png","walking8.png");
  boy_died = loadImage("rip.png");

  paperBall = loadImage("paper.png")

  question1 = loadImage("ques1.png");
  question2 = loadImage("ques2.png");

  tentImage = loadImage("tent.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 100, displayHeight-150);

  town = createSprite(700,200,700,20);
  town.addImage("town1", townImage);
  town.scale=2

  boy = createSprite(100,250,200,200);
  boy.addAnimation("walk", boy_walking);
  boy.addImage("stand", boyStanding);

  paper = createSprite(180,220,50,50)
  paper.addImage("crushedPaper",paperBall);
  paper.scale = 0.05

  carsGroup = new Group();

  score= 0;
}

function draw() {
 
  background(255);
  text("Score: "+ score, 500,50);

  boy.addImage("stand", boyStanding)
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if(keyIsDown(UP_ARROW) ) {
      boy.y= boy.y - 5;
      boy.changeAnimation("walk", boy_walking);
    }
    if(keyIsDown(DOWN_ARROW) ) {
      boy.y= boy.y + 5; 
      boy.changeAnimation("walk", boy_walking);
    }
    if(keyIsDown(LEFT_ARROW) ) {
      boy.x = boy.x - 5;
      boy.changeAnimation("walk", boy_walking);
    }
    if(keyIsDown(RIGHT_ARROW) ) {
      boy.x = boy.x + 5;
      boy.changeAnimation("walk", boy_walking);
    }
  
    if (town.x < 0){
      town.x = town.width/2;
    }
  
    if(carsGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
  
    town.velocityX = 0;
    boy.velocityY = 0;
    carsGroup.setVelocityXEach(0);
    
    boy.changeAnimation("collided",boy_died);
    
    carsGroup.setLifetimeEach(-1);
  }
  
  spawnCars1();
  spawnCars2();

  drawSprites();
}

function spawnCars1() {
  if(frameCount % 150 === 0) {
    var car = createSprite(1600,500,10,40);
    
    car.velocityX = -6;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: car.addImage(car1Image);
              car.scale = 0.5
              
              break;
      case 2: car.addImage(car2Image);
              car.scale = 0.3
              
              break;
      default: break;
    }
    car.lifetime = 400;
  }
}
function spawnCars2() {
  if(frameCount % 100 === 0) {
    var car = createSprite(1600,370,10,40);
    
    car.velocityX = -6;
    
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: car.addImage(car1Image);
              car.scale = 0.5
              
              break;
      case 2: car.addImage(car2Image);
              car.scale = 0.3
              
              break;
      default: break;
    }
    car.lifetime = 400;
  }
}