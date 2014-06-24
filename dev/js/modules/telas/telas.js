define([
    'angular',
    'modules/telas/config/routes',
    'modules/telas/factory/pages',
    'modules/telas/controller/lista',
    'modules/telas/controller/show',
    'modules/telas/directive/page',
    'twbs/dropdown',
    'twbs/modal'
], function(angular, Routes, PagesApiService, ListaController, ShowController, Page) {

    'use strict';

    var telas = angular.module('telas', []);

    telas
        .config(Routes)
        .factory('PagesApiService', PagesApiService)
        .controller('ListaController', ListaController)
        .controller('ShowController', ShowController)
        .directive('page', Page);

    // Tela inicial
    // Remove os informativos
    $(document).on('click.informativo', '[data-remove="informativo"]', function(event){
        var $el = $(event.currentTarget);
        $el.parent().remove();
    });

    return telas;
});
