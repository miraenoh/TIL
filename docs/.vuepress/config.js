const { description } = require('../../package')

module.exports = {
	title: 'TIL',
	description: description,
	base: '/TIL/',
	head: [
		['meta', { name: 'theme-color', content: '#3eaf7c' }],
		['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
	],
	themeConfig: {
		repo: 'miraenoh/TIL',
		repoLabel: 'Github',
		editLinks: true,
		editLinkText: 'Help me improve this page!',
		docsBranch: 'main',
		docsDir: 'docs',
		lastUpdated: true,
		nextLinks: true,
		prevLinks: true,
		sidebar: [
			{
				title: 'Guide',
				children: ['/guide/', '/guide/using-vue']
			}
		]
	},
	plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
}
