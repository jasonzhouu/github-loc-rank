/* eslint-disable no-unused-vars */
const axios = require('axios');
const parseHeaderLink = require('./parseHeaderLink.js');
const getLeftPagesRepositories = require('./getPage.js');
const extractData = require('./extractData.js');

module.exports = async function getStarredRepositories({ token, username, sort }) {
  let url = 'https://api.github.com';
  let options = {};
  if (token !== undefined) {
    url += '/user/starred';
    options = {
      headers: {
        Authentication: `token ${token}`,
      },
    };
  } else if (username !== undefined) {
    url += `/users/${username}/starred`;
  }
  if (sort !== undefined) {
    url += `?sort=${sort}`;
  }
  let stat;
  try { await axios.get(url, options); } catch (error) {
    console.error(error);
  }

  let repositories = [];
  const { data } = stat;
  const { userId, pageLength } = parseHeaderLink(stat.headers.link);

  // 第一页数据
  repositories = repositories.concat(data);

  // 剩余页面的数据
  const leftRepositories = await getLeftPagesRepositories({ userId, pageLength });
  repositories = repositories.concat(leftRepositories);

  // 提取其中的语言、代码函数
  const extractedData = await extractData(repositories);
};
