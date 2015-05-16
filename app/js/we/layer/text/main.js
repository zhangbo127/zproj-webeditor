/**
 * 文本图层类
 */
define([
	'tpl!we/layer/text/main.tpl',
	'json!we/layer/text/opts.json',
	'WeLayerBase',
	'WeCanvas',
	'WeUtil',
	'jquery',
	'underscore',
	'jquery-ui'
], function (WeLayerTextTpl, WeLayerTextOpts, WeLayerBase, WeCanvas, WeUtil, $, _) {

	/**
	 * 构造函数
	 * @param {object} newOpts
	 * @constructor
	 */
	var WeLayerText = function (newOpts) {
		var my = this;
		my.uuid = 'layer-' + (new Date()).getTime();
		my.type = 'text';
		my.opts = $.extend({}, WeLayerTextOpts, newOpts);
		my.$layer = $(WeLayerTextTpl({'uuid': my.uuid}));
		my.$content = $('.we-content', my.$layer);
		my._init();
	};

	// 继承图层基类
	WeUtil.extend(WeLayerText, WeLayerBase);

	/**
	 * 改变配置
	 * @description 外部调用
	 * @param {string} key 键
	 * @param {string|number} value 值
	 */
	WeLayerText.prototype.changeOpt = function (key, value) {

		var my = this;

		// 数值属性需要将字符串转换为整形，如果整形值小于零则不处理
		if (-1 < $.inArray(key, ['left', 'top', 'zIndex', 'width', 'height', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'])) {
			value = parseInt(value);
			if (value < 0) {
				return;
			}
		}

		switch (key) {
			case 'zIndex':
				my.opts.zIndex = value;
				my.$layer.css('zIndex', value);
				break;
			case 'left':
				if (WeCanvas.width < value + my.opts.width) {
					value = WeCanvas.width - value;
				}
				my.opts.left = value;
				my.$layer.css('left', value);
				break;
			case 'top':
				if (WeCanvas.height < value + my.opts.height) {
					value = WeCanvas.height - value;
				}
				my.opts.top = value;
				my.$layer.css('top', value);
				break;
			case 'width':
				if (WeCanvas.width < value) {
					value = WeCanvas.width;
				} else if (WeCanvas.width < value + my.opts.left) {
					my.opts.left = WeCanvas.width - value;
					my.$layer.css('left', my.opts.left);
				}
				my.opts.width = value;
				my.$layer.css('width', value);
				break;
			case 'height':
				if (WeCanvas.height < value) {
					value = WeCanvas.height;
				} else if (WeCanvas.height < value + my.opts.top) {
					my.opts.top = WeCanvas.height - value;
					my.$layer.css('top', my.opts.top);
				}
				my.opts.height = value;
				my.$layer.css('height', value);
				break;
			case 'padding':
				my.opts.padding = value;
				my.$content.css('padding', value);
				break;
			case 'borderTopWidth':
				my.opts.borderTopWidth = value;
				my.$content.css('borderTopWidth', value);
				break;
			case 'borderTopColor':
				my.opts.borderTopColor = value;
				my.$content.css('borderTopColor', value);
				break;
			case 'borderBottomWidth':
				my.opts.borderBottomWidth = value;
				my.$content.css('borderBottomWidth', value);
				break;
			case 'borderBottomColor':
				my.opts.borderBottomColor = value;
				my.$content.css('borderBottomColor', value);
				break;
			case 'borderLeftWidth':
				my.opts.borderLeftWidth = value;
				my.$content.css('borderLeftWidth', value);
				break;
			case 'borderLeftColor':
				my.opts.borderLeftColor = value;
				my.$content.css('borderLeftColor', value);
				break;
			case 'borderRightWidth':
				my.opts.borderBottomWidth = value;
				my.$content.css('borderRightWidth', value);
				break;
			case 'borderRightColor':
				my.opts.borderRightColor = value;
				my.$content.css('borderRightColor', value);
				break;
		}
	};

	/**
	 * 渲染样式
	 * @private
	 */
	WeLayerText.prototype._renderStyle = function () {
		var my = this;
		my.$layer.css({
			'position': 'absolute',
			'left': my.opts.left,
			'top': my.opts.top,
			'zIndex': my.opts.zIndex,
			'width': my.opts.width,
			'height': my.opts.height,
			'background': _.string.sprintf('%s %s %s %s', my.opts.backgroundColor, my.opts.backgroundImage, my.opts.backgroundRepeat, my.opts.backgroundPosition)
		});
		my.$content.css({
			'padding': my.opts.padding,
			'borderStyle': _.string.sprintf('%s %s %s %s', my.opts.borderTopStyle, my.opts.borderRightStyle, my.opts.borderBottomStyle, my.opts.borderLeftStyle),
			'borderWidth': _.string.sprintf('%spx %spx %spx %spx', my.opts.borderTopWidth, my.opts.borderRightWidth, my.opts.borderBottomWidth, my.opts.borderLeftWidth),
			'borderColor': _.string.sprintf('%s %s %s %s', my.opts.borderTopColor, my.opts.borderRightColor, my.opts.borderBottomColor, my.opts.borderLeftColor)
		});
	};

	return WeLayerText;
});
