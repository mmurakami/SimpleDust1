module.exports = function(grunt, options){
	return {
		tasks: {
			dusthtml: {
				dist: {
					expand: true,
					cwd: options.paths.VIEWS,
					src: ['*.html','**/*.html'],
					dest: options.paths.DEST,
					options: {
						module: 'dustjs-helpers',
						whitespace: true,
						defaultExt: '.html',
						basePath: options.paths.SRC,
						context: [
							options.paths.TEMPLATES + 'data/website.json'
						]
					}
				}
			},
			
			watch: {
				templates: {
					files: [
						options.paths.TEMPLATES  + "{*,**/*}.json",
						options.paths.TEMPLATES  + "{*,**/*}.html",
						options.paths.SRC + "components/{*,**/*}.html"
					],
					tasks: ["dusthtml"]
				}
			}
		}

	};
};