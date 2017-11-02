angular.module("myApp").factory("playerProvider",function($http, $q){
    return {
        getPlayer : function(){
            var asyncPromise = $q.defer();
            $http.get("https://flappybird-project.herokuapp.com/game/get-player").then(function(response){
                 asyncPromise.resolve(response);
            }); 
            return asyncPromise.promise;
        },
        addPlayer : function(userName , userScore){
            var player = {
                "name" : userName,
                "score" : userScore
            }
            var asyncPromise = $q.defer();
            $http.post("https://flappybird-project.herokuapp.com/game/add-player", player).then(function(response){
                 asyncPromise.resolve(response);
            }); 
            return asyncPromise.promise;
        }
    }
})