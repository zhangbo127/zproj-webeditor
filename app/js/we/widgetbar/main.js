/**
 * 控件栏
 */
define([
	'tpl!we/widgetbar/main.tpl',
	'WeWin',
	'WeWrapper',
	'WeCanvas',
	'WeLayermng'
], function (WeWidgetbarTpl, WeWin, WeWrapper, WeCanvas, WeLayermng) {

	window.we = window.we || {};

	var my = we.widgetbar = {};

	// 添加控件栏模板
	WeWrapper.$wrapper.append(WeWidgetbarTpl());

	// 控件栏jq对象
	my.$widgetbar = $('#we-widgetbar');

	// 控件栏窗口class
	my.dialogClass = 'we-widgetbar-dialog';

	// 控件栏事件命名空间
	my.ENS = 'WeWidgetbarENS';

	// 渲染控件栏窗口
	my.$widgetbar.dialog({
		dialogClass: my.dialogClass,
		position: {
			my: 'left top',
			at: 'left+30 top+80',
			of: WeWin.$win
		},
		resizable: false,
		title: '控件栏',
		width: 'auto'
	});

	// 渲染控件可拖拽
	$('.we-widget', my.$widgetbar).draggable({
		appendTo: WeCanvas.$canvas,
		cursor: 'move',
		helper: function () {
			return $(this).clone().addClass('we-widget-dragging');
		},
		scroll: false
	});

	// 渲染画布可放置控件DOM元素
	WeCanvas.$canvas.droppable({
		accept: '.we-widget',
		drop: function (event, ui) {
			// 创建图层
			var widgetType = ui.helper.attr('data-widget-type'),
				widgetOpts = {
					'left': Math.round(ui.position.left),
					'top': Math.round(ui.position.top),
					'zIndex': WeLayermng.layerZIndex++
				};
			WeLayermng.createLayer(widgetType, widgetOpts);
		}
	});

	return my;
});
