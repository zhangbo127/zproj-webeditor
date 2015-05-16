/**
 * 头部
 */
define([
	'tpl!we/header/main.tpl',
	'WeWrapper',
	'WeRuler',
	'jquery'
], function (WeHeaderTpl, WeWrapper, WeRuler, $) {

	window.we = window.we || {};

	var my = we.header = {};

	// 添加头部模板
	WeWrapper.$wrapper.prepend(WeHeaderTpl());

	// 头部jq对象
	my.$header = $('#we-header');

	// 菜单栏jq对象
	my.$menubar = $('.we-menubar', my.$header);

	// 头部事件命名空间
	my.ENS = 'WeHeaderENS';

	// 绑定菜单项点击事件处理
	my.$menubar.on('click.' + my.ENS, '.we-menu-ruler', function (e) {
		e.preventDefault();
		WeRuler.toggle();
	});

	return my;
});
