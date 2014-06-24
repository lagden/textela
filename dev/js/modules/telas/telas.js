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

            // update || save
            var atalhos = [];
            var $checkboxes = $('[data-toggle="atalhos"]');
            for (var i = 0, len = $checkboxes.length; i < len; i++) {
                atalhos.push({
                    target: $checkboxes[i].getAttribute('data-target'),
                    enable: $checkboxes[i].checked
                });
            }

            $.ajax({
                url: '/data/save.json',
                data: {
                    'userId': 123,
                    'atalhos': atalhos
                }
            }).done(function(res) {
                if (res.success)
                    console.log('atualizado', res, atalhos);
            }).fail(function() {
                console.log('fail');
            });
        });

    return telas;
});
