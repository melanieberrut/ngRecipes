angular.module('myRecipes').controller('RecipeController', ['$scope', 'RecipeFactory', '$routeParams', function($scope, RecipeFactory, $routeParams) {
    var vm = this;
    var id = $routeParams.id;

    RecipeFactory.getOneRecipe(id).then(function(response){
    	vm.recipe = response;
    });

}]);
