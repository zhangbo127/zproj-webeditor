/**
 * 公共类库模块
 */
define([ 'jquery', 'knockout', 'underscore', 'underscore.string', 'jquery-ui'], function ($, ko, _, _s) {

	window.$ = $;
	window.jQuery = jQuery;
	window.ko = ko;
	window._ = _;

	_.string = _s;
});
