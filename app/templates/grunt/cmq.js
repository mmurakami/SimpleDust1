module.exports = function(grunt, options){
	return {
		options: {
			log: true
		},
		prod: {
			files: [
				{
					expand: true,
					cwd: options.paths.DEST + 'assets/css/',
					src: ['*.min.css'],
					dest: options.paths.DEST + 'assets/css/'
				}

			]
		}
	};
};