module.exports = function(grunt, options){
	return {
		tasks: {
			webfont: {
				icons: {
					src: options.paths.SRC + 'components/icons/svg/*.svg',
					destCss: options.paths.SRC_CSS + 'overrides/fontawesome',
					dest: options.paths.DEST + options.paths.ASSETS + 'fonts',
					options: {
						types: 'eot,woff,ttf,svg',
						font: 'fontawesome-webfont',
						relativeFontPath: '../fonts',
						template: options.paths.SRC + 'components/icons/less/template.less',
						templateOptions: {
							baseClass: 'fa',
							classPrefix: 'fa-',
							mixinPrefix: 'icon-'
						},
						stylesheet: 'less',
						engine: 'node',
						normalize: true,
						htmlDemo: true,
						htmlDemoTemplate: options.paths.SRC+ 'components/icons/html/demo.html',
						destHtml: options.paths.SRC + 'components/icons/html/',
						autoHint: false
					}
				}
			},
			
			watch: {
				icons: {
					files: '<%=webfont.icons.src%>',
					tasks: ["icons", "less.dev"]
				}
			}
		}

	};
};