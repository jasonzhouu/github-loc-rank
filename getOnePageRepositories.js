module.exports = function getOnePageRepositories({ index, octokit }) {
  const url = `/user/starred?page=${index}`;
  return octokit.request(url);
};
