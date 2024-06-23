const fs = require('fs/promises');
const Handlebars = require('handlebars');

async function getTemplate(fileName) {
  const template = await fs.readFile(fileName, 'utf-8');
  return Handlebars.compile(template);
}

module.exports = { getTemplate };
