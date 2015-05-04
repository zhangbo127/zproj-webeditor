/**
 * 应用配置
 */
require.config({

	baseUrl: 'js',

	urlArgs: 'debug=' + Date.now(),

	waitSeconds: 6000,

	paths: {

		'jquery': 'lib/jquery/jquery',
		'jquery-ui': 'lib/jquery/jquery-ui',

		'knockout': 'lib/knockout/knockout.debug',
		'knockout-jqueryui': 'lib/knockout/knockout-jqueryui',

		'underscore': 'lib/underscore/underscore',
		'underscore.string': 'lib/underscore/underscore.string',

		'text': 'lib/requirejs/text',
		'tpl': 'lib/requirejs/tpl',
		'json': 'lib/requirejs/json',

		'WeUtil': 'we/util/main',

		'WeWin': 'we/win/main',
		'WeWrapper': 'we/wrapper/main',
		'WeHeader': 'we/header/main',
		'WeCanvas': 'we/canvas/main',
		'WeRuler': 'we/ruler/main',

		'WeWidgetbar': 'we/widgetbar/main',

		'WeLayermng': 'we/layermng/main',
		'WeLayerBase': 'we/layer/base/main',
		'WeLayerText': 'we/layer/text/main',

		'WeLayeroptbarmng': 'we/layeroptbarmng/main',
		'WeLayeroptbarBase': 'we/layeroptbar/base/main',
		'WeLayeroptbarText': 'we/layeroptbar/text/main'
	},

	shim: {

		'jquery': {
			'exports': '$'
		},
		'jquery-ui': {
			'deps': ['jquery']
		},

		'knockout': {
			'exports': 'ko'
		},
		'knockout-jqueryui': {
			'deps': ['knockout'],
			'exports': 'kojqui'
		},

		'underscore': {
			'exports': '_'
		},
		'underscore.string': {
			'deps': ['underscore'],
			'exports': '_s'
		}
	}

});

require(['lib/common'], function () {
	require(['WeHeader', 'WeWidgetbar', 'WeLayermng', 'WeLayeroptbarmng']);
});
