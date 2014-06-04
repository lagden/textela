define(function() {

    'use strict';

    function ShowController($scope, $routeParams) {
        $scope.url = 'telas/preview/' + $routeParams.slug + '.html';
    }

    return ShowController;
});
