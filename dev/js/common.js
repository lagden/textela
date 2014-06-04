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
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular/route': {
            deps: ['angular']
        },
        'angular/cookies': {
            deps: ['angular']
        },
        'angular/resource': {
            deps: ['angular']
        },
        'angular/sanitize': {
            deps: ['angular']
        }
    }
});
