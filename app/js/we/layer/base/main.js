/**
 * 图层基类
 */
define([
	'WeCanvas',
	'jquery',
	'underscore',
	'jquery-ui',
], function (WeCanvas, $, _) {

	// 构造函数
	var WeLayerBase = function () {
	};

	/**
	 * 销毁
	 */
	WeLayerBase.prototype.destroy = function () {
		var my = this;
		my.$layer.draggable('destroy');
		my.$layer.resizable('destroy');
		my.$layer.remove();
	};

	/**
	 * 激活
	 */
	WeLayerBase.prototype.activate = function () {
		var my = this;
		my.$layer.addClass('we-layer-active');
		// 触发激活事件
		my.triggerEvent('WeLayerActivate', my);
	};

	/**
	 * 释放
	 */
	WeLayerBase.prototype.deactivate = function () {
		var my = this;
		my.$layer.removeClass('we-layer-active');
	};

	/**
	 * 改变配置
	 * @param {string} key
	 * @param {string|number} value
	 */
	WeLayerBase.prototype.changeOpt = function (key, value) {
		// 子类重载
	};

	/**
	 * 绑定事件处理
	 */
	WeLayerBase.prototype.onEvent = function () {
		WeCanvas.$canvas.on.apply(WeCanvas.$canvas, arguments);
	};

	/**
	 * 移除事件处理
	 */
	WeLayerBase.prototype.offEvent = function () {
		WeCanvas.$canvas.off.apply(WeCanvas.$canvas, arguments);
	};

	/**
	 * 触发事件处理
	 */
	WeLayerBase.prototype.triggerEvent = function () {
		WeCanvas.$canvas.trigger.apply(WeCanvas.$canvas, arguments);
	};

	/**
	 * 初始化
	 * @private
	 */
	WeLayerBase.prototype._init = function () {
		var my = this;
		my._initOpts();
		my._renderStyle();
		my._renderDraggable();
		my._renderResizable();
	};

	/**
	 * 初始化配置
	 * @private
	 */
	WeLayerBase.prototype._initOpts = function () {

		var my = this;

		// 计算图层坐标值
		if (my.opts.left < 0) {
			my.opts.left = 0;
		} else if (WeCanvas.width < my.opts.left + my.opts.width) {
			my.opts.left = my.opts.left - my.opts.width;
		}
		if (my.opts.top < 0) {
			my.opts.top = 0;
		} else if (WeCanvas.height < my.opts.top + my.opts.height) {
			my.opts.top = my.opts.top - my.opts.height;
		}
	};

	/**
	 * 渲染样式
	 * @private
	 */
	WeLayerBase.prototype._renderStyle = function () {
		// 子类重载
	};

	/**
	 * 渲染可拖拽
	 * @private
	 */
	WeLayerBase.prototype._renderDraggable = function () {

		var my = this;

		my.$layer.draggable({
			cursor: 'move',
			scroll: true,
			snap: '.we-line-h, .we-line-v',
			drag: function (event, ui) {

				// 判断图层是否超过画布顶部
				if (ui.position.top < 0) {
					ui.position.top = 0;
				}
				// 判断图层是否超过画布底部
				else if (WeCanvas.height - my.opts.height < ui.position.top) {
					ui.position.top = WeCanvas.height - my.opts.height;
				}
				// 判断图层是否超过画布左侧
				if (ui.position.left < 0) {
					ui.position.left = 0;
				}
				// 判断是图层否超过画布右侧
				else if (WeCanvas.width - my.opts.width < ui.position.left) {
					ui.position.left = WeCanvas.width - my.opts.width;
				}

				// 更新图层配置
				my.opts.left = ui.position.left;
				my.opts.top = ui.position.top;

				// 触发图层拖拽事件
				my.triggerEvent('WeLayerDrag', ui);
			}
		});
	};

	/**
	 * 渲染可改变大小
	 * @private
	 */
	WeLayerBase.prototype._renderResizable = function () {

		var my = this;

		my.$layerResizablebox = $('<div class="we-layer-resizablebox"></div>').prependTo(my.$layer);

		my.$layer.resizable({
				handles: my._createResizableHandles(),
				resize: function (event, ui) {

					// 判断图层是否超过画布顶部
					if (ui.position.top < 0) {
						ui.size.height = ui.size.height + ui.position.top;
						ui.position.top = 0;
					}
					// 判断图层是否超过画布底部
					else if (WeCanvas.height - ui.position.top < ui.size.height) {
						ui.size.height = WeCanvas.height - ui.position.top;
					}
					// 判断图层是否超过画布左侧
					if (ui.position.left < 0) {
						ui.size.width = ui.size.width + ui.position.left;
						ui.position.left = 0;
					}
					// 判断图层是否超过画布右侧
					else if (WeCanvas.width - ui.position.left < ui.size.width) {
						ui.size.width = WeCanvas.width - ui.position.left;
					}

					// 更新图层配置
					my.opts.left = ui.position.left;
					my.opts.top = ui.position.top;
					my.opts.width = ui.size.width;
					my.opts.height = ui.size.height;

					// 触发图层改变大小事件
					my.triggerEvent('WeLayerResize', ui);
				}
			}
		);
	};

	/**
	 * 创建改变大小的把手
	 * @private
	 */
	WeLayerBase.prototype._createResizableHandles = function () {

		var my = this,
			placeholders = [],
			handles = [],
			handlesMap = {},
			boxHtml = '';

		// 当图层高度锁定时，不显示上下把手，显示占位符
		if (my.opts.isHeightLocked) {
			placeholders = placeholders.concat(['n', 's']);
		} else {
			handles = handles.concat(['n', 's']);
		}

		// 当图层宽度锁定时，不显示左右把手，显示占位符
		if (my.opts.isWidthLocked) {
			placeholders = placeholders.concat(['w', 'e']);
		} else {
			handles = handles.concat(['w', 'e']);
		}

		// 当图层宽度和高度同时都没锁定时，显示对角把手
		if (!my.opts.isWidthLocked && !my.opts.isHeightLocked) {
			handles = handles.concat(['nw', 'ne', 'sw', 'se']);
		}

		// 生成占位符html
		if (0 < placeholders.length) {
			$.each(placeholders, function (i, v) {
				boxHtml += _.string.sprintf('<div class="we-resizable-placeholder we-placeholder-%s">&nbsp;</div>', v);
			});
		}

		// 生成把手html，获取把手class
		if (0 < handles.length) {
			$.each(handles, function (i, v) {
				handlesMap[v] = _.string.sprintf('.ui-resizable-%s', v);
				boxHtml += _.string.sprintf('<div class="ui-resizable-handle ui-resizable-%s"><div class="we-resizable-node">&nbsp;</div></div>', v);
			});

			// 添加把手及占位符html
			my.$layerResizablebox.append(boxHtml);

			// 获取把手jq对象
			$.each(handlesMap, function (i, v) {
				handlesMap[i] = $(v, my.$layerResizablebox);
			});
		}

		// 返回把手映射
		return handlesMap;
	};

	return WeLayerBase;
});
