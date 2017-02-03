angular.module('myRecipes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '../angular/listing/listing.template.html',
			controller: 'MainController',
			controllerAs: 'vm'
		})
		.when('/recipe/:id', {
			templateUrl: '../angular/detail/detail.template.html',
			controller: 'RecipeController',
			controllerAs: 'vm'
		})
		.when('/register', {
			templateUrl: '../angular/register/register.template.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);