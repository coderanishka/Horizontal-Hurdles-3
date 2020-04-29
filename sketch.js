var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var track, runner1_img, runner2_img, runner3_img, runner4_img;

function preload(){
  track = loadImage("images/track.jpg");
  ground = loadImage("images/ground.png");
  runner1jump = loadImage("images/runner1jump.png");
  runner2jump = loadImage("images/runner2jump.png");
  runner3jump = loadImage("images/runner3jump.png");
  runner4jump = loadImage("images/runner4jump.png");
  runner1_img = loadAnimation("images/runner1.1.png","images/runner1.2.png","images/runner1.3.png");
  runner2_img = loadAnimation("images/runner2.1.png","images/runner2.2.png","images/runner2.3.png");
  runner3_img = loadAnimation("images/runner3.1.png","images/runner3.2.png","images/runner3.3.png");
  runner4_img = loadAnimation("images/runner4.1.png","images/runner4.2.png","images/runner4.3.png");

}

function setup(){
  canvas = createCanvas(displayWidth + 20, displayHeight+30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  
  spawnHurdles(250);
  spawnHurdles(350);
  spawnHurdles(450);
  spawnHurdles(550);
 
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

function spawnHurdles(y){
  for (var i = 1500; i<4500; i+=500){
    hurdle = createSprite(i,y,30,70);
  }
}
