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
		.otherwise({
			redirectTo: '/'
		});
	}]);