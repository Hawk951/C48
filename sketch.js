var START = 1;
var PLAY = 2;
var END = 0;
var gameState =START;

var harryPotter,harryPotterImg;
var dementor,dementorImg,dementorGroup;
var hocrux,hocrux1Img,hocrux2Img,hocrux3Img,
    hocrux4Img,hocrux5Img,hocrux6Img,hocruxGroup;
var gameOver,gameOverImg,restart,restartImg;

var castleImg,castleMusic,forestImg,forest;

var invisibleBlock1,invisibleBlock2;

var score = 0;

function preload(){

  //loading images and sounds
  castleMusic = loadSound("harry.mp3");
  
  harryPotterImg = loadImage("harry potter.png");
  dementorImg = loadImage("dementors.png");
  hocrux1Img = loadImage("diadem.png");
  hocrux2Img = loadImage("cup.png");
  hocrux3Img = loadImage("locket.png");
  hocrux4Img = loadImage("snake.png");
  hocrux5Img = loadImage("ring.png");
  hocrux6Img = loadImage("tom riddle's diary.png");
  gameOverImg = loadImage("game over.png");
  restartImg = loadImage("restart.png");
  castleImg = loadImage("hogwarts image.jpg");
  forestImg = loadImage("forbidden forest.jpg");
    
   dementorGroup = new Group();
  hocruxGroup = new Group();

}

function setup(){
  createCanvas(600,400);
    
  //creating sprites for forest,harryPotter,gameOver,restart
  forest = createSprite(300,200);
  forest.addImage("forest",forestImg);
  forest.velocityX = -(4+score/2);
  forest.scale = 1.5;
  
  harryPotter = createSprite(50,200,20,20);
  harryPotter.addImage("harryPotter",harryPotterImg);
  harryPotter.scale = 0.4;
  
  gameOver = createSprite(280,200,20,20);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.6;
  
  restart = createSprite(300,240,20,20);
  restart.addImage("restart",restartImg);
  restart.scale = 0.3;
  
  
  invisibleBlock1 = createSprite(300,2,1000,2);
  invisibleBlock2 = createSprite(300,398,1000,2);
  
  castleMusic.loop();
}

function draw(){
  
  if (gameState === START)
  {
    background(castleImg);
    
        forest.visible = false;
    gameOver.visible = false;
    restart.visible = false;
    harryPotter.visible = false;
    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    
    textSize(20);
    fill("lightgreen")
    text("Help Save Harry Potter From The Dementors", 140,200);     
    text("And Collect The Hocruxes",200,240);
    text("Use The Arrow Keys To Move Harry",170,280);
    text("Press the Spacebar To Start",200,320);
    text("click 'r' to restart the game",175,365)
    
    if(keyDown("space"))
    {
      gameState = PLAY;
    }
  }
  if(gameState === PLAY)
  {

    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    
        forest.visible = true;
    
        forest.velocityX = -(4+score/5);
    
        if(forest.x < 50)
    {
      forest.x = 300;
    }
    
     harryPotter.visible = true;
      
    spawnDementor();
    spawnHocruxes();
    
    harryPotter.bounceOff(invisibleBlock1);
    harryPotter.bounceOff(invisibleBlock2);
    
    if(keyDown("up_arrow"))
    {
      harryPotter.velocityY = -4;
    }
    
     if(keyDown("down_arrow"))
    {
      harryPotter.velocityY = 4;
    }
    
    //points
    if (hocruxGroup.isTouching(harryPotter))
    {
      score = score+1;
      hocruxGroup.destroyEach();
    }
    
        if (dementorGroup.isTouching(harryPotter))
    {
      gameState = END;
    }
  }
  
  if(gameState === END)
  {
    invisibleBlock1.visible = false;
    invisibleBlock2.visible = false;
    
    hocruxGroup.setVelocityXEach(0);
    dementorGroup.setVelocityXEach(0);
    
    dementorGroup.setLifetimeEach(-1);
    hocruxGroup.setLifetimeEach(-1);
    
    forest.velocityX = 0;
    harryPotter.velocityY  = 0;
        
    gameOver.visible = true;
    restart.visible = true    
    
  }
  
  if(keyDown("R"))
    {
      reset();
    }
  
    drawSprites();
  
  textSize(20);
  fill("white");
  text ("Hocruxes = "+score,100,50);
}

function reset()
{
   dementorGroup.destroyEach();
  hocruxGroup.destroyEach(); 
 
  gameState = START;
    score = 0;

}

function spawnDementor()
{
  if(frameCount%260===0)
  {
      var dementor = createSprite(400,250,20,20);
    dementor.addImage("dementor",dementorImg);
    dementor.scale = 0.7;
    dementor.velocityX = -(4 + score/5);
    dementor.lifetime = 400;
    dementorGroup.add(dementor);
  }
}
function spawnHocruxes()
{
  if(frameCount%300===0)
  {
    
    var hocrux = createSprite(400,250,20,20);
    
    hocrux.velocityX = -(4 + score/5);  
   
    hocrux.scale = 0.1; 
    
    var rand = Math.round(random(1,6));
    switch(rand)
    {
       case 1: hocrux.addImage(hocrux1Img);
              break;

       case 2: hocrux.addImage(hocrux2Img);
              break;   

       case 3: hocrux.addImage(hocrux3Img);
              break;

       case 4: hocrux.addImage(hocrux4Img);
              break; 

       case 5: hocrux.addImage(hocrux5Img);
              break; 

       case 6: hocrux.addImage(hocrux6Img);
              break;       
    }
    
    hocrux.lifetime = 400;
    hocruxGroup.add(hocrux);
  }
}