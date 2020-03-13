const getStarredRepositories = require('../getStarredRepositories.js');

(async function IIFE() {
  const repositories = await getStarredRepositories({ username: 'jasonzhouu', sort: 'created' });
}());
