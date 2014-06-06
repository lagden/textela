// Avoid `console` errors in browsers that lack a console.
(function() {
    'use strict';
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Carrega o css
function loadCss(href) {
    'use strict';
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
}

navigator.whois = (function() {
    'use strict';
    var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return ['IE', (tem[1] || '')];
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) return ['Opera', tem[1]];
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
    return M;
})();

// Carregando a font
(function() {
    'use strict';

    var who = navigator.whois,
        info = {
            os: navigator.appVersion.indexOf('Win') > -1 ? 'Windows' : null,
            browser: who[0],
            version: parseInt(who[1], 10)
        };

    if (info.browser === 'Chrome' && info.os === 'Windows')
        loadCss('css/fonts-win.css');
    else if ((info.browser === 'MSIE' || info.browser === 'IE') && info.version < 9)
        console.log('<!--[if lt IE 9]><link rel="stylesheet" type="text/css" href="css/fonts-ie.css"><![endif]-->');
    else
        loadCss('css/fonts.css');

}());
