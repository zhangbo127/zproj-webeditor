/**
 * 通用工具库模块
 */
define(function () {

	window.we = window.we || {};

	var my = we.util = {};

	/**
	 * 类继承方法
	 *
	 * @param {function} Child 子类
	 * @param {function} Parent 父类
	 */
	my.extend = function (Child, Parent) {
		var F = function () {
		};
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.superproto = Parent.prototype;
	};

	/**
	 * 获取随机字符串
	 *
	 * @param {number} len 长度
	 * @returns {string}
	 */
	my.getRandomString = function (len) {

		len = len || 32;

		var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
			charsLength = chars.length,
			resultString = '';

		for (var i = 0; i < len; i++) {
			resultString += chars.charAt(Math.floor(Math.random() * charsLength));
		}

		return resultString;
	};

	return my;
});
