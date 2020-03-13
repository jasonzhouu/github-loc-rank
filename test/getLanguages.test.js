/* eslint-disable no-unused-vars */
const axios = require('axios');

async function getLanguages(languagesUrl) {
  const { data } = await axios.get(languagesUrl);
  return data;
}

(async function IIFE() {
  const data = await getLanguages('https://api.github.com/repos/bitcoin/bitcoin/languages');
}());
