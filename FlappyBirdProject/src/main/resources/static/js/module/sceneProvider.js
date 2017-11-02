angular.module("myApp").factory("sceneProvider", function(){
    var object = {
        isStart : true,
        isGame : false,
        isEnd : false,
        setSceneIs : function(name){
        if(name === "start"){
            object.isStart = true;
            object.isGame = false;
            object.isEnd = false;
        }else if(name === "game"){
            object.isStart = false;
            object.isGame = true;
            object.isEnd = false;
        }else{
            object.isStart = false;
            object.isGame = false;
            object.isEnd = true;
        }  
      },
        
      getSceneName : function(){
          var name = "";
          if(object.isStart == true){
              name = "start";
          }else if(object.isGame == true){
              name = "game";
          }else if(object.isEnd == true){
              name = "end";
          }
          return name;
      }   
    };
    
    return object;
})