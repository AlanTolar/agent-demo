const fs = require('fs');
const path = require('path');

// Define the folder where the JSON files are located
const folder = './src/lib/content/listings';

// Define the new and old field names
const oldFieldName = 'Title';
const newFieldName = 'title';

// Read all files in the folder
const files = fs.readdirSync(folder);

// Iterate over the files
for (const file of files) {
	// Check if the file is a JSON file
	if (path.extname(file) === '.json') {
		// Read the JSON file
		const data = JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8'));
		// Modify the field name
		if (data.hasOwnProperty(oldFieldName)) {
			data[newFieldName] = data[oldFieldName];
			delete data[oldFieldName];
		}

		// Write the modified JSON back to the file
		fs.writeFileSync(path.join(folder, file), JSON.stringify(data, null, 2));
	}
}
