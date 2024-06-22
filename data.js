const fs = require('fs');

const data = JSON.parse(fs.readFileSync(__dirname + '/notes.json', { encoding: 'utf-8' }));

module.exports = {
    data,
}
