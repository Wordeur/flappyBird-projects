angular.module('myApp').directive("gameCanvas", function(birdProvider,sceneProvider,pipeProvider,$location,playerProvider){
  return {
    restrict: "A",
    link: function(scope, element , attr){
      var canvas = element[0].getContext('2d');
      var image;
      var movingBird;
      var movingPipe;
        
      var xTemp = 0;
      var yTemp = 0;
      var posTemp = 0;
      var heightPipe = 100;
      
      var score = 0;
        
      function lowPositionBird(){
        clearBird();
        birdProvider.lowPositionBird();
        canvas.drawImage(image,birdProvider.x,birdProvider.y);
        checkCollision();
      }
        
      function pipeManager(){
          var res1;
          var res2;
          
          pipeProvider.pipeOne.generateHeightPipe();
          pipeProvider.pipeTwo.generateHeightPipe();
          
          movingPipe = setInterval(function(){
              if(pipeProvider.pipeOne.x == 0){
                  pipeProvider.pipeOne.x = 800;
                  console.log("Pipe one : " + pipeProvider.pipeOne.y);
                  pipeProvider.pipeOne.generateHeightPipe();
              }
              
              if(pipeProvider.pipeTwo.x == 0){
                  pipeProvider.pipeTwo.x = 800;
                  console.log("Pipe two : " + pipeProvider.pipeTwo.y);
                  pipeProvider.pipeTwo.generateHeightPipe();
              }
              if(res1 != undefined){
                  clearPipe(res1.xTemp,res1.yTemp,res1.posTemp);
              }
              
              if(res2 != undefined){
                  clearPipe(res2.xTemp,res2.yTemp,res2.posTemp);
              }
              
              pipeProvider.pipeOne.movePipe();
              res1 = drawPipeFromPos(pipeProvider.pipeOne.x, pipeProvider.pipeOne.y, heightPipe);
              
              pipeProvider.pipeTwo.movePipe();
              res2 = drawPipeFromPos(pipeProvider.pipeTwo.x , pipeProvider.pipeTwo.y , heightPipe);
              
              var data = checkCollision();
            if(data.addPoint == true){
                scope.$apply(function(){
                    birdProvider.score += 1;
                });
                
                console.log("Bird score : " + birdProvider.score);
                score += 1;
                console.log(score);
            }
          },10);  
      }
      
      function drawPipeFromPos(x,y,pos){
        canvas.fillStyle="green";
          
        var startX = x;
        var startY = y;
        var width = 45;
        var height = 20;
        
        var xTemp = x;
        var yTemp = y;
        var posTemp = pos;
           
        canvas.fillRect(startX + 15 , 0 , 15, startY);
        canvas.fillRect(startX,startY,width,height);    
        canvas.fillRect(startX,startY + pos,width,height);
        canvas.fillRect(startX + 15, (startY + pos + height) , 15, 480 - (startY + pos + height) );   
        
        return {
            xTemp: x,
            yTemp: y,
            posTemp: pos
        }
      }
      
      function clearPipe(x,y,pos){
        var startX = x;
        var startY = y;
        var width = 45;
        var height = 20;
        
        canvas.clearRect(startX + 15 , 0 , 15, startY)
        canvas.clearRect(startX,startY,width,height);
           
        canvas.clearRect(startX,startY + pos,width,height);
        canvas.clearRect(startX + 15, (startY + pos + height) , 15, 480 - (startY + pos + height));  
      }
        
      function checkCollision(){
          var isCollision = false;
          var isAddPoint = false;
          
          if(birdProvider.y > 450 || birdProvider.y < 0){
            isCollision = true;
          }
          
          if(birdProvider.x >= pipeProvider.pipeOne.x - 30 && birdProvider.x <= pipeProvider.pipeOne.x + 30 ){
              // Etablir un interval ou c'est correct.
              if((birdProvider.y >= pipeProvider.pipeOne.y && birdProvider.y <= pipeProvider.pipeOne.y + heightPipe) == false){
                  isCollision = true
              }
          }
          
          if(birdProvider.x >= pipeProvider.pipeTwo.x - 30 && birdProvider.x <= pipeProvider.pipeTwo.x + 30 ){
                  // Etablir un interval ou c'est correct.
              if((birdProvider.y >= pipeProvider.pipeTwo.y && birdProvider.y <= pipeProvider.pipeTwo.y + heightPipe) == false){
                  isCollision = true
              }
              
          }
          
          if(birdProvider.x == pipeProvider.pipeOne.x + 30 | birdProvider.x == pipeProvider.pipeTwo.x + 30){
              if(isCollision == false){
                  isAddPoint = true;
              }
          }
          
          if(isCollision === true){
              clearPipe(xTemp,yTemp,posTemp);
              clearInterval(movingBird);
              clearInterval(movingPipe);
              clearScene();
              sceneProvider.setSceneIs("end");
              runNextScene();
          }
          
          return {
              collision : isCollision,
              addPoint : isAddPoint
          }
          
      }
      
      function initPipe(){
            pipeProvider.pipeTwo.x = 1200;
            pipeProvider.pipeOne.x = 800;
      }
        
      function clearBird(){
           canvas.clearRect(birdProvider.x, birdProvider.y, 50, 37);
      }
      
      function showScore(){
          canvas.font = "20px Arial";
          canvas.fillStyle = 'black';
          
          canvas.fillText(""+birdProvider.score ,490,255); 
          canvas.fillStyle = 'green';
      }
        
      function startScene(){
          // Load image.
          var startButton = document.getElementById('startButton');
          var title = document.getElementById('title'); 
          
          canvas.drawImage(title,150,0);
          canvas.drawImage(startButton,200,100);
      }
        
      function gameScene(){
          score = 0;
          birdProvider.score = 0;
          clearScene();
          initPipe();
          birdProvider.y = 240;
          image = document.getElementById('bird'); 
          movingBird = setInterval(lowPositionBird,7); 
          
          pipeManager();
      }
        
      function endScene(){
          clearScene();
          var scorePanel = document.getElementById('scorePanel');
          //var rankingButton = document.getElementById('rankingButton');
          var startButton = document.getElementById('startButton');
          var gameOver = document.getElementById('gameOver');
          
         
          
          canvas.drawImage(gameOver, 150, -50);
          canvas.drawImage(scorePanel, 250,180);
          
          canvas.drawImage(rankingButton, 100,300);
          canvas.drawImage(startButton,300,255);
          
          showScore();
          sendResult();
         // var userName = prompt("Felicitation tu as fini le jeux avec : 10 Point entre ton nom.");
      }
        
      function clearScene(){
          canvas.clearRect(0, 0, 800,800);
      }
    
      function runNextScene(){
         var actualScene = sceneProvider.getSceneName();
         
         console.log(actualScene);
         if(actualScene == "start"){
             startScene();
         }else if(actualScene == "game"){
             gameScene();
         }else{
             endScene();
         }
      }
        
        
      function sendResult(){
           console.log("Called..");
           if(score > 0){
            	  var userName = prompt("Felicitation tu as fais un score de : " + score + ", entre ton prénom afin de vérifié si tu es dans les meilleurs joueurs du jeux !");
            	  playerProvider.addPlayer(userName, score).then(function(response){
            	  	console.log(response.data);
            	  	birdProvider.score = 0;
            	  	score = 0;
            	  });
            	  
            	  if(confirm(userName + " veut tu ouvrir le classement ? ") === true){
            	  	$location.path("/ranking");
            	  }
           }
      }
        
      function verifClick(x1,y1,x2,y2,x3,y3,x4,y4,x,y){
          var isInBorn = false;
          
          if(x >= x1 && x <= x3 && y >= y1 && y <= y2){
              isInBorn = true;
          }else{
              console.log("NO");
              console.log(x + " : " + x1);
          }
          
          return isInBorn;
      }
        
      element.bind( "keydown", function(event){
          // Gestion en fonction de quelle scene on est.
          if(event.keyCode === 32 && sceneProvider.getSceneName() == "game"){
              clearBird();
              birdProvider.upPositionBird();
              canvas.drawImage(image,birdProvider.x,birdProvider.y);
          }
      });
        
      element.bind("mousedown" , function(event){
          // KeyBoard Manager.
          //  haut gauche 243 : 383 442 : 382
          // bas gauche  241 : 454  440 : 452
          // Haut droit 357 : 385   553 : 391
          // bas droit  359 : 457   552 : 456
          var x = event.offsetX;
          var y = event.offsetY;
            console.log("Clicked : " + x + " : " + y);
          
          if(sceneProvider.getSceneName() == "start"){
            sceneProvider.setSceneIs('game');
            clearInterval(movingBird);
            runNextScene();
          }else if(sceneProvider.getSceneName() == "end"){
            if(verifClick(244,383,241,454,357,385,359,457,x,y) == true){
                console.log("Want rank");
                $location.path('/ranking');   
            }
              
            if(verifClick(442,382,440,452,553,391,552,456,x,y) == true){
              // want replay.
              console.log("Want replay");
              sceneProvider.setSceneIs('game');
              runNextScene();
            }
            console.log("Changement de page.." + $location.path());
          }else{
              console.log("Pas ici.")
          }
      })
        
     attr.$observe('sceneName', function(actualScene){
         console.log("Lancement de " + actualScene);
         clearScene();
         runNextScene();
     })
    }
  };
});