const githubLoc = require('github-loc');

module.exports = async function extractData(repositories, token) {
  const extractedData = [];
  const locPromises = [];
  repositories.forEach((repository) => {
    const htmlUrl = repository.html_url;
    const mainLanguage = repository.language;
    const stars = repository.stargazers_count;
    const repoName = htmlUrl.split('/').slice(3, 5).join('/');
    locPromises.push(githubLoc({ repoName, token }));
    extractedData.push({
      htmlUrl,
      mainLanguage,
      stars,
    });
  });
  const locList = await Promise.all(locPromises);
  locList.forEach((loc, index) => {
    extractedData[index].loc = loc;
  });

  return extractedData;
};
