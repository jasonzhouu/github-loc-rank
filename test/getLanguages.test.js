const getLanguages = require('../getLanguages.js');

(async function IIFE() {
  const data = await getLanguages('https://api.github.com/repos/bitcoin/bitcoin/languages');
}());
