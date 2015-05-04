/**
 * 图层配置栏基类
 */
define(function () {

	/**
	 * 构造函数
	 * @constructor
	 */
	function WeLayeroptbarBase() {
	}

	/**
	 * 渲染配置
	 * @param {object} layer 图层
	 */
	WeLayeroptbarBase.prototype.renderOpts = function (layer) {
		var my = this;
		my.koViewModel._isSubscribeEnabled = false;
		my.koViewModel.renderProps(layer);
		my.koViewModel._isSubscribeEnabled = true;
	};

	/**
	 * 改变配置
	 * @param {string} key 键
	 * @param {string|number} value 值
	 */
	WeLayeroptbarBase.prototype.changeOpt = function (key, value) {
		var my = this;
		my.koViewModel.changeProp(key, value);
	};

	/**
	 * 打开
	 */
	WeLayeroptbarBase.prototype.open = function () {
		var my = this;
		my.$layeroptbar.show();
	};

	/**
	 * 关闭
	 */
	WeLayeroptbarBase.prototype.close = function () {
		var my = this;
		my.$layeroptbar.hide();
	};

	return WeLayeroptbarBase;
});
