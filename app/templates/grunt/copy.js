module.exports = function(grunt, options){
	return {
		tasks: {
			copy: {
				dist: {
					files: [
						{
							expand: true,
							cwd: options.paths.STATICFILES,
							src: ['**'],
							dest: options.paths.DEST
						}
					]
				},
				fonts: {
					files: [
						{
							expand: true,
							cwd: options.paths.STATICFILES + options.paths.ASSETS + 'fonts/',
							src: ['*.*'],
							dest: options.paths.DEST + options.paths.ASSETS + 'fonts/'
						}

					]

				},
	            prod: {
	                files: [
	                    {
	                        expand: true,
	                        cwd: options.paths.DEST + options.paths.ASSETS,
	                        src: ['**'],
	                        dest: options.paths.PROD + options.paths.ASSETS
	                    }
	                ]
	            }
			},
			
			watch: {
				statics: {
					files: [
						options.paths.STATICFILES + "{*,**/*}"
					],
					tasks: ["copy:dist"]
				}
			}
		}

	};
};