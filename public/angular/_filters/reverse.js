angular.module('myRecipes').filter('reverse', reverse);

function reverse() {
	// return a function with string
	return function(string){
		if (string) {
			// return the reserve version of the string
			return string.split('').reverse().join('');
		}
	};
}