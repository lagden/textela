define(function() {

    'use strict';

    function Page($http, $templateCache, $compile, $parse) {
        return {
            restrict: 'E',
            link: function(scope, iElement, iAttrs) {
                var url = $parse(iAttrs.show)(scope);
                $http.get(url, {
                    cache: $templateCache
                }).success(function(tplContent) {
                    iElement.replaceWith($compile(tplContent)(scope));
                });
            }
        };
    }

    return ['$http', '$templateCache', '$compile', '$parse', Page];
});
