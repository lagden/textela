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
		'icon-tag': '&#x21;',
		'icon-envelope-o': '&#x22;',
		'icon-user-login': '&#x23;',
		'icon-check': '&#x24;',
		'icon-times': '&#x25;',
		'icon-power-off': '&#x26;',
		'icon-trash-o': '&#x27;',
		'icon-file-o': '&#x28;',
		'icon-refresh': '&#x29;',
		'icon-lock': '&#x2a;',
		'icon-print': '&#x2b;',
		'icon-plus': '&#x2c;',
		'icon-minus': '&#x2d;',
		'icon-filter': '&#x2e;',
		'icon-copy': '&#x2f;',
		'icon-envelope': '&#x30;',
		'icon-file-text-o': '&#x31;',
		'icon-file': '&#x32;',
		'icon-file-text': '&#x33;',
		'icon-clipboard': '&#x34;',
		'icon-clipboard-check': '&#x35;',
		'icon-tex': '&#x36;',
		'icon-headset': '&#x37;',
		'icon-pencil': '&#x38;',
		'icon-location': '&#x39;',
		'icon-flag': '&#x3a;',
		'icon-tools': '&#x3b;',
		'icon-bolt': '&#x3c;',
		'icon-play': '&#x3d;',
		'icon-pause': '&#x3e;',
		'icon-record': '&#x3f;',
		'icon-stop': '&#x40;',
		'icon-arrow-left': '&#x41;',
		'icon-arrow-down': '&#x42;',
		'icon-arrow-up': '&#x43;',
		'icon-arrow-right': '&#x44;',
		'icon-barcode': '&#x45;',
		'icon-calendar': '&#x46;',
		'icon-user': '&#x47;',
		'icon-users': '&#x48;',
		'icon-search': '&#x49;',
		'icon-zoomin': '&#x4a;',
		'icon-zoomout': '&#x4b;',
		'icon-cog': '&#x4c;',
		'icon-file-pdf': '&#x4d;',
		'icon-file-zip': '&#x4e;',
		'icon-file-powerpoint': '&#x4f;',
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
