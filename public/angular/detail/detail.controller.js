angular.module('myRecipes').controller('RecipeController', ['$scope', 'RecipeFactory', '$routeParams', function($scope, RecipeFactory, $routeParams) {
    var vm = this;
    var id = $routeParams.id;

    RecipeFactory.getOneRecipe(id).then(function(response){
    	vm.recipe = response;
    	vm.stars = _getStarRating(vm.recipe.stars);
    	console.log("vm.recipe ", vm.recipe );
    });

    // helper function
    function _getStarRating(stars) {
    	return new Array(stars);
    }

    vm.addReview = function() {
    	var postData ={
    		name: vm.name,
    		rating: vm.rating,
    		review: vm.review
    	};
    	if (vm.reviewForm.$valid) {
    		RecipeFactory.postReview(id, postData).then(function(response){
    			// response contains data and properties
    			if (response.status === 200) {
    				// reload the section with the new review added
    				$route.reload();
    				// TO DO: clear the form
    			}
    		}).catch(function(error){
    			console.info("There has been an error: " + error);
    		});
    	} else {
    		vm.isSubmitted = true;
    	}
    };

}]);
