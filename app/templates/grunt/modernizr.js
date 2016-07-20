module.exports = function(grunt, options){
	return {
		tasks: {
			modernizr: {
				dist: {
					parseFiles : false,
					devFile: false,
					outputFile : options.paths.STATICFILES + options.paths.ASSETS + 'js/vendor/modernizr.min.js',
					extra : {
						shiv : true,
						printshiv : false,
						load : true,
						mq : true,
						cssclasses : true
					},
					extensibility : {
						addtest : true,
						prefixed : false,
						teststyles : false,
						testprops : false,
						testallprops : true,
						hasevents : false,
						prefixes : false,
						domprefixes : false
					},
					uglify : true,
					//specific tests
					tests : [
						'touch',
						'rgba',
						'boxshadow',
						'css-boxsizing'
					],
					//custom tests
					customTests: [
						options.paths.SRC_JS + 'modernizr-tests/*.js'
					]
				}
			},
			
			watch: {
				modernizr: {
					files: '<%=modernizr.dist.customTests%>',
					tasks: ["modernizr"]
				}
			}
		}

	};
};