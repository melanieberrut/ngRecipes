angular.module('myRecipes').controller('MainController', ['RecipeFactory', function( RecipeFactory) {

    var vm = this;
    vm.name = 'Melanie';

    vm.urlDetailPreffixer = '/recipes/';

    RecipeFactory.getAllRecipes().then(function(response){
    	vm.recipes = response.data;
    	vm.date1 = '12 Februrary 2016';
    	vm.date2 = '11 March 2016';
    	vm.date3 = '03 January 2016';
    	vm.date4 = '25 April 2016';
    });

}]);
