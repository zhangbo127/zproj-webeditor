module.exports = function (grunt) {

	grunt.initConfig({

		cfg: {
			app: './app',
			build: './build'
		},

		// 静态资源安装
		bower: {
			install: {
				options: {
					targetDir: '<%= cfg.app %>',
					clearnTargetDir: false,
					clearnBowerDir: false,
					copy: true,
					clearnup: false,
					/**
					 * 文件规划
					 *
					 * @description 如果layout是方法，则必须与bower.json配置文件中exportsOverride配置项来配合使用；
					 *              如果没有配置exportsOverride，那么(layout:'byType')也会默认为(layout:'byComponent')这种方式来规划文件；
					 *              如果配置了(targetDir)，那么自定义的路径都会加上此配置值；
					 *
					 * @param {string} cdest 组件目的地（即exportsOverride的key，这里直接定义成目标路径）
					 */
					layout: function (cdest) {
						return cdest;
					},
					install: false,
					verbose: false,
					bowerOptions: {}
				}
			}
		},

		// 脚本校验
		jshint: {
			options: {
				// 使用.jshintrc配置文件
				jshintrc: true,
				// 输出报告工具，主要是美化校验报告
				reporter: require('jshint-stylish')
			},
			app: {
				files: {
					src: ['<%= cfg.app %>/js/we']
				}
			}
		},

		// 格式化样式
		recess: {
			options: {
				compile: true,
				compress: false,
				noIDs: true,
				noJSPrefix: true,
				noOverqualifying: true,
				noUnderscores: true,
				noUniversalSelectors: true,
				prefixWhitespace: true,
				strictPropertyOrder: true,
				zeroUnits: true,
				includePath: 'mixed'
			},
			app: {
				files: {
					'<%= cfg.app %>/css/we.recess.css': '<%= cfg.app %>/less/we.less'
				}
			}
		},

		// 脚本依赖优化
		requirejs: {
			options: {

				// 输入目录
				appDir: '<%= cfg.app %>',

				// 输出目录
				dir: '<%= cfg.build %>',

				// 主配置文件
				mainConfigFile: '<%= cfg.app %>/js/main.js',

				// 是否保留构建目录
				keepBuildDir: false,

				// 是否移除被合并的文件
				removeCombined: false,

				// 是否优化脚本
				optimize: 'none',

				// 是否优化样式
				optimizeCss: 'none',

				// 是否寻找递归依赖
				findNestedDependencies: true,

				// 是否包装非amd模块
				wrapShim: false
			},
			build: {
				options: {
					modules: [{
						name: 'lib/common'
					}]
				}
			}
		},

		// 脚本压缩
		uglify: {
			options: {
				// 是否混淆变量名
				mangle: true,
				// 是否保留注释
				preserverComments: false,
				// 输出压缩率
				report: 'min'
			},
			build: {
				files: {
					expand: true,
					cwd: '<%= cfg.build %>/js',
					src: ['**/*.js', '!**/*.min.js'],
					dest: '<%= cfg.build %>/js'
				}
			}
		},

		// 样式压缩
		cssmin: {
			build: {
				files: {
					src: ['<%= cfg.build %>/css/reset.css', '<%= cfg.build %>/css/we.css'],
					dest: '<%= cfg.build %>/css/we.css'
				}
			}
		},

		// 图片压缩
		imagemin: {
			options: {
				// png图片压缩级别
				optimizationLevel: 7,
				// jpg图片压缩
				progressive: true

			},
			build: {
				files: {
					expand: true,
					cwd: '<%= cfg.build %>/img',
					src: ['**/*.(png|jpeg|gif)'],
					dest: ['<%= cfg.build %>/img']
				}
			}
		},

		// 静态服务器
		connect: {
			options: {
				port: 9090,
				protocal: 'http',
				hostname: 'localhost',
				keepalive: true,
				debug: true,
				livereload: false,
				open: true,
				useAvailablePort: false,
				onCreateServer: null
				/*
				 middleware: function (connect, options, middlewares) {
				 return middlewares;
				 }
				 */
			},
			app: {
				options: {
					base: {
						path: '<%= cfg.app %>',
						index: 'index.html',
						maxAge: 300000
					},
					directory: '<%= cfg.app %>'
				}
			},
			build: {
				options: {
					base: {
						path: '<%= cfg.build %>',
						index: 'index.html',
						maxAge: 300000
					},
					directory: '<%= cfg.build %>'
				}
			}
		}

	});

	grunt.task.loadNpmTasks('grunt-bower-task');
	grunt.task.loadNpmTasks('grunt-contrib-connect');
	grunt.task.loadNpmTasks('grunt-contrib-cssmin');
	grunt.task.loadNpmTasks('grunt-contrib-imagemin');
	grunt.task.loadNpmTasks('grunt-contrib-jshint');
	grunt.task.loadNpmTasks('grunt-contrib-requirejs');
	grunt.task.loadNpmTasks('grunt-contrib-uglify');
	grunt.task.loadNpmTasks('grunt-recess');

	/**
	 * 脚本动态打包任务
	 */
	grunt.task.registerTask('requirejs-dynamic', 'requirejs dynamic task', function () {

		var moduleList = grunt.config.get('requirejs.build.options.modules'),
			excludeList = ['jquery', 'jquery-ui'];

		moduleList.forEach(function (item, index) {
			if (moduleList[index]['exclude']) {
				moduleList[index]['exclude'] = excludeList.concat(excludeList[index]['exclude']);
			} else {
				moduleList[index]['exclude'] = excludeList;
			}
		});

		grunt.config.set('requirejs.build.options.modules', moduleList);

		grunt.task.run(['requirejs:build']);
	});
};
