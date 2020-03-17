const fs = require('fs');
const StarredRepositories = require('../StarredRepositories.js');

(async function IIFE() {
  const starredRepositories = new StarredRepositories();
  let data = [];
  data = await starredRepositories.init('a68f54f3ed2d6409cdfce3602ffdd00da93079a7');
  fs.writeFileSync('./repositories1.json', JSON.stringify(data, null, '\t'));
  data = await starredRepositories.load();
  fs.writeFileSync('./repositories2.json', JSON.stringify(data, null, '\t'));
}());
