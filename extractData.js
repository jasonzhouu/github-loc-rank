const axios = require('axios');

async function getLanguages(languagesUrl) {
  const { data } = await axios.get(languagesUrl);
  return data;
}

module.exports = async function extractData(repositories) {
  const extractedData = [];
  const languagePromises = [];
  let languageLists;
  repositories.forEach(async (repository) => {
    const htmlUrl = repository.html_url;
    const languagesUrl = repository.languages_url;
    const mainLanguage = repository.language;
    languagePromises.push(getLanguages(languagesUrl));

    extractedData.push({
      htmlUrl,
      mainLanguage,
      languageList: {},
    });
  });
  try {
    languageLists = await Promise.all(languagePromises);
  } catch (error) {
    console.error(error);
  }
  extractedData.forEach((item, index) => {
    item.languageList = languageLists[index];
  });
  return extractedData;
};
