module.exports = function(grunt, options){
	return {
		options: {
			force: true
		},
		dist: [options.paths.DEST]
	};
};