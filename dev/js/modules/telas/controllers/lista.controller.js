define(['modules/telas'], function(telas) {
    telas.controller('ListaController', ['$scope', '$route', '$routeParams', '$location',
        function($scope, $route, $routeParams, $location) {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
        }
    ]);
})
