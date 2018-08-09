'use strict';

module.exports = grunt => {
	const sass = require('node-sass');

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		minifyHtml: {
			options: {
				cdata: true
			},
			dist: {
				files: {
					'dist/index.html': 'src/index.html'
				}
			}
		},

		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/style.css': ['src/style.css']
				}
			}
		},

		uglify: {
			options: {
				output: {
					quote_style: 1
				}
			},
			my_target: {
				files: {
					'dist/script.js': ['src/script.js']
				}
			}
		},

		ts: {
			default: {
				tsconfig: './tsconfig.json',
				options: {
					fast: 'never'
				}
			}
		},

		sass: {
			options: {
				implementation: sass,
				sourceMap: false,
				outputStyle: 'expanded'
			},
			dist: {
				files: {
					'src/style.css': 'src/style.sass'
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/assets/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/assets/'
				}]
			}
		},

		jshint: {
			all: ['src/script.js'],
			options: {
				'esversion': 6
			}
		},

		watch: {
			ts: {
				files: ['src/*.ts'],
				tasks: ['ts', 'jshint'],
				options: {
					spawn: false
				}
			},

			sass: {
				files: ['src/*.sass'],
				tasks: ['sass'],
				options: {
					spawn: false
				}
			},

		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'src/*.css',
						'src/*.js',
						'src/*.html'
					]
				},

				options: {
					watchTask: true,
					server: './src',
					browser: ['chrome']
				}
			}

		}
	});

	grunt.registerTask('default', ['sass', 'ts', 'jshint', 'browserSync', 'watch']);
	grunt.registerTask('prod', ['imagemin', 'minifyHtml', 'cssmin', 'uglify']);
};