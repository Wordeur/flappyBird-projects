angular.module('myApp').controller('rankingController', ['$scope','$route', 'playerProvider' , function($scope,$route,playerProvider) {
    $scope.$route = $route;
    console.log("ranking Called");
    
    $scope.loadPlayerData = function(){
        playerProvider.getPlayer().then(function(response){
            if(response.status === 200){
            		$scope.dataPlayers = response.data;
                console.log(response.data);
            }else{
                console.lof(response.data);
            }
        })
    }
}]);