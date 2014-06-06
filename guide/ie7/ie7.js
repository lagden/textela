/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'teleport\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-envelope-o': '&#x21;',
		'icon-user-login': '&#x22;',
		'icon-check': '&#x23;',
		'icon-times': '&#x24;',
		'icon-power-off': '&#x25;',
		'icon-trash-o': '&#x26;',
		'icon-file-o': '&#x27;',
		'icon-refresh': '&#x28;',
		'icon-lock': '&#x29;',
		'icon-print': '&#x2a;',
		'icon-plus': '&#x2b;',
		'icon-minus': '&#x2c;',
		'icon-filter': '&#x2d;',
		'icon-copy': '&#x2e;',
		'icon-envelope': '&#x2f;',
		'icon-file-text-o': '&#x30;',
		'icon-file': '&#x31;',
		'icon-file-text': '&#x32;',
		'icon-clipboard': '&#x33;',
		'icon-clipboard-check': '&#x34;',
		'icon-tex': '&#x35;',
		'icon-headset': '&#x36;',
		'icon-pencil': '&#x37;',
		'icon-location': '&#x38;',
		'icon-flag': '&#x39;',
		'icon-tools': '&#x3a;',
		'icon-bolt': '&#x3b;',
		'icon-play': '&#x3c;',
		'icon-pause': '&#x3d;',
		'icon-record': '&#x3e;',
		'icon-stop': '&#x3f;',
		'icon-arrow-left': '&#x40;',
		'icon-arrow-down': '&#x41;',
		'icon-arrow-up': '&#x42;',
		'icon-arrow-right': '&#x43;',
		'icon-barcode': '&#x44;',
		'icon-calendar': '&#x45;',
		'icon-user': '&#x46;',
		'icon-users': '&#x47;',
		'icon-search': '&#x48;',
		'icon-zoomin': '&#x49;',
		'icon-zoomout': '&#x4a;',
		'icon-cog': '&#x4b;',
		'icon-file-pdf': '&#x4c;',
		'icon-file-zip': '&#x4d;',
		'icon-file-powerpoint': '&#x4e;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
