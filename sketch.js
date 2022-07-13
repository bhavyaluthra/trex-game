var trex, trex_running, edges;
var groundImage;
var ground,clouds
var the_obstacles,the_clouds
var start = 1
var over = 0
var game_states = start
var trex_stopping
var game_over,restart,game_over_image,restart_image
var checkpoint_sound,die_sound,jump_sound
var score=0

function preload(){

  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_stopping = loadAnimation("trex1.png")
  game_over_image = loadImage("gameOver.png")
  restart_image= loadImage("restart.png")
  groundImage = loadImage("ground2.png")
  cloudsimages = loadImage("cloud.png")
  obstacles1 = loadImage("obstacle1.png")
  obstacles2 = loadImage("obstacle2.png")
  obstacles3 = loadImage("obstacle3.png")
  obstacles4 = loadImage("obstacle4.png")
  obstacles5 = loadImage("obstacle5.png")
  obstacles6 = loadImage("obstacle6.png")
  checkpoint_sound = loadSound("checkpoint.mp3")
  die_sound = loadSound("die.mp3")
  jump_sound = loadSound("jump.mp3")

}

function setup(){

    createCanvas(windowWidth,windowHeight);
    
    // creating trex
    trex = createSprite(50,windowHeight-50,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("Tstopper",trex_stopping)
    trex.scale = 0.5;
    trex.x = 50

    ground = createSprite(windowWidth/2,windowHeight-10,windowWidth+20,10)
    ground.addImage("ground",groundImage)

    ground2 = createSprite(windowWidth/2,windowHeight-15,windowWidth,10)
    ground2.visible = false
    the_clouds = createGroup()
    the_obstacles = createGroup()
    trex.setCollider("circle",0,0,50)
    //trex.debug = true
    game_over = createSprite(windowWidth/2,windowHeight/2,30,40)
    game_over.addImage(game_over_image)
    restart = createSprite(windowWidth/2,windowHeight/2+30,10,20)
    restart.addImage(restart_image)
    restart.scale = 0.5
    restart.visible = false
    game_over.visible = false
}


function draw(){

   //set background color 
  background("white");
  text("score=" + score,500,50)
  if(game_states === start){
    //jump when space key is pressed
    if((keyDown("space") || touches.lenght>0)&& trex.y>=windowHeight-150){
      trex.velocityY = -10;
      jump_sound.play()
      score=score+1
      touches=[]
    }
    //score=score+ Math.round (frameCount/60)
     // this is to make the trex come down after one click
     trex.velocityY = trex.velocityY + 0.5;
     ground.velocityX = -4  
    // to make a infinite ground
    if (ground.x <0) {
     ground.x = ground.width/2
    }
    spawnClouds()
    spawn_obstacles()
    if (the_obstacles.isTouching(trex)) {
     game_states = over 
     die_sound.play()  
    }
  }
  else if(game_states === over){
    ground.velocityX = 0
   the_obstacles.setVelocityXEach(0) 
   the_clouds.setVelocityXEach(0)
   the_obstacles.setLifetimeEach(-1)
   the_clouds.setLifetimeEach(-1)
   trex.changeAnimation("Tstopper",trex_stopping)
   restart.visible = true
   game_over.visible = true 
   if(mousePressedOver(restart)){
    game_states=start
    the_obstacles.destroyEach()
    the_clouds.destroyEach()
    restart.visible = false
    game_over.visible = false
    score = 0
   }
   }  
  
  trex.collide(ground2);
  drawSprites();

 }

function spawnClouds(){
  if (frameCount%40===0) {
      
  cloud = createSprite(windowWidth+20,windowHeight-300,22,33)
  cloud.addImage(cloudsimages)
  cloud.velocityX = -5 
  cloud.y = Math.round(random(10,60))
  cloud.depth = trex.depth
  trex.depth = trex.depth+1

  cloud.lifetime = windowWidth/5
  //speed= distance/time,time =distance/speed
  the_clouds.add(cloud)

  }
}
function spawn_obstacles (){
    if (frameCount%90===0) {
      var obstacles = createSprite(windowWidth+20,windowHeight-20,20,30)
      obstacles.velocityX = -4
    no = Math.round(random(1,6))
  switch(no){
    case 1: 
     obstacles.addImage(obstacles1)
    break;

    case 2 :
      obstacles.addImage(obstacles2)
    break;

   case 3 : 
    obstacles.addImage(obstacles3)
   break;

    case 4 : 
      obstacles.addImage(obstacles4)
    break;

    case 5 : 
      obstacles.addImage(obstacles5)
    break;

    case 6 : 
      obstacles.addImage(obstacles6)
    break;

  }
  obstacles.scale = 0.5
  obstacles.lifetime = windowWidth/4
  the_obstacles.add(obstacles)
 }
}
