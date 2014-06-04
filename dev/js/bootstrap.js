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

        // Fix
        if (window.location.hash === '#_=_')
            window.location.hash = '#!';

        // Setup
        var appModuleName = 'webApp';

        // Module
        angular.module(appModuleName, [
            'ngResource',
            'ngRoute'
        ]);

        // Config
        angular.module(appModuleName).config(['$locationProvider',
            function($locationProvider) {
                $locationProvider.html5Mode(false).hashPrefix('!');
                // $locationProvider.html5Mode(true);
            }
        ]);

        // Submodules
        angular.module(appModuleName).requires.push(telas.name);

        // Bootstrap
        angular.bootstrap(document, [appModuleName]);
    });
});
