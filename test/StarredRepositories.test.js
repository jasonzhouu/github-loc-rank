const fs = require('fs');
const StarredRepositories = require('../StarredRepositories.js');

(async function IIFE() {
  const starredRepositories = new StarredRepositories({
    token: '835ced60127332a9520357f3f75f0ddd7ec213cc',
  });
  await starredRepositories.init();
  await starredRepositories.getNextPageData();
  const extractedData = starredRepositories.get();
  fs.writeFileSync('./repositories.json', JSON.stringify(extractedData, null, '\t'));
}());
