module.exports = function(grunt, options){
	return {
		tasks: {
			less: {
				options: {
					paths: [
						options.paths.SRC_CSS,
						options.paths.SRC + 'components/',
						'node_modules',
						'node_modules/bootstrap/less'
					]               
				},

				dev: {
					options: {
						compress: false,
						sourceMap: true,
						sourceMapRootpath: '../../'+options.paths.SRC                  
					},

					files: [
						{
							expand: true,
							cwd: options.paths.SRC_CSS,
							src: ['styles.less'],
							dest: options.paths.DEST_CSS,
							ext: '.min.css'
						}

					]

				},

				prod: {
					options: {
						compress: true
					},
					files: '<%=less.dev.files%>'
				}
			},
			
			watch: {
				styles: {
					files: [
						options.paths.SRC_CSS  + "{*,**/*}.less",
						options.paths.SRC + 'components/{*,**/*}.less'
					],
					tasks: ["styles"]
				}
			}
		}

	};
};