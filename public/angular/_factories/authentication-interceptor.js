angular.module('myRecipes').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window, AuthFactory){

	return {
		request: request,
		response: response,
		responseError: responseError
	};


	function request(config) {
		// If the config has headers, use them
		config.headers = config.headers || {};
		// Access the token in the browser's session storage
		if($window.sessionStorage.token) {
			// if present, attach the token to the request using auth header
			config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
		}
		console.log("1");
		return config;
	}

	function response(response) {
		// check in response if user is logged in or not - use factory
		if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
			AuthFactory.isLoggedIn = true;
		}
		if(response.status === 401) {
			AuthFactory.isLoggedIn = false;
		}
		console.log("2");
		return response || $q.when(response);
	}

	function responseError(rejection) {
		if (rejection.status == 401 || rejection.status == 403) {
			delete $window.sessionStorage.token;
			AuthFactory.isLoggedIn = false;
			$location.path('/');
		}
		console.log("3");
		return $q.reject(rejection);
	}

}