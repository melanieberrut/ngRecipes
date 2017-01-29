angular.module('myRecipes').controller('RecipeController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var vm = this;
    var id = $routeParams.id;

    console.log("id ", id);

    $http
		// fetch endpoint
		.get('http://localhost:3000/api/recipes/' + id)

			.then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available

				if (response.status === 200) {
					console.info("Connection to API Successful");
					if (response.data) {
						vm.recipe = response.data;
					} else {
						console.info("There seems to be no data...");
					}
				} else {
					console.info("API, status not 200");
				}

			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				console.info("Error connecting to the API, please try later");
			}
	);
}]);
