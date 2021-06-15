var heroimg,alienimg,bgimg,score,alienGroup,gameState,hero,starthero,border1,border2,border3,dieSound,loseSound;
var engine,world;


const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

function preload(){
    heroimg=loadImage("hero.png");
    startimg=loadImage("1.png")
    alienimg=loadImage("alien.png");
    bgimg=loadImage("space.jpeg");
    dieSound = loadSound("diecopy.mp3");
    loseSound = loadSound("jumpcopy.mp3");

    alienGroup = new Group();
    gameState=0;
}

function setup(){
    engine = Engine.create();
	world = engine.world;
    createCanvas(700,740);
    
    hero = createSprite(260,590,20,20);
    hero.visible=false;
    hero.setCollider("circle",0,0,30);
    starthero = createSprite(280,590,20,20);
    starthero.addImage(startimg);
    starthero.visible=false
    starthero.scale=0.3;
    border1 = createSprite(5,350,10,740);
    border1.shapeColor = rgb(18,19,37);
    border2 = createSprite(695,350,10,740);
    border2.shapeColor = rgb(18,19,37);
    border3 = createSprite(350,5,700,10);
    border3.shapeColor = rgb(18,19,37);
    
    score = 3;
    
    Engine.run(engine);
    
}

function draw(){
    background(bgimg);
    console.log(gameState);
    if(gameState===0){
        starthero.visible=true
        hero.visible=false;
        fill("white");
        textSize(30);
        textFont("Courier New");
        text("HELP THE ASTRONAUT DODGE THE ALIENS",35,130);
        fill("white");
        textSize(23);
        textFont("Courier New");
        text("(press *SPACE* to start)",190,350);
        textSize(18);
        textFont("Courier New");
        text("[control:- use *LEFT* & *RIGHT* to avoid aliens]",100,180);
    }
    
    if(keyDown("space") && starthero.visible===true){
        hero.addImage(heroimg);
        hero.visible=true;
        hero.scale=0.3;
        starthero.visible = false;
        gameState=1;
        
    }
    
    if(gameState===1){
        if(keyIsDown(LEFT_ARROW)){
            hero.x=hero.x-10;
        }
        
        if(keyIsDown(RIGHT_ARROW)){
            hero.x=hero.x+10;
        }
        
        spawnAliens();
        fill("white");
        textSize(30);
        textFont("Courier New");
        text("Astronaut: "+score,20,50);
    }

        if(hero.isTouching(alienGroup)){
            //loseSound.play();
            score=score-1;
        }

        if(score===0 && gameState===1){
            //dieSound.play();
            gameState=2;
        }
 
    

    if(gameState===2){
        fill("white");
        textSize(30);
        textFont("Courier New");
        text("Astronaut: "+score,20,50);
        fill("white");
        textSize(30);
        textFont("Courier New");
        text("GAME OVER",35,130);
        fill("white");
        textSize(20);
        textFont("Courier New");
        text("press *R* to restart",35,200);
        if(keyDown("R")){
            gameState=0;
            score=3;
        }
    }
    createEdgeSprites();
    hero.bounceOff(border1);
    hero.bounceOff(border2);
    drawSprites();
}   


function spawnAliens() {
    //write code here to spawn the clouds
    if (frameCount % 20 === 0) {
      var alien = createSprite(150,70,40,10);
      alien.x = Math.round(random(50,680));
      alien.addImage(alienimg);
      //alien.setCollider("circle",0,0,70);
      alien.scale = 0.15;
      alien.velocityY = 3;
      
       //assign lifetime to the variable
      alien.lifetime = 180;
      
      //add each cloud to the group
      alienGroup.add(alien);
    }
    
  }
  

