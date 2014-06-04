define(function(require) {

    'use strict';

    require('angular/route');
    require('angular/resource');

    var angular = require('angular');
    var domReady = require('domReady');

    // Load Modules
    var modules = [];
    modules.push(require('modules/telas/telas'));

    domReady(function(doc) {

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
            }
        ]);

        // Modules
        for (var i = 0, len = modules.length; i < len; i++) {
            angular.module(appModuleName).requires.push(modules[i].name);
        }

        // Bootstrap
        angular.bootstrap(doc, [appModuleName]);
    });
});
