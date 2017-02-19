angular.module('myRecipes').config(['$stateProvider', '$locationProvider',
	function($stateProvider, $locationProvider) {

		// Custom interceptor
		// $httpProvider.interceptors.push('AuthInterceptor');

		$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '../angular/home/home.template.html',
			access: {
				restricted: false
			}
		})
		.state('/recipes', {
			url: '/recipes',
			templateUrl: '../angular/listing/listing.template.html',
			controller: 'MainController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.state('/recipes/:id', {
			url: '/recipes/{id}',
			templateUrl: '../angular/detail/detail.template.html',
			controller: 'RecipeController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.state('/register', {
			url: '/register',
			templateUrl: '../angular/register/register.template.html',
			controller: 'RegisterController',
			controllerAs: 'vm',
			access: {
				restricted: false
			}
		})
		.state('/profile', {
			url: '/profile',
			templateUrl: '../angular/profile/profile.template.html',
			controller: 'RegisterController',
			controllerAs: 'vm',
			access: {
				restricted: true
			}
		});

		$locationProvider.html5Mode(true);

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