angular.module('myRecipes').filter('dateSuffix', dateSuffix);

function dateSuffix($filter) {

	var suffixes = ['th', 'st', 'nd', 'rd'];

	return function(string) {
		if (string) {
			// build in date filter conversion
			var dtfilter = $filter('date')(string, 'dd MMMM yyyy @ H:m:s');
			// extract day from string
			var day = parseInt(dtfilter.substr(0, 2));
			// calculation witch suffix to use
			var relevantDigits = (day < 30) ? day % 20 : day % 30;
			// Apply the suffix
			var suffix = (relevantDigits <= 3) ?  suffixes[relevantDigits] : suffixes[0];
			// Replace 2 first digit with day+ suffix
			dtfilter = dtfilter.substr(2);
			return day + suffix + dtfilter;
		}
	};
}