const { Octokit } = require('@octokit/rest');

module.exports = async function getLanguageDetails(reponame, token) {
  const octokit = new Octokit({
    auth: token,
  });
  const languagesUrl = `/repos/${reponame}/languages`;

  const { data } = await octokit.request(languagesUrl);
  const languageDetailsList = data;

  return languageDetailsList;
};
