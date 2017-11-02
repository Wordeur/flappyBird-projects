angular.module("myApp").factory("pipeProvider",function(){
   var object1 = {
       x : 800,
       y : 0,
       generateHeightPipe : function(){
           object1.y = Math.floor((Math.random() * 350) + 1);
            if(object1.y < 100){
               object1.y += 80;
           }
           
           if(object1.y > 340){
               object1.y -= 100;
           }
           console.log(object1.y);
       },
       movePipe : function(){
            object1.x -= 1;
       }
   };

    var object2 = {
       x : 1200,
       y : 0,
       generateHeightPipe : function(){
           object2.y = Math.floor((Math.random() * 350) + 1);
           if(object2.y < 100){
               object2.y += 80;
           }
           
           if(object2.y > 340){
               object2.y -= 100;
           }
           console.log(object1.y);
       },
       movePipe : function(){
          object2.x -= 1;
       }
   };
    
   var object = {
       pipeOne : object1,
       pipeTwo : object2
   }
   
    return object; 
});