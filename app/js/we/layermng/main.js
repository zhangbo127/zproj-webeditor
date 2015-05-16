/**
 * 图层管理器
 */
define([
	'WeCanvas',
	'WeLayerBase',
	'WeLayerText',
	'jquery',
	'jquery-ui'
], function (WeCanvas, WeLayerBase, WeLayerText, $) {

	window.we = window.we || {};

	var my = we.layermanager = {};

	// 图层队列
	my.layerQueue = {};

	// 图层层级
	my.layerZIndex = 0;

	// 激活的图层
	my.activeLayer = null;

	// 事件命名空间
	my.ENS = 'WelayermngENS';

	/**
	 * 创建图层
	 *
	 * @param {string} layerType 图层类型
	 * @param {object} layerOpts 图层配置
	 */
	my.createLayer = function (layerType, layerOpts) {

		var layer;

		switch (layerType) {
			case 'text':
				layer = new WeLayerText(layerOpts);
				break;
		}

		// 添加图层到队列
		my.layerQueue[layer['uuid']] = layer;

		// 添加图层元素到画布元素
		layer.$layer.appendTo(WeCanvas.$canvas);

		// 激活图层
		layer.activate();
	};

	/**
	 * 移除图层
	 *
	 * @param {string} layerUUID 图层标识码
	 */
	my.removeLayer = function (layerUUID) {
		if (false === _.isUndefined(my.layerQueue[layerUUID])) {
			my.layerQueue[layerUUID].remove();
		}
	};

	/**
	 * 渲染图层事件
	 * @private
	 */
	function _renderLayerEvent() {

		// 绑定图层鼠标下压事件处理
		WeLayerBase.prototype.onEvent('mousedown.' + my.ENS, '.we-layer', function (event) {
			var layerUUID = event.currentTarget.id;
			if (layerUUID != my.activeLayer['uuid']) {
				my.layerQueue[layerUUID].activate();
			}
		});

		// 绑定图层激活事件处理
		WeLayerBase.prototype.onEvent('WeLayerActivate.' + my.ENS, function (event, layer) {
			if (false === _.isNull(my.activeLayer)) {
				my.activeLayer.deactivate();
			}
			my.activeLayer = layer;
		});
	}

	_renderLayerEvent();

	return my;
});
