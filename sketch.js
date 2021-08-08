var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var basket,basketImg;
var bg,bg1;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	bg1=loadImage("Bg.png");
	basketImg=loadImage("basket.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	bg = createSprite(440,350,800,700);
	bg.visible=false;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(250, 150, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.89

	groundSprite=createSprite(width/2, height-35, 200,10);
	groundSprite.shapeColor=color(255)
	groundSprite.visible=false;


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 150 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	basket = createSprite(width/2,height-30,20,10);
	basket.addImage(basketImg);
	basket.scale=0.55;
	basket.depth=packageSprite.depth-1;

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(random(["blue","darkblue"]));
  packageSprite.x= helicopterSprite.x 
  packageSprite.y= packageBody.position.y 


  if(keyDown(RIGHT_ARROW)){
	  helicopterSprite.x = helicopterSprite.x+3;
  }
  else if(keyDown(LEFT_ARROW)){
	  helicopterSprite.x = helicopterSprite.x-3;
  }

  drawSprites();

  if(packageSprite.isTouching(basket)){
	textSize(50);
    fill("black");
    stroke("white");
    textFont("ariel");
    textAlign("center");
    text("WE DID IT !",width/2,300);
  }

}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    // Look at the hints in the document and understand how to make the package body fall only on press of the Down arrow key.

	bg.addImage(bg1);
	bg.visible=true;

    Matter.Body.setStatic(packageBody,false);
	packageSprite.scale=0.3;

	textSize(50);
    fill("red");
    stroke("black");
    textFont("ariel");
    textAlign("center");
    text("WE DID IT!",width/2,200);

  }
}



