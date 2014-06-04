define(['text!modules/telas/view/lista.html'], function(lista) {

    'use strict';

    function Routes($routeProvider) {
        $routeProvider
            .when('/telas', {
                template: lista,
                controller: 'ListaController'
            })
            .when('/telas/show/:slug', {
                template: '<div ng-include="url"></div>',
                controller: 'ShowController'
            })
            .otherwise({
                redirectTo: '/telas'
            });
    }

    return Routes;
});
