angular.module('myRecipes').controller('RecipeController', [ 'RecipeFactory', '$stateParams', function(RecipeFactory, $stateParams) {
    var vm = this;
    var id = $stateParams.id;


    RecipeFactory.getOneRecipe(id).then(function(response){
    	vm.recipe = response.data;
    	vm.stars = _getStarRating(vm.recipe.stars);
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
