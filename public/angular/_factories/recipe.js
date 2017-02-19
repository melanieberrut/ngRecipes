angular.module('myRecipes').factory('RecipeFactory', RecipeFactory);

function RecipeFactory($http){

	return {
		// objects
		getAllRecipes: getAllRecipes,
		getOneRecipe: getOneRecipe,
		postReview: postReview
	};

	//
	function getAllRecipes() {
		return $http
				.get('/api/recipes')
				.then(complete)
				.catch(failed);
	}

	function getOneRecipe(id) {
		return $http
				.get('/api/recipes/' + id)
				.then(complete)
				.catch(failed);
	}

	function postReview(id, review) {
		return $http
				.post('/api/recipes/' + id + '/reviews', review)
				.then(complete)
				.catch(failed);
	}

	function complete(response) {
		return response;
	}

	function failed(error) {
		return error.statusText;
	}

}