/* eslint-disable no-unused-vars */
const { Octokit } = require('@octokit/rest');
const parseHeaderLink = require('./parseHeaderLink.js');
const { getOnePageRepositories, getLeftPagesRepositories } = require('./getPage.js');
const extractData = require('./extractData.js');

// todo: 改用 graphql API，以更加节省流量、快速的方式获取数据
module.exports = function StarredRepositories() {
  const url = 'https://api.github.com/user/starred';
  let extractedData = [];
  let currentPage = 1;
  let pageLength = 1;
  let token = '';

  let octokit;

  this.restore = (restoreData) => {
    if (restoreData) {
      pageLength = restoreData.pageLength;
      currentPage = restoreData.currentPage;
      extractedData = restoreData.extractedData;
      token = restoreData.token;
      octokit = new Octokit({ auth: token });
    }
  };

  async function extractDataAndJoin(data) {
    const someExtractedData = await extractData(data, token);
    extractedData = extractedData.concat(someExtractedData);
  }

  /**
   * 初始化，获取：第一页数据、总页数
   * 提取数据，并添加到 extractedData
   */
  this.init = async (aToken) => {
    // 先初始化数据，因为可能是更换token
    currentPage = 1;
    pageLength = 1;
    extractedData = [];

    token = aToken;
    octokit = new Octokit({ auth: aToken });
    try {
      const { data, headers } = await octokit.request(url);
      pageLength = parseHeaderLink(headers.link);
      return pageLength;
    } catch (error) {
      console.error(error);
      // 如果获取网络数据出错，只返回错误
      throw error;
    }
  };

  /**
   * 获取下一页的数据
   * 告诉调用者，当前是否是最后一页
   */
  this.getOnePage = async () => {
    try {
      const { data } = await getOnePageRepositories({
        index: currentPage,
        octokit,
      });
      await extractDataAndJoin(data);
      currentPage += 1;
    } catch (error) {
      console.error(error);
    }
    return currentPage;
  };

  this.getAllLeftPages = async () => {
    // 剩余页面的数据
    const leftRepositories = await getLeftPagesRepositories({ pageLength, octokit });
    extractedData = await extractDataAndJoin(leftRepositories);
    currentPage = (pageLength + 1);
  };

  this.get = () => extractedData;

  this.sort = (attribute, direction) => {
    if (!['stars', 'loc'].includes(attribute)) { return; }
    switch (direction) {
      case 'ascending':
        extractedData.sort((a, b) => (a[attribute] - b[attribute]));
        break;
      case 'descending':
        extractedData.sort((a, b) => (b[attribute] - a[attribute]));
        break;
      default:
        break;
    }
  };
};
