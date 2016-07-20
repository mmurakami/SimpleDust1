module.exports = function(grunt, options){
	return {
		tasks: {
			jshint: {
				files: [
					options.paths.SRC + "components/**/*.js",
					options.paths.SRC_JS + "{!(**modernizr-tests)/*,*}.js"
				],
				options: {
					jshintrc: '.jshintrc',
					force: true
				}
			},
			
			watch: {
				scripts: {
					files: '<%=jshint.files%>',
					tasks: ["scripts"]
				}
			}
		}

	};
};