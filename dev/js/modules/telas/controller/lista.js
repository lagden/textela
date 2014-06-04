define(function() {

    'use strict';

    function ListaController($scope, PagesApiService) {
        PagesApiService
            .query()
            .$promise
            .then(function(res) {
                $scope.pages = res;
                $scope.pagesLoaded = true;
            });
    }

    return ListaController;
});
