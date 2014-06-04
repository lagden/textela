define('config', function() {

    'use strict';

    requirejs.config({
        catchError: {
            define: true
        },
        waitSeconds: 15,
        baseUrl: 'js/lib',
        paths: {
            'modules': '../modules',
            'text': 'require/text',
            'domReady': 'require/domReady',
            'bootstrap': '../bootstrap'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular/route': {
                deps: ['angular']
            },
            'angular/resource': {
                deps: ['angular']
            }
        }
    });
});
