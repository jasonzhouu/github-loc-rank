const getStarredRepositories = require('./getStarredRepositories.js');

const token = process.argv[2];

(async function IIFE() {
  const extractedData = await getStarredRepositories(token);
  console.log(extractedData);
}());

// todo: 创建前端展示页面，用 github pages 发布
// 可以筛选 language, 按 created, loc 排序
