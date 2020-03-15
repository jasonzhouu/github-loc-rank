const githubLoc = require('github-loc');

module.exports = async function extractData(repositories, token) {
  const extractedData = [];
  const locPromises = [];
  repositories.forEach((repository) => {
    const repoName = repository.full_name;

    locPromises.push(githubLoc({ repoName, token }));
    extractedData.push({
      repoName: repository.full_name,
      htmlUrl: repository.html_url,
      stars: repository.stargazers_count,
      mainLanguage: repository.language || '',
      description: repository.description,
    });
  });
  const locList = await Promise.all(locPromises);
  locList.forEach((loc, index) => {
    extractedData[index].loc = loc;
  });

  return extractedData;
};
