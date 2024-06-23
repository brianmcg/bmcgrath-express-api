const fs = require('fs');
const Handlebars = require('handlebars');

function getTemplate(fileName) {
  const template = fs.readFileSync(fileName, 'utf-8');
  return Handlebars.compile(template);
}

module.exports = { getTemplate };
