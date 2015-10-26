app.controller('login', ['$scope', '$http', 'LoginService', '$location', function($scope, $http, loginService, $location) {
    
    $scope.user = {};
    $scope.submitLogin = function() {
      $http.post('/userpage',
      	{
      		email:$scope.email,
      		password:$scope.password,
      		online: true
      	}
      ).then(function onSuccess(res){
      	console.log(JSON.stringify(res.data.user));
      	$location.path('/userpage');
      	// window.location.href = '/userpage'
      	loginService.toggleIsLoggedIn(res.data.user.online);
      	for(key in res.data.user){
      		$scope.user[key] = res.data.user[key];
      	}
      	console.log($scope.user);
      });
      };


    $scope.loginService = loginService;
    
    $scope.$watch('loginService.isLoggedIn()', function(newVal) {
        $scope.isLoggedIn = newVal;
    });

    $scope.submitLogout = function(userid) {
      $http.post('/',
        {
          email: $scope.user.email,
          online: false
        }
      ).then(function onSuccess(res){
        console.log(JSON.stringify(res.data.user));
        loginService.toggleIsLoggedIn(res.data.user.online);
         $scope.user = null;
      $location.path('/');
      });
    };
}]);