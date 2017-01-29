angular.module('myRecipes').factory('RecipeFactory', RecipeFactory);

function RecipeFactory($http){

	return {
		// objects
		getAllRecipes: getAllRecipes,
		getOneRecipe: getOneRecipe
	};

	//
	function getAllRecipes() {
		return $http
				.get('http://localhost:3000/api/recipes')
				.then(complete)
				.catch(failed);
	}

	function getOneRecipe(id) {
		return $http
				.get('http://localhost:3000/api/recipes/' + id)
				.then(complete)
				.catch(failed);
	}

	function complete(response) {
		return response.data;
	}

	function failed(error) {
		return error.statusText;
	}

}