/**
 * 画布
 */
define([
	'WeWin'
], function (WeWin) {

	window.we = window.we || {};

	var my = we.canvas = {};

	// 画布jq对象
	my.$canvas = $('#we-canvas');

	// 画布宽高值
	my.width = my.$canvas.width();
	my.height = my.$canvas.height();

	// 画布偏移量
	my.offset = my.$canvas.offset();
	my.offset.left = Math.round(my.offset.left);

	// 画布事件命名空间
	my.ENS = 'WeCanvasENS';

	// 绑定窗口改变大小事件处理
	WeWin.$win.on('resize.' + my.ENS, function () {

		var newOffset = my.$canvas.offset();
		newOffset.left = Math.round(newOffset.left);

		if (newOffset.left != my.offset.left) {
			my.offset.left = newOffset.left;
			my.$canvas.trigger('WeChangeOffsetLeft', [newOffset.left]);
		}
	});

	return my;
});
