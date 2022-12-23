const fs = require('fs');

// Read the config.yaml file
const config = fs.readFileSync('./static/config.yml', 'utf8');

// Parse the YAML content
const configData = require('js-yaml').load(config);

// Extract the collections array from the config data
const collections = configData.collections;

let interfaces=[];

function createInterface(object) {
    const fields = object.fields.map((field) => {
        let type = field.widget;
        if (type === 'markdown') {
          type = 'string';
        }
        if (type === 'object') {
            createInterface(field);
            type=field.name;
        }
        return `  ${field.name}: ${type};`;
      });
      interfaces.push(`export interface ${object.name} {
${fields.join('\n')}
}`);
}

// Generate the TypeScript interfaces
collections.map((collection) => {
    createInterface(collection);
});

// Write the interfaces to a file
fs.writeFileSync('./src/lib/content/interfaces.ts', interfaces.join('\n\n'));

console.log('Interfaces generated successfully!');