module.exports = function(grunt, options){
	//builds a list of entry points for webpack
	var webpack = require("webpack");
	var paths = {};
    grunt.file.expand([options.paths.SRC_JS + '*.js']).forEach(function(a){
        var name = a.substring(options.paths.SRC_JS.length, a.lastIndexOf('.'));
		console.log(name, a);
        paths[name] = a;
    });
	
	return {
		tasks: {
			webpack: {
				options: {
					entry: paths,
					resolve: {
						modulesDirectories: [options.paths.SRC]
					},				
					plugins: [
						new webpack.optimize.CommonsChunkPlugin('common.min.js',2),
						new webpack.ResolverPlugin([
							new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
						], ["normal", "loader"])
					],
					output: {
						path: options.paths.DEST_JS,
						filename: "[name].min.js",
						publicPath: '/' + options.paths.ASSETS + 'js/'
					},
					externals: [
						'jquery',
						'modernizr'
					]
				},

				dev: {
					cache: true,
					debug: true,
					devtool: 'inline-source-map'
				},

				prod: {
					plugins: [
						new webpack.optimize.UglifyJsPlugin({
							compress: {
								drop_console: true,
								drop_debugger: true, // in case anyone using debugger;
								warnings: false
							},
							output: {
								ascii_only: true // strip out weird chars
							}
						})
					]
				}
			}
			
			// watch: {
			// 	webpack: {
			// 		files: '<%=jshint.files%>',
			// 		tasks: ["webpack:dev"]
			// 	}
			// }
		}
	};
};