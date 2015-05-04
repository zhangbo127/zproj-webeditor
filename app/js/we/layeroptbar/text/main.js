/**
 * 文本图层配置栏类
 */
define([
	'tpl!we/layeroptbar/text/main.tpl',
	'WeLayeroptbarBase',
	'WeLayermng',
	'WeUtil'
], function (WeLayeroptbarTextTpl, WeLayeroptbarBase, WeLayermng, WeUtil) {

	/**
	 * 构造函数
	 * @param {object} layer 图层
	 * @constructor
	 */
	function WeLayeroptbarText(layer) {
		var my = this;
		my.$layeroptbar = $(WeLayeroptbarTextTpl());
		my.koViewModel = new KoViewModel(layer);
		ko.applyBindings(my.koViewModel, my.$layeroptbar[0]);
	}

	// 继承图层配置栏基类
	WeUtil.extend(WeLayeroptbarText, WeLayeroptbarBase);

	/**
	 * 视图模型构造函数
	 * @param {object} layer 图层
	 * @constructor
	 */
	function KoViewModel(layer) {

		var self = this;

		// 激活的图层
		self.activeLayer = null;

		// 是否启用订阅
		self.isSubscribeEnabled = true;

		self.createProps();
		self.renderProps(layer);
		self.registerSubscribes();
	}

	/**
	 * 创建属性
	 */
	KoViewModel.prototype.createProps = function () {

		var self = this;

		self.left = ko.observable(0);
		self.top = ko.observable(0);
		self.zIndex = ko.observable(0);
		self.width = ko.observable(0);
		self.height = ko.observable(0);
		self.padding = ko.observable(0);
		self.borderTopWidth = ko.observable(0);
		self.borderTopStyle = ko.observable('solid');
		self.borderTopColor = ko.observable('white');
		self.borderRightWidth = ko.observable(0);
		self.borderRightStyle = ko.observable('solid');
		self.borderRightColor = ko.observable('white');
		self.borderBottomWidth = ko.observable(0);
		self.borderBottomStyle = ko.observable('solid');
		self.borderBottomColor = ko.observable('white');
		self.borderLeftWidth = ko.observable(0);
		self.borderLeftStyle = ko.observable('solid');
		self.borderLeftColor = ko.observable('white');
		self.backgroundColor = ko.observable('transparent');
		self.backgroundImage = ko.observable('none');
		self.backgroundRepeat = ko.observable('no-repeat');
		self.backgroundPosition = ko.observable('left top');
	};

	/**
	 * 渲染属性
	 * @param {object} layer 图层
	 */
	KoViewModel.prototype.renderProps = function (layer) {

		var self = this;
		self.activeLayer = layer;

		$.each(self.activeLayer.opts, function (key, value) {
			if (false === _.isUndefined(self[key])) {
				self[key](value);
			}
		});
	};

	/**
	 * 注册订阅
	 */
	KoViewModel.prototype.registerSubscribes = function () {

		var self = this;

		$.each(self.activeLayer.opts, function (key, oldValue) {
			if (false === _.isUndefined(self[key])) {
				self[key].subscribe(function (newValue) {
					if (true === self.isSubscribeEnabled) {
						self.activeLayer.changeOpt(key, newValue);
					}
				});
			}
		});
	};

	/**
	 * 改变属性
	 * @param {string} key 键
	 * @param {string|number} value 值
	 */
	KoViewModel.prototype.changeProp = function (key, value) {
		var self = this;
		if (false === _.isUndefined(self[key])) {
			self.isSubscribeEnabled = false;
			self[key](value);
			self.isSubscribeEnabled = true;
		}
	};

	return WeLayeroptbarText;
});
