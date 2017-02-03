angular.module('myRecipes').controller('RegisterController', ['$scope', '$http', function($scope, $http) {
	var vm = this;

	vm.register = function(){
		var user = {
			username: vm.username,
			password: vm.password
		};

		if(!vm.username || !vm.password) {
			vm.error = 'Please add a username and password';
		} else {
			if(vm.username !== vm.passwordRepeat) {
				vm.error = "Passwords do not match";
			} else {
				$http.post('/api/users/register', user).then(function(result) {
					console.log("result ", result);
					vm.message = 'Successful registration, please login';
					vm.error = '';
				}).catch(function(error) {
					console.log('There has been an error while registering: ', error);
				});
			}
		}
	};
}]);
