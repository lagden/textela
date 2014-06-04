define([
    'require',
    'angular',
    'angular/route',
    'angular/resource',
], function(require, angular) {

    'use strict';

    require([
        'domReady!',
        'modules/telas/telas'
    ], function(document, telas) {

        // Fix hash - Facebook
        if (window.location.hash === '#_=_')
            window.location.hash = '#!';

        // Setup webApp
        var appModuleName = 'webApp';
        angular.module(appModuleName, [
            'ngResource',
            'ngRoute'
        ]);

        // Config
        angular.module(appModuleName).config(['$locationProvider',
            function($locationProvider) {
                // $locationProvider.html5Mode(false).hashPrefix('!');
                $locationProvider.html5Mode(true);
            }
        ]);

        // Register submodules
        angular.module(appModuleName).requires.push(telas.name);

        // Init
        angular.bootstrap(document, [appModuleName]);
    });
});
