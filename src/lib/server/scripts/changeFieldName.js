import fs from 'fs';
import path from 'path';

const oldKeyName = process.argv[2];
const newKeyName = process.argv[3];

// Recursively iterate through all files in a directory
let filesChangedCount = 0;
const iterateFiles = (dir) => {
	console.log(`Iterating through ${dir}...`);
	fs.readdirSync(dir).forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			iterateFiles(filePath);
		} else {
			// Read the file and parse the JSON content
			const content = fs.readFileSync(filePath, 'utf8');
			let data = JSON.parse(content);

			// Recursively replace key names in nested objects
			let replaceCount = 0;
			const replaceKeyName = (obj) => {
				Object.keys(obj).forEach((key) => {
					if (key === oldKeyName) {
						obj[newKeyName] = obj[oldKeyName];
						delete obj[oldKeyName];
						replaceCount++;
					} else if (typeof obj[key] === 'object') {
						replaceKeyName(obj[key]);
					}
				});
			};
			replaceKeyName(data);

			if (replaceCount > 0) {
				console.log(`   Updated ${replaceCount} keys in ${file}`);
				filesChangedCount++;
				// Write the modified JSON data to the file
				fs.writeFileSync(filePath, JSON.stringify(data));
			}
		}
	});
};

iterateFiles('./src/lib/content');

console.log(
	`Successfully replaced "${oldKeyName}" with "${newKeyName}" in ${filesChangedCount} JSON files.`,
);
