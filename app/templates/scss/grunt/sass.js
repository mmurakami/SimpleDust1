module.exports = function(grunt, options){
	return {
		tasks: {
			sass: {
				options: {
					includePaths: [
						options.SRC_CSS,
						options.paths.SRC + 'components/',
						'node_modules',
						'node_modules/bootstrap-sass/assets/stylesheets'
					]               
				},

				dev: {
					options: {
						style: 'expanded',
						sourcemap: true
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
						style: 'compressed',
						sourcemap: false
					},
					files: '<%=sass.dev.files%>'
				}
			},
			
			watch: {
				styles: {
					files: [
						options.paths.SRC  + "{*,**/*}.less"
					],
					tasks: ["styles"]
				}
			}
		}

	};
};