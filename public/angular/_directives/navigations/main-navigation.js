angular.module('myRecipes').directive('mainNavigation',  function() {

    // usage: <recipe-rating/>

    return {
        //
        restrict: 'E',
        templateUrl: 'angular/_directives/navigations/main-navigation.template.html'
    };

});