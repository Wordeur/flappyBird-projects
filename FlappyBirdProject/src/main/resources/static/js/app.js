var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/game.html",
        controller : "gameController",
        activeTab : "game"
    })
    .when("/game",{
        templateUrl : "view/game.html",
        controller : "gameController",
        activeTab : "game"
    })
    .when("/ranking", {
        templateUrl : "view/ranking.html",
        controller : "rankingController",
        activeTab : "ranking"
    }).
    otherwise({
        redirectTo: '/'
    });
});
