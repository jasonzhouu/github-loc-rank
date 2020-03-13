const axios = require('axios');

async function getLanguageDetails(repositories) {
  const languagePromises = [];
  let languageDetailLists;
  repositories.forEach((repository) => {
    languagePromises.push(axios.get(repository.language_url));
  });
  try {
    languageDetailLists = await Promise.all(languagePromises);
  } catch (error) {
    console.error(error);
  }
  return languageDetailLists;
}

async function extractData(repositories) {
  const extractedData = [];
  repositories.forEach(async (repository) => {
    const htmlUrl = repository.html_url;
    const mainLanguage = repository.language;
    extractedData.push({
      htmlUrl,
      mainLanguage,
    });
  });

  return extractedData;
}

module.exports = {
  extractData,
  getLanguageDetails,
};
