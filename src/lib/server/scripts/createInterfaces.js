import { pascalCase } from 'change-case';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// Read the config.yaml file
const config = fs.readFileSync('./static/config.yml', 'utf8');

// Parse the YAML content
const configData = yaml.load(config);

// Extract the collections array from the config data
const collections = configData.collections;

let interfaces = [];

const widgetToType = new Map([
	['boolean', 'boolean'],
	['datetime', 'Date'],
	['number', 'number'],
]);

function createInterface(object) {
	const fields = object.fields.map((field) => {
		let widgetType = field.widget;
		let type = 'string';

		if (widgetType === 'list') {
			if (field?.fields) {
				createInterface(field);
				type = `${pascalCase(field.name)}[]`;
			} else if (field?.field.widget === 'object') {
				createInterface(field.field);
				type = `${pascalCase(field.field.name)}[]`;
			} else {
				type = `${widgetToType.get(widgetType) || 'string'}[]`;
			}
		} else if (widgetType === 'object') {
			createInterface(field);
			type = pascalCase(field.name);
		} else {
			type = widgetToType.get(widgetType) || 'string';
		}

		const required = field.required === false ? '?' : '';
		return `  ${field.name}${required}: ${type};`;
	});
	console.log(`    ${pascalCase(object.name)}`);
	interfaces.push(`export interface ${pascalCase(object.name)} {
${fields.join('\n')}
}`);
}

// Generate the TypeScript interfaces
collections.map((collection) => {
	const filename = pascalCase(collection.name);
	console.log(`/${filename}.ts interfaces:`);
	createInterface(collection);
	// Write the interfaces to a file
	fs.writeFileSync(`./src/lib/types/${filename}.ts`, interfaces.join('\n\n'));
	interfaces = [];
});

console.log('Interfaces generated successfully!');
