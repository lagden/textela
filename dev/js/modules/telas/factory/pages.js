define(function() {

    'use strict';

    function PagesApiService($resource, $location) {
        return $resource('data/pages.json');
    }

    return ['$resource', '$location', PagesApiService];
});
