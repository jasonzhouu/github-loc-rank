/**
 * 1。获取数据
 * 2。展示数据
 * 3。用户输入token
 * 4。设置排序按钮
 * 5。设置筛选功能
 * √ 6。webpack 打包代码，因为应用的包用的是commonjs模块系统，需要进行转换
 * √ 7。webpack 自动打包，自动刷新页面
 */
const StarredRepositories = require('github-loc-rank');

const token = 'baba1459cfd2b8b86d806c5e0211fa3166e06264';
const starredRepositories = new StarredRepositories({ token });

// todo: 边加载边渲染
function render() {
  starredRepositories.get().forEach((repository) => {
    const row = document.createElement('tr');
    const reponame = document.createElement('td');
    const mainLanguage = document.createElement('td');
    const loc = document.createElement('td');

    reponame.textContent = repository.htmlUrl;
    loc.textContent = repository.loc;

    if (repository.mainLanguage === null) {
      mainLanguage.textContent = '-';
    } else {
      mainLanguage.textContent = repository.mainLanguage;
    }

    row.append(reponame, mainLanguage, loc);
    document.querySelector('table').append(row);
  });
}

(async () => {
  await starredRepositories.init();
  render();
})();

document.querySelector('body button').addEventListener('click', async (event) => {
  // done: 加载时提示正在加载
  event.target.style.display = 'none';
  const loadding = document.querySelector('#loadding');
  loadding.textContent = 'loadding';

  const lastPage = await starredRepositories.getOnePage();

  render();

  event.target.style.display = 'inline';
  loadding.textContent = '';

  if (lastPage === true) {
    event.target.style.display = 'none';
  }
});
