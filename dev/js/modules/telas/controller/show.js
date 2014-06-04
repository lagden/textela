define(function() {

    'use strict';

    function ShowController($scope, $routeParams) {
        $scope.url = '/preview/' + $routeParams.slug + '.html';
    }

    return ShowController;
});
