module.exports = function(grunt, options){
	return {
		prod: {
			files: [{
				expand: true,
				cwd: options.paths.STATICFILES,
				src: ['**/*.{png,jpg,gif}'],
				dest: options.paths.DEST
			}]
		}
	};
};