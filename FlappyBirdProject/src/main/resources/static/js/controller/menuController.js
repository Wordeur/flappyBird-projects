angular.module('myApp').controller('menuController', ['$scope','$route','$location' , function($scope,$route,$location) {
  $scope.$route = $route;
  console.log("menu Called");
    
  $scope.isActive = function(path){
      if(path === $location.path()){
          return true;
      }else{
          return false;
      }
  }
}]);