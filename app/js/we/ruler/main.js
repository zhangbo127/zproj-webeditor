/**
 * 标尺工具
 *
 * 这里有一个样式必须要设置在: html{ overflow: scroll;}，而不能设置在参考线的parents()元素里面，
 * 这是因为jquery.ui.draggable拖拽时会去查找scrollParent，并将参考线的position值减去scrollParent.offset()值，这样计算出来的position值就会错位；
 */
define([
	'tpl!we/ruler/main.tpl',
	'WeWin',
	'WeWrapper',
	'WeCanvas',
	'jquery',
	'jquery-ui'
], function (WeRulerTpl, WeWin, WeWrapper, WeCanvas, $) {

	window.we = window.we || {};

	var my = we.ruler = {};

	// 标尺jq对象
	my.$rulerH = null;
	my.$rulerV = null;
	my.$rulerHInner = null;
	my.$rulerVInner = null;

	// 标尺事件命名空间
	my.ENS = 'WeRulerENS';

	/**
	 * 显示、隐藏标尺
	 */
	my.toggle = function () {
		if (my.$rulerH) {
			my.$rulerH.toggle();
			my.$rulerV.toggle();
		} else {
			_createRuler();
		}
	};

	/**
	 * 创建标尺
	 */
	function _createRuler() {

		// 添加标尺模板
		WeWrapper.$wrapper.append(WeRulerTpl());

		// 获取标尺jq对象
		my.$rulerH = $('#we-ruler-h');
		my.$rulerV = $('#we-ruler-v');
		my.$rulerHInner = $('.we-ruler-inner', my.$rulerH);
		my.$rulerVInner = $('.we-ruler-inner', my.$rulerV);

		// 初始化参考线jq对象集合
		my.$lineHs = $();
		my.$lineVs = $();

		// 调整标尺刻度
		_adjustRulerScale('h');
		_adjustRulerScale('v');

		// 渲染标尺拖拽
		_renderRulerDraggable(my.$rulerH, my.$rulerVInner, 'y', 'h');
		_renderRulerDraggable(my.$rulerV, my.$rulerHInner, 'x', 'v');

		// 绑定画布左偏移量改变事件处理
		WeCanvas.$canvas.on('WeChangeOffsetLeft.' + my.ENS, function () {
			_adjustRulerScale('h');
		});

		// 绑定窗口水平滚动值改变事件处理
		WeWin.$win.on('WeChangeScrollLeft.' + my.ENS, function () {
			_adjustRulerScale('h');
		});

		// 绑定窗口垂直滚动值改变事件处理
		WeWin.$win.on('WeChangeScrollTop.' + my.ENS, function () {
			_adjustRulerScale('v');
		});

		// 绑定窗口宽度改变事件处理
		WeWin.$win.on('WeChangeWidth.' + my.ENS, function (event, newValue) {
			my.$lineHs.css('width', newValue);
		});

		// 绑定窗口高度改变事件处理
		WeWin.$win.on('WeChangeHeight.' + my.ENS, function (event, newValue) {
			my.$lineVs.css('height', newValue);
		});
	}

	/**
	 * 渲染标尺拖拽
	 *
	 * @param {object} $ruler 标尺jq对象
	 * @param {object} $rulerInner 标尺内层jq对象
	 * @param {string} dragAxis 拖拽轴
	 * @param {string} lineType 参考线类型
	 */
	function _renderRulerDraggable($ruler, $rulerInner, dragAxis, lineType) {

		var $line = null,
			$coord = null,
			lineClass = 'we-line-' + lineType;

		// 渲染标尺拖拽
		$ruler.draggable({
			appendTo: $rulerInner,
			axis: dragAxis,
			cursor: 'move',
			scroll: false,
			helper: function () {

				// 创建参考线、坐标jq对象
				$line = $('<div class="' + lineClass + '"><div class="we-coord" title="双击移除参考线">0px</div></div>');
				$coord = $('.we-coord', $line);

				// 调整参考线宽高
				if (lineType == 'h') {
					$line.css('width', WeWin.width);
				} else {
					$line.css('height', WeWin.height);
				}

				// 返回参考线jq对象作为helper
				return $line;
			},
			drag: function (event, ui) {
				// 更新坐标值（因为helper被附加到标尺内部容器里了，这时的position就是ui.draggable针对容器的计算好了的值）
				if (lineType == 'h') {
					$coord.text(ui.position.top + 'px');
				} else {
					$coord.text(ui.position.left + 'px');
				}
			},
			stop: function (event, ui) {

				// 获取新参考线、坐标jq对象
				var $line = ui.helper.clone(),
					$coord = $line.find('.we-coord');

				// 移除新参考线的拖拽样式（不要去动原来的ui.helper样式，draggable会自动销毁）
				$line.removeClass('ui-draggable-dragging');

				// 添加新参考线到标尺内部容器
				if (lineType == 'h') {
					$line.appendTo(my.$rulerVInner);
					$.merge(my.$lineHs, $line);
				} else {
					$line.appendTo(my.$rulerHInner);
					$.merge(my.$lineVs, $line);
				}

				// 渲染新参考线拖拽
				$line.draggable({
					axis: dragAxis,
					cursor: 'move',
					scroll: false,
					drag: function (event, ui) {
						if (lineType == 'h') {
							$coord.text(ui.position.top + 'px');
						} else {
							$coord.text(ui.position.left + 'px');
						}
					}
				});
			}
		});
	}

	/**
	 * 调整标尺刻度
	 *
	 * @param {string} rulerType 标尺类型
	 */
	function _adjustRulerScale(rulerType) {
		if (rulerType == 'h') {
			if (0 < WeWin.scrollLeft) {
				my.$rulerH.css('background-position-x', -WeWin.scrollLeft);
				my.$rulerHInner.css('margin-left', -WeWin.scrollLeft);
			} else {
				my.$rulerH.css('background-position-x', WeCanvas.offset.left);
				my.$rulerHInner.css('margin-left', WeCanvas.offset.left);
			}
		} else {
			my.$rulerV.css('background-position-y', -WeWin.scrollTop);
			my.$rulerVInner.css('margin-top', -WeWin.scrollTop);
		}
	}

	return my;
});
