/**
 * 1。获取数据
 * 2。展示数据
 * 3。用户输入token
 * 4。设置排序按钮
 * 5。设置筛选功能
 * 6。webpack 打包代码，因为应用的包用的是commonjs模块系统，需要进行转换
 * 7。webpack 自动打包，自动刷新页面
 */
const StarredRepositories = require('github-loc-rank');

const token = 'fa398496dfec81c1d6c447d46be8c0d284a2405e';
const starredRepositories = new StarredRepositories({ token });

(async () => {
  await starredRepositories.init();
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
})();
