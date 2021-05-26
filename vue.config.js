module.exports = {
	devServer: {
	    compress: true,
	    port: 9000
	},
	pages: {
    	index: {
			/* точка входа для страницы */
			entry: 'src/main/main.js',

			/* исходный шаблон */
			template: 'public/index.html'
    	}
	},
	configureWebpack: {
    	plugins: []
	}
}