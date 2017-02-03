angular.module('myRecipes').config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {

		// Custom interceptor
		$httpProvider.interceptors.push('AuthInterceptor');

		$routeProvider
		.when('/', {
			templateUrl: '../angular/home/home.template.html',
			access: {
				restricted: false
			}
		})
		.when('/recipes', {
			templateUrl: '../angular/listing/listing.template.html',
			controller: 'MainController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/recipes/:id', {
			templateUrl: '../angular/detail/detail.template.html',
			controller: 'RecipeController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/register', {
			templateUrl: '../angular/register/register.template.html',
			controller: 'RegisterController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.when('/profile', {
			templateUrl: '../angular/profile/profile.template.html',
			controller: 'RegisterController',
			controllerAs: 'vm',
			access: {
				restricted: true
			}
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);


// Make sure that the resticted path cannot be accessed
angular.module('myRecipes').run(['$rootScope', '$location', '$window', 'AuthFactory',
	function($rootScope, $location, $window, AuthFactory) {
		$rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
			if (nextRoute.access !== undefined && nextRoute.access.restricted &&!$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
				event.preventDefault();
				$location.path('/');
			}
		});
	}]);