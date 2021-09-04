var PLAY = 1;
var END = 0;
var WIN = 0;
var gameState = PLAY;

var flying_butterfly;
var wall,wall2,wallGroup;
var flowerGroup, flowerImage;


function preload(){
  backgroundImage=loadImage("Background.jpg");
wallImage=loadImage("wall.png")
  flying_butterfly=loadAnimation("b1.png","b2.png","b3.png","b4.png","b5.png","b6.png");
  flowerImage = loadImage("flower.png");
 fcImage=loadImage("x.jpg");
}

function setup() {
  createCanvas(700,600);

  score=0;

  Butterfly=createSprite(300, 550, 50, 50);
  Butterfly.addAnimation("flying",flying_butterfly)
  Butterfly.scale=0.5;
  Butterfly.setCollider("circle",0,0,100);
 // Butterfly.debug=true
  flowerGroup = createGroup();
 
  border1=createSprite(350,5,700,10);
 
  border2=createSprite(350,600,700,10);
 // border3=createSprite(350,5,700,10);
 // border4=createSprite(350,5,700,10);

 fc=createSprite(100,100,20,20);
 fc.addImage(fcImage);
 fc.scale=0.3
 fc1=createSprite(600,500,20,20);
 fc1.addImage(fcImage);
 fc1.scale=0.3
 fc2=createSprite(30,540,20,20);
 fc2.addImage(fcImage);
 fc2.scale=0.4
 fc3=createSprite(600,100,20,20);
 fc3.addImage(fcImage);
 fc3.scale=0.4



  wall=createSprite(100,100,350,50);
  wall.addImage(wallImage);
  wall.scale=0.5
  wall.setCollider("rectangle",0,0,wall.width,100);
//  wall.debug=true;
  wall.velocityY=5;

  wall2=createSprite(600,450,100,100);
  wall2.addImage(wallImage);
  wall2.scale=0.5
  wall2.setCollider("rectangle",0,0,wall2.width,100);
 // wall2.debug=true;
  wall2.velocityY=-5;

}

function draw() {
  background(backgroundImage);  

  if(gameState===PLAY){
    fc.visible=false;
    fc1.visible=false;
    fc2.visible=false;
    fc3.visible=false;
    if(keyDown("left")){
      Butterfly.x=Butterfly.x-4
    }
      if(keyDown("right")){
      Butterfly.x=Butterfly.x+4
    }
    if(keyDown("up")){
      Butterfly.y=Butterfly.y-4
    }
      if(keyDown("down")){
      Butterfly.y=Butterfly.y+4
      }

   if(flowerGroup.isTouching(Butterfly)){
    flowerGroup.destroyEach();
    score=score+1;
   }
   if(wall.isTouching(Butterfly)){
    score=score-1;
    wall.y=100
  }
  if(wall2.isTouching(Butterfly)){
    score=score-1;
    wall2.y=100
  }
  if(score===20){
    gameState=END;
  }
  }
  if(gameState===END){
    Butterfly.visible=true;
    Butterfly.y=400;
    Butterfly.x=300;
    flowerGroup.destroyEach();

    fc.visible=true;
    fc1.visible=true;
    fc2.visible=true;
    fc3.visible=true;
 
    wall.visible=false;
    wall2.visible=false;
    border1.visible=false;
    border2.visible=false;
    background("black") 
     textSize(40);
    fill("yellow")
    text("🏆You won🏆",200,300);

  }


  wall2.bounceOff(border2)
  wall2.bounceOff(border1)
  wall.bounceOff(border2)
  wall.bounceOff(border1)


  Butterfly.display();
  
  drawSprites();
  if (frameCount % 90 === 0) {
    var flower = createSprite(600,120,40,10);
    flower.x = Math.round(random(80,620));
    flower.addImage(flowerImage);
    flower.scale = 0.5;
    flower.velocityY = 5;
    flower.setCollider("circle",0,0,50)
 //   flower.debug=true
    
     //assign lifetime to the variable
    flower.lifetime = 200;
    flowerGroup.add(flower);
  }
  fill("red");
  textSize(20)
  text("Coins:🟡 "+ score, 200,50);
  fill("yellow");
  text("get the 20 coins🟡 to WIN ",150,70);
  
}
