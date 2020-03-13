const getLanguages = require('./getLanguages.js');

module.exports = async function extractData(repositories) {
  const extractedData = [];
  repositories.forEach(async (repository) => {
    const { htmlUrl, langaugesUrl } = repository;
    const languages = await getLanguages(langaugesUrl);
    extractedData.push({ htmlUrl, languages });
  });
  return extractedData;
};
