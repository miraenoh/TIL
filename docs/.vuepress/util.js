const path = require('path');
const directoryTree = require('directory-tree');

module.exports = {
	getDocs: (categoryName) => {
		// Find the doc file names
		const docNames = [];
		directoryTree(path.join(__dirname, '../' + categoryName), { extensions: /\.md/ }, (item) =>
			docNames.push(item.name)
		);

		// Create relative doc paths using doc names
		const docs = [];
		docNames.forEach((docName) => {
			docs.push(`/${categoryName}/${docName.replace('.md', '').replace('README', '')}`);
		});
		return docs;
	}
};
