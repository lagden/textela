define([
    'angular',
    'modules/telas/config/routes',
    'modules/telas/factory/pages',
    'modules/telas/controller/lista',
    'modules/telas/controller/show'
], function(angular, Routes, PagesApiService, ListaController, ShowController) {

    'use strict';

    var telas = angular.module('telas', []);

    telas.config(Routes);
    telas.factory('PagesApiService', PagesApiService);
    telas
        .controller('ListaController', ListaController)
        .controller('ShowController', ShowController);

    return telas;
});
