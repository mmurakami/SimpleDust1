module.exports = function(grunt, options){
	return {
		options: {
			report: 'min'
		},
		prod: {
			files: [
				{
					expand: true,
					cwd: options.paths.DEST_CSS,
					src: ['*.min.css'],
					dest: options.paths.DEST_CSS
				}

			]
		}
	};
};