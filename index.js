const StarredRepositories = require('./StarredRepositories.js');

let token;
if (process.argv.includes('--token')) {
  const index = process.argv.indexOf('--token');
  token = process.argv[index + 1];
}

(async function IIFE() {
  const starredRepositories = new StarredRepositories({ token });
  await starredRepositories.init();
  // await starredRepositories.getNextPageData();
  const extractedData = starredRepositories.get();
  console.log(extractedData);
}());

// todo: 创建前端展示页面，用 github pages 发布
// 可以筛选 language, 按 created, loc 排序
