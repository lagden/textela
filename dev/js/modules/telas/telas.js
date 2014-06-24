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
    $(document)
        .on('click.informativo', '[data-remove="informativo"]', function(event) {
            var $el = $(event.currentTarget);
            $el.parent().remove();
        })
        .on('click.dropdown', '.dropdown-menu', function(event) {
            var $el = $(event.currentTarget);
            if ($el.hasClass('dropdown-menu-form')) {
                event.stopPropagation();
            }
        })
        .on('click.atalho', '[data-toggle="atalhos"]', function(event) {
            var $el = $(event.currentTarget);
            var method = ($el[0].checked) ? 'removeClass' : 'addClass';
            $($el.data('target'))[method]('hidden');
        });

    return telas;
});
