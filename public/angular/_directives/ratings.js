angular.module('myRecipes').directive('recipeRating',  function() {

    // usage: <recipe-rating/>

    return {
        //
        restrict: 'E',
        template: '<span data-ng-repeat="star in vm.stars track by $index">*{{ star }}</span>',
        bindToController: true,
        controller: 'RecipeController',
        controllerAs: 'vm',
        scope: {
            // by value =, and object @
            stars: '@'
        }
    };

});

// Example using components
// angular.module('myRecipes').component('recipeRating', {
//     bindings: {
//         stars: '='
//     },
//     template: '<span data-ng-repeat="star in vm.stars track by $index">*{{ star }}</span>',
//     controller: 'RecipeController',
//     controllerAs: 'vm'
// });