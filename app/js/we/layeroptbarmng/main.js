/**
 * 图层配置栏管理器
 */
define([
	'tpl!we/layeroptbarmng/main.tpl',
	'WeWin',
	'WeWrapper',
	'WeLayermng',
	'WeLayerBase',
	'WeLayeroptbarText',
	'jquery',
	'jquery-ui'
], function (tplLayeroptbarmng, WeWin, WeWrapper, WeLayermng, WeLayerBase, WeLayeroptbarText, $) {

	window.we = window.we || {};

	var my = we.layeroptbar = {};

	// 管理器jq对象
	my.$layeroptbarmng = null;

	// 管理器窗口类名
	my.dialogClass = 'we-layeroptbar-dialog';

	// 配置栏映射
	my.layeroptbarMap = {};

	// 激活的配置栏
	my.activeLayeroptbar = null;

	// 管理器事件命名空间
	my.ENS = 'WeLayeroptbarENS';

	/**
	 * 打开
	 */
	my.open = function () {
		my.$layeroptbarmng.dialog('open');
	};

	/**
	 * 关闭
	 */
	my.close = function () {
		my.$layeroptbarmng.dialog('close');
	};

	/**
	 * 初始化
	 * @private
	 */
	function _init() {

		// 添加管理器模板
		WeWrapper.$wrapper.append(tplLayeroptbarmng());

		// 管理器jq对象
		my.$layeroptbarmng = $('#we-layeroptbarmng');

		// 配置栏jq对象
		my.$layeroptbarList = $('.we-layeroptbar-list', my.$layeroptbarmng);

		// 渲染管理器窗口
		my.$layeroptbarmng.dialog({
			appendTo: WeWrapper.$wrapper,
			dialogClass: my.dialogClass,
			position: {
				my: 'right top',
				at: 'right-30 top+80',
				of: WeWin.$win
			},
			resizable: false,
			title: '图层配置栏',
			width: 'auto'
		});
	}

	/**
	 * 初始化配置栏
	 * @param {object} layer 图层
	 * @private
	 */
	function _initLayeroptbar(layer) {

		var layeroptbar,
			layeroptbarType = layer['type'];

		switch (layeroptbarType) {
			case 'text':
				layeroptbar = new WeLayeroptbarText(layer);
		}

		// 添加配置栏到映射
		my.layeroptbarMap[layeroptbarType] = layeroptbar;

		// 添加配置栏元素到配置栏列表元素
		layeroptbar.$layeroptbar.appendTo(my.$layeroptbarList);

		// 打开配置栏
		layeroptbar.open();
	}

	/**
	 * 激活配置栏
	 * @param {object} layer 图层
	 * @private
	 */
	function _activateLayeroptbar(layer) {

		var targetLayeroptbar = my.layeroptbarMap[layer['type']],
			activeLayeroptbar = my.activeLayeroptbar;

		// 渲染配置栏
		targetLayeroptbar.renderOpts(layer);

		// 判断是否切换显示配置栏
		if (targetLayeroptbar['type'] != activeLayeroptbar['type']) {
			activeLayeroptbar.close();
			targetLayeroptbar.open();
			my.activeLayeroptbar = targetLayeroptbar;
		}
	}

	/**
	 * 渲染图层事件
	 * @private
	 */
	function _renderLayerEvent() {

		// 绑定图层激活事件处理
		WeLayerBase.prototype.onEvent('WeLayerActivate.' + my.ENS, function (event, layer) {

			if (true === _.isNull(my.$layeroptbarmng)) {
				_init();
			}

			var layerType = layer['type'];
			if (true === _.isUndefined(my.layeroptbarMap[layerType])) {
				_initLayeroptbar(layer);
			} else {
				_activateLayeroptbar(layer);
			}

			my.activeLayeroptbar = my.layeroptbarMap[layerType];
		});

		// 绑定图层拖拽事件处理
		WeLayerBase.prototype.onEvent('WeLayerDrag.' + my.ENS, function (event, ui) {
			var layeroptbar = my.activeLayeroptbar;
			layeroptbar.changeOpt('left', ui.position.left);
			layeroptbar.changeOpt('top', ui.position.top);
		});

		// 绑定图层改变大小事件处理
		WeLayerBase.prototype.onEvent('WeLayerResize.' + my.ENS, function (event, ui) {
			var layeroptbar = my.activeLayeroptbar;
			layeroptbar.changeOpt('left', ui.position.left);
			layeroptbar.changeOpt('top', ui.position.top);
			layeroptbar.changeOpt('width', ui.size.width);
			layeroptbar.changeOpt('height', ui.size.height);
		});
	}

	_renderLayerEvent();

	return my;
});
