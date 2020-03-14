/**
 * √ 1。获取数据
 * √ 2。展示数据
 * √ 3。用户输入token
 * √ 4。按loc、stars数量
 * 5。按language筛选
 * √ 6。webpack 打包代码，因为应用的包用的是commonjs模块系统，需要进行转换
 * √ 7。webpack 自动打包，自动刷新页面
 * √ 8。webpack区分development, production环境
 * 9。处理token无效的处理办法
 * √ 10。加载出页面数之后，立即加载表格
 * 11。readme介绍如何获取token
 * 12。右上角提供github仓库链接
 * 13。将数据保存到local storage
 * 14。获取repo list立即渲染，后续边加载loc边渲染
 */
const StarredRepositories = require('github-loc-rank');

let token = localStorage.getItem('token');
let pageLength = parseInt(localStorage.getItem('pageLength'), 10);
let currentPage = parseInt(localStorage.getItem('currentPage'), 10);

let starredRepositories;

document.querySelector('input').value = token;

if (token && pageLength && currentPage) {
  starredRepositories = new StarredRepositories();
  starredRepositories.restore({
    extractedData: JSON.parse(localStorage.getItem('extractedData')),
    pageLength,
    currentPage,
    token,
  });
  render();
  const status = document.getElementById('status');
  status.textContent = `√ there are ${pageLength} pages`; // 提示页数
  document.querySelector('input').value = ''; // 清除输入框
  document.getElementById('load').style.display = 'inline-block'; // 显示下一页按钮
}

document.querySelector('#token').addEventListener('click', async () => {
  localStorage.setItem('token', document.querySelector('input').value);

  const status = document.getElementById('status');
  status.innerHTML = '';
  // 显示loadding icon
  const loadding = document.querySelector('.lds-ellipsis').cloneNode(true);
  loadding.style.display = 'inline-block';
  status.append(loadding);

  token = document.querySelector('input').value;
  starredRepositories = new StarredRepositories();
  pageLength = await starredRepositories.init(token);
  localStorage.setItem('pageLength', pageLength);

  status.removeChild(loadding); // 去除loadding icon
  status.textContent = `√ there are ${pageLength} pages`; // 提示页数
  document.querySelector('input').value = ''; // 清除输入框
  document.getElementById('load').style.display = 'inline-block'; // 显示下一页按钮

  document.querySelector('#load').click();
});

function render() {
  document.querySelector('tbody').innerHTML = '';
  starredRepositories.get().forEach((repository) => {
    const row = document.createElement('tr');
    const reponame = document.createElement('td');
    const mainLanguage = document.createElement('td');
    const loc = document.createElement('td');
    const stars = document.createElement('td');

    reponame.append(renderRepo(repository.htmlUrl));
    loc.textContent = repository.loc;
    stars.textContent = repository.stars;

    if (repository.mainLanguage === null) {
      mainLanguage.textContent = '-';
    } else {
      mainLanguage.textContent = repository.mainLanguage;
    }

    row.append(reponame, mainLanguage, stars, loc);
    document.querySelector('tbody').append(row);
  });
}

function renderRepo(url) {
  const reponame = url.split('/').slice(3, 5).join('/');
  const dom = document.createElement('a');
  dom.textContent = reponame;
  dom.setAttribute('href', url);
  return dom;
}

document.querySelector('#load').addEventListener('click', async (event) => {
  const loadding = document.querySelector('.lds-ellipsis');

  // 加载时提示正在加载
  event.target.style.display = 'none';
  loadding.style.display = 'block';

  currentPage = await starredRepositories.getOnePage();
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('extractedData', JSON.stringify(starredRepositories.get()));

  render();

  event.target.style.display = 'inline';
  loadding.style.display = 'none';

  // 如果已经加载到最后一页，将加载按钮去除
  if (currentPage > pageLength) {
    event.target.disabled = 'disabled';
    event.target.style.display = 'none';
  }
});

// todo: 新获取的数据也按照之前的设置进行排序
['loc', 'stars'].forEach((item) => {
  document.getElementById(item).addEventListener('click', (event) => {
    if (!starredRepositories) { return; } // 防止 starredRepositories 为undefined，造成下面调用它的方法出错
    if (event.target.getAttribute('aria-sort') === 'none' || event.target.getAttribute('aria-sort') === 'ascending') {
      clearSort();
      starredRepositories.sort(item, 'descending');
      event.target.setAttribute('aria-sort', 'descending');
      event.target.querySelector('span').classList.add('descending');
    } else if (event.target.getAttribute('aria-sort') === 'descending') {
      clearSort();
      starredRepositories.sort(item, 'ascending');
      event.target.setAttribute('aria-sort', 'ascending');
      event.target.querySelector('span').classList.add('ascending');
    }
    render();
  });
});

function clearSort() {
  document.querySelectorAll('thead tr th').forEach((th) => {
    if (th.hasAttributes('aria-sort')) {
      th.setAttribute('aria-sort', 'none');
    }
    const span = th.querySelector('span');
    if (span) {
      span.classList.remove('ascending');
      span.classList.remove('descending');
    }
  });
}
