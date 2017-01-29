angular.module('myRecipes').controller('MainController', ['$scope', 'RecipeFactory', function($scope, RecipeFactory) {

    var vm = this;

    RecipeFactory.getAllRecipes().then(function(response){
    	vm.recipes = response;
    });

}]);
