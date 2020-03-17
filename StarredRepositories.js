/* eslint-disable no-unused-vars */
const { Octokit } = require('@octokit/rest');
const parseHeaderLink = require('./parseHeaderLink.js');
const getOnePageRepositories = require('./getOnePageRepositories.js');
const extractData = require('./extractData.js');

// todo: 改用 graphql API，以更加节省流量、快速的方式获取数据
module.exports = function StarredRepositories() {
  const url = 'https://api.github.com/user/starred';
  let nextPage = 1;
  let pageLength = 1;
  let token = '';
  let octokit;

  this.restore = (restoreData) => {
    if (restoreData) {
      pageLength = restoreData.pageLength;
      nextPage = restoreData.nextPage;
      token = restoreData.token;
      octokit = new Octokit({ auth: token });
    }
  };

  /**
   * 初始化，获取：第一页数据、总页数
   */
  this.init = async (aToken) => {
    // 每次init都初始化数据
    nextPage = 1;
    pageLength = 1;
    token = aToken;
    octokit = new Octokit({ auth: aToken });

    let extractedData = [];
    try {
      const { data, headers } = await octokit.request(url);
      extractedData = await extractData(data, token);
      pageLength = parseHeaderLink(headers.link);
      nextPage += 1;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return {
      nextPage,
      pageLength,
      data: extractedData,
    };
  };

  /**
   * 获取下一页的数据
   */
  this.load = async () => {
    let extractedData = [];
    try {
      const { data } = await getOnePageRepositories({
        index: nextPage,
        octokit,
      });
      extractedData = await extractData(data, token);
      nextPage += 1;
    } catch (error) {
      console.error(error);
      throw error;
    }
    return {
      nextPage,
      pageLength,
      data: extractedData,
    };
  };
};
