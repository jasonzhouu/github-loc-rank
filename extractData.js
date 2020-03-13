module.exports = function extractData(repositories) {
  const extractedData = [];
  repositories.forEach((repository) => {
    const htmlUrl = repository.html_url;
    const mainLanguage = repository.language;
    extractedData.push({
      htmlUrl,
      mainLanguage,
    });
  });

  return extractedData;
};
