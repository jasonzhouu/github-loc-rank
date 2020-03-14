const fs = require('fs');
const StarredRepositories = require('../StarredRepositories.js');

(async function IIFE() {
  const starredRepositories = new StarredRepositories({
    token: 'fa398496dfec81c1d6c447d46be8c0d284a2405e',
  });
  await starredRepositories.init();
  await starredRepositories.getOnePage();
  const extractedData = starredRepositories.get();
  fs.writeFileSync('./repositories.json', JSON.stringify(extractedData, null, '\t'));
}());
