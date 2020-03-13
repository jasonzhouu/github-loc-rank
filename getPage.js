/* eslint-disable consistent-return */
let currentPage = 2;
let repositories = [];

module.exports = async function getLeftPagesRepositories({ userId, pageLength, octokit }) {
  const url = `/user/starred?sort=created&page=${currentPage}`;
  const { data } = await octokit.request(url);
  repositories = repositories.concat(data);
  currentPage += 1;

  pageLength = 2; // todo：删除
  if (currentPage <= pageLength) {
    // @todo: 改成 Promise.all
    await getLeftPagesRepositories({ userId, pageLength });
  }
  return repositories;
};
