angular.module('myApp').controller('gameController', ['$scope','$route','birdProvider','sceneProvider', function($scope ,$route ,birdProvider ,sceneProvider) {
    
    $scope.name = birdProvider.name;
    sceneProvider.setSceneIs('start');
    $scope.sceneName = sceneProvider.getSceneName();
    $scope.score = birdProvider.score;

    $scope.changeName = function(){
        sceneProvider.setSceneIs('start');
        $scope.sceneName = sceneProvider.getSceneName();
    }
    
    $scope.alertFn = function(element) {
       console.log("KEY PRESSED" + element.keyCode);
    }
    
   var t = setInterval(function(){  
       $scope.$apply(function(){  
           $scope.score = birdProvider.score;
       });
   },300);
    
}]);