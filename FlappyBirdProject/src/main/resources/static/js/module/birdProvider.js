angular.module("myApp").factory("birdProvider", function(){

    var object = {
        x : 390,
        y : 240,
        score : 0,
        upPositionBird : function(){
            object.y  -= 50;
        },
        lowPositionBird : function(){
            object.y += 1;
        }
    }
    
    return object;
})