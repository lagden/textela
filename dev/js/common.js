requirejs.config({
    catchError: {
        define: true
    },
    waitSeconds: 15,
    baseUrl: 'js/lib',
    paths: {
        'app': '../app',
        'modules': '../modules',
        'angular': 'angular',
        'angular-route': 'angular-route',
        'angular-cookies': 'angular-cookies',
        'angular-resource': 'angular-resource',
        'angular-sanitize': 'angular-sanitize'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        }
    }
});
