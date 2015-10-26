var app = angular.module('iBankmax',['ngRoute']);

 app.config(['$routeProvider', function($routeProvider){

$routeProvider
        .when('/', {
            templateUrl: '/pages/homepage.html',
            controller: 'login'
        })
        .when('/userpage', {
            templateUrl: '/pages/new.html',
            controller: 'login'
        })
        .otherwise({
            redirectTo: '/404'
        });
}]),
   app.factory('LoginService', function () {
    
    var loggedIn = false;
    
    return {
      isLoggedIn: function () {
        return loggedIn;
      },
      toggleIsLoggedIn: function (log) {
        loggedIn = log;
        console.log('toggleIsLoggedIn');
      }
    }
  });