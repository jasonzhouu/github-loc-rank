const fs = require('fs');
const getStarredRepositories = require('../getStarredRepositories.js');

(async function IIFE() {
  const repositories = await getStarredRepositories({ token: '***', sort: 'created' });
  fs.writeFileSync('./repositories.json', JSON.stringify(repositories, null, '\t'));
}());
