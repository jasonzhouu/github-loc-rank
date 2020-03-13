const axios = require('axios');

module.exports = async function getLanguages(languagesUrl) {
  const { data } = await axios.get(languagesUrl);
  return data;
};
