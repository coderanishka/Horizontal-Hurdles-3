class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,75,50,50);
    runner1.addAnimation("r1",runner1_img)
    runner2 = createSprite(100,175,50,50);
    runner2.addAnimation("r2", runner2_img)
    runner3 = createSprite(100,275,50,50);
    runner3.addAnimation( "r3",runner3_img)
    runner4 = createSprite(100,375,50,50);
    runner4.addAnimation( "r4",runner4_img)
    runners = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight/20+10,displayWidth*5, displayHeight);
 
      
      //index of the array
      var index = 0;

      //x and y position of the runners
      var x;
      var y = 150;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the runners a little away from each other in y direction
        y = y + 100;
        //use data form the database to display the runners in x direction
        x = displayWidth - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          fill(0,200,200);
          ellipse(x,y,80,80);
          runners[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = runners[index-1].x;
        }
       
       
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.velocityY= -4;
    }
    player.velocityY = player.velocityY+0.8;

    if(player.distance > 4600){
      gameState = 2;
    }
   
    drawSprites();
   
  }

  end(){
    console.log("Game Ended");
  }
}
