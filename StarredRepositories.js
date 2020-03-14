/* eslint-disable no-unused-vars */
const { Octokit } = require('@octokit/rest');
const parseHeaderLink = require('./parseHeaderLink.js');
const { getOnePageRepositories, getLeftPagesRepositories } = require('./getPage.js');
const extractData = require('./extractData.js');

module.exports = function StarredRepositories({ token }) {
  const octokit = new Octokit({
    auth: token,
  });
  const url = 'https://api.github.com/user/starred';

  let pageLength;
  let currentPage = 1;
  let extractedData = []; // 从中提取出的需要的数据

  async function extractDataAndJoin(data) {
    const someExtractedData = await extractData(data, token);
    extractedData = extractedData.concat(someExtractedData);
  }

  /**
   * 初始化，获取：第一页数据、总页数
   * 提取数据，并添加到 extractedData
   */
  this.init = async () => {
    try {
      const { data, headers } = await octokit.request(url);
      pageLength = parseHeaderLink(headers.link);
    } catch (error) {
      console.error(error);
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
    return (currentPage === pageLength);
  };

  this.getAllLeftPages = async () => {
    // 剩余页面的数据
    const leftRepositories = await getLeftPagesRepositories({ pageLength, octokit });
    extractedData = await extractDataAndJoin(leftRepositories);
    currentPage = (pageLength + 1);
  };

  this.get = () => extractedData;
};
