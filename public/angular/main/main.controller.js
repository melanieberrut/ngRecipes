angular.module('myRecipes').controller('MainController', ['$scope', 'RecipeFactory', function($scope, RecipeFactory) {

    var vm = this;
    vm.name = 'Melanie';

    RecipeFactory.getAllRecipes().then(function(response){
    	vm.recipes = response;
    	vm.date1 = '12 Februrary 2016';
    	vm.date2 = '11 March 2016';
    	vm.date3 = '03 January 2016';
    	vm.date4 = '25 April 2016';
    });

}]);
