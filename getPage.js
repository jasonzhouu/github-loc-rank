function getOnePageRepositories({ index, octokit }) {
  const url = `/user/starred?sort=created&page=${index}`;
  return octokit.request(url);
}

async function getLeftPagesRepositories({ pageLength, octokit }) {
  let repositories = [];
  const promises = [];
  // @done: 测试promise.all是否可行
  // @todo: 控制并发量，分批次 promise.all，逐个 .then 进行
  // @todo: 将pageLength改回来
  pageLength = 5;
  for (let index = 2; index <= pageLength; index++) {
    promises.push(getOnePageRepositories({ index, octokit }));
  }
  (await Promise.all(promises)).forEach((item) => {
    repositories = repositories.concat(item.data);
  });
  return repositories;
}

module.exports = {
  getOnePageRepositories,
  getLeftPagesRepositories,
};
