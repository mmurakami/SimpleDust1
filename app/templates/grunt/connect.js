module.exports = function(grunt, options){
	return {
		options: {
			port: options.paths.SERVERPORT,
			hostname: options.paths.SERVERDOMAIN
		},
		dev: {
			options: {
				livereload: true,
				open: false,
				// base: [{
				// 	path: "../"
				// },{
				// 	path: options.paths.DEST
				// }]
				base: [
					options.paths.DEST,
					"../"
				]
			}
		},
		prod: {
			options: {
				base: [
					options.paths.DEST
				]
			},
			keepalive: true
		}
	};
};