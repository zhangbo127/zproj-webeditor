/**
 * 浏览器窗口
 */
define(['jquery'], function ($) {

	window.we = window.we || {};

	var my = we.win = {};

	// 浏览器窗口jq对象
	my.$win = $(window);

	// 浏览器窗口可见宽高值
	my.width = my.$win.width();
	my.height = my.$win.height();

	// 浏览器窗口滚动条偏移量
	my.scrollLeft = my.$win.scrollLeft();
	my.scrollTop = my.$win.scrollTop();

	// 浏览器窗口事件命名空间
	my.ENS = 'WeWinENS';

	// 绑定浏览器窗口滚动事件处理
	my.$win.on('scroll.' + my.ENS, function () {

		var newScrollLeft = my.$win.scrollLeft();
		if (newScrollLeft != my.scrollLeft) {
			my.scrollLeft = newScrollLeft;
			my.$win.trigger('WeChangeScrollLeft', [newScrollLeft]);
		}

		var newScrollTop = my.$win.scrollTop();
		if (newScrollTop != my.scrollTop) {
			my.scrollTop = newScrollTop;
			my.$win.trigger('WeChangeScrollTop', [newScrollTop]);
		}
	});

	// 绑定浏览器窗口改变大小事件处理
	my.$win.on('resize.' + my.ENS, function () {

		var newWidth = my.$win.width();
		if (newWidth != my.width) {
			my.width = newWidth;
			my.$win.trigger('WeChangeWidth', [newWidth]);
		}

		var newHeight = my.$win.height();
		if (newHeight != my.height) {
			my.height = newHeight;
			my.$win.trigger('WeChangeHeight', [newHeight]);
		}
	});

	return my;
});
