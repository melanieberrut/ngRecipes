angular.module('myRecipes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '../angular/main/main.template.html',
			controller: 'MainController',
			controllerAs: 'vm'
		})
		.when('/recipe/:id', {
			templateUrl: '../angular/recipe/recipe.template.html',
			controller: 'RecipeController',
			controllerAs: 'vm'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);