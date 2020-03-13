/* eslint-disable no-unused-vars */
const { Octokit } = require('@octokit/rest');
const parseHeaderLink = require('./parseHeaderLink.js');
const { getLeftPagesRepositories } = require('./getPage.js');
const extractData = require('./extractData.js');

module.exports = async function getStarredRepositories({ token, sort }) {
  const octokit = new Octokit({
    auth: token,
  });
  let url = 'https://api.github.com/user/starred';
  if (sort !== undefined) {
    url += `?sort=${sort}`;
  }
  let stat;
  try { stat = await octokit.request(url); } catch (error) {
    console.error(error);
  }

  let repositories = [];
  const { data } = stat;
  const { pageLength } = parseHeaderLink(stat.headers.link);

  // 第一页数据
  repositories = repositories.concat(data);

  // 剩余页面的数据
  const leftRepositories = await getLeftPagesRepositories({ pageLength, octokit });
  repositories = repositories.concat(leftRepositories);

  // 提取其中的语言、代码函数
  const extractedData = await extractData(repositories, token);

  return extractedData;
};
