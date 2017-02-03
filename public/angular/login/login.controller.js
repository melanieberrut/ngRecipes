angular.module('myRecipes')
	.controller('LoginController', ['$scope','$http', '$location', '$window', 'AuthFactory', 'jwtHelper',
     function($scope, $http, $location, $window, AuthFactory, jwtHelper) {

    var vm = this;

    // helper method
    vm.isLoggedIn = function() {
    	if (AuthFactory.isLoggedIn) {
    		return true;
    	} else {
    		return false;
    	}
    };

    // Login function
    vm.login = function (){
    	if(vm.username && vm.password) {
    		var user = {
				username: vm.username,
				password: vm.password
			};
			// send to api endpoint
			$http.post('/api/users/login', user).then(function(response) {
				// take the token, and store in the session storage browser
				if ( response.data.success ) {
					$window.sessionStorage.token =  response.data.token;
					AuthFactory.isLoggedIn = true;
                    // decode token
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.username;
				}

			}).catch(function(error) {
				console.log('There has been an error while logging in: ', error);
			});
    	}
    };

    // Logout function
    vm.logout = function (){
    	// update
    	AuthFactory.isLoggedIn = false;
    	// delete logged in token
    	delete $window.sessionStorage.token;
    	// redirect to homepage
    	$location.path('/');
    };

    // Navigation system
    vm.isActive = function (){
    	var currentPath = $location.path().split('/')[1];
    	return (url === currentPath ? 'active' : '');
    };

}]);
