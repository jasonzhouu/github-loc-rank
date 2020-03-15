/**
 * √ 1。获取数据
 * √ 2。展示数据
 * √ 3。用户输入token
 * √ 4。按loc、stars数量
 * √ 5。按language筛选
 * √ 6。webpack 打包代码，因为应用的包用的是commonjs模块系统，需要进行转换
 * √ 7。webpack 自动打包，自动刷新页面
 * √ 8。webpack区分development, production环境
 * √ 9。token无效提示
 * √ 10。加载出页面数之后，立即加载表格
 * √ 11。在页面上进行提示如何使用
 * √ 12。右上角提供github仓库链接
 * √ 13。将数据保存到local storage
 * 14。获取repo list立即渲染，后续边加载loc边渲染
 * √ 15。将mainlangaugefilter也保存下来
 * √ 16。自动从数组中获取filter的列表，计算各自有多少个，按各数从高到低排序
 * 17。第一次加载页面时，提示LOC、star排序按钮
 * 18。加载第一页后，自动加载下一页
 * 19。尝试不输入token
 * √ 20。固定表格第一列宽度
 * 21。localStorage数据保存后，用户更新stars数据的问题，即新star了项目，或者取消star了项目
 * 22。设置LOC范围
 * √ 23。告诉当前是第几页
 * √ 24。新获取的数据也进行排序
 */
const StarredRepositories = require('github-loc-rank');

let token = localStorage.getItem('token') || '';
let pageLength = parseInt(localStorage.getItem('pageLength'), 10) || 0;
let currentPage = parseInt(localStorage.getItem('currentPage'), 10) || 0;

let mainLanguageFilter = localStorage.getItem('mainLanguage') || '-';

let starredRepositories;

let sortItem = '';
let sortDirection = '';

document.querySelector('input').value = token;

if ((token !== '') && (pageLength !== 0) && (currentPage !== 0)) {
  starredRepositories = new StarredRepositories();
  starredRepositories.restore({
    extractedData: JSON.parse(localStorage.getItem('extractedData') || '[]'), // 避免因为读取数据为null，造成对其parse出错
    pageLength,
    currentPage,
    token,
  });
  render();
  const status = document.getElementById('status');
  status.textContent = `√ there are ${pageLength} pages, loaded ${currentPage} pages`; // 提示页数

  document.querySelector('input').value = ''; // 清除输入框
  document.getElementById('load').style.display = 'inline-block'; // 显示下一页按钮

  if (starredRepositories.get().length === 0) {
    // 如果恢复的数据是空的，则立即点击加载下一页
    // 但是运行到这里的时候，load按钮的click时间还未注册
    setTimeout(() => {
      document.querySelector('#load').click();
    }, 100);
  }
}

document.querySelector('#token').addEventListener('click', async () => {
  localStorage.setItem('token', document.querySelector('input').value);

  const status = document.getElementById('status');
  // 先清空，以免多次点击，造成不断累积
  status.innerHTML = '';
  // 显示loadding icon
  const loadding = document.querySelector('.lds-ellipsis').cloneNode(true);
  loadding.style.display = 'inline-block';
  status.append(loadding);

  token = document.querySelector('input').value;
  starredRepositories = new StarredRepositories();

  // 可能是更换token，初始化内存和localStorage中的数据，清空table
  clearData();
  document.querySelector('tbody').innerHTML = '';
  try {
    pageLength = await starredRepositories.init(token);
    // 获取数据没有问题，才写入localStorage
    localStorage.setItem('currentPage', 1);
    localStorage.setItem('pageLength', pageLength);
    document.querySelector('input').value = ''; // 清除输入框
    status.textContent = `√ there are ${pageLength} pages`; // 提示页数
    document.getElementById('load').style.display = 'inline-block'; // 显示加载按钮
    document.querySelector('#load').click(); // 点击加载第一页数据
  } catch (error) {
    alertInvalidToken();
  }
});

function clearData() {
  pageLength = 0;
  currentPage = 0;
  localStorage.setItem('pageLength', pageLength);
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('extractedData', []);
}

function filterData() {
  // 1。如果没有设置筛选，则返回全部数据
  if (mainLanguageFilter === '-') return starredRepositories.get();
  // 2。如果设置了筛选，则返回筛选得到的数据
  const filteredData = starredRepositories.get().filter((item) => {
    if (item.mainLanguage !== null
      && item.mainLanguage.toLowerCase() === mainLanguageFilter.toLowerCase()) {
      return true;
    }
    return false;
  });
  return filteredData;
}

function render() {
  // 1。排序，并将其保存到localStorage
  sortRepositores();
  localStorage.setItem('extractedData', JSON.stringify(starredRepositories.get()));

  // 2。创建语言选项下拉框
  renderSelection();
  // 3。生成特定语言得到的数据
  let dataNeedToBeRendered = [];
  dataNeedToBeRendered = filterData();

  // 4。清空表格
  document.querySelector('tbody').innerHTML = '';
  // 5。重新生成表格
  dataNeedToBeRendered.forEach((repository) => {
    const row = document.createElement('tr');
    const reponame = document.createElement('td');
    const mainLanguage = document.createElement('td');
    const loc = document.createElement('td');
    const stars = document.createElement('td');

    reponame.append(renderRepo(repository.htmlUrl, repository.repoName));
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

function renderRepo(htmlUrl, repoName) {
  const dom = document.createElement('a');
  dom.textContent = repoName;
  dom.setAttribute('href', htmlUrl);
  return dom;
}

document.querySelector('#load').addEventListener('click', async (event) => {
  const loadding = document.querySelector('.lds-ellipsis');

  // 加载时提示正在加载
  event.target.style.display = 'none';
  loadding.style.display = 'block';

  try {
    currentPage = await starredRepositories.getOnePage();
    // 如果获取数据没有出错，才将其保存到localStorage
    localStorage.setItem('currentPage', currentPage);
    render();
  } catch (error) {
    alertInvalidToken();
  }

  event.target.style.display = 'inline'; // 显示按钮
  loadding.style.display = 'none'; // 隐藏icon

  document.getElementById('status').textContent = `√ there are ${pageLength} pages, loaded ${currentPage} pages`; // 提示页数

  // 如果已经加载到最后一页，将加载按钮去除
  if (currentPage > pageLength) {
    event.target.disabled = 'disabled';
    event.target.style.display = 'none';
  }
});

function alertInvalidToken() {
  document.getElementById('status').textContent = 'Error: failed internet connection or invalid token';
}

// todo: 新获取的数据也按照之前的设置进行排序
['loc', 'stars'].forEach((item) => {
  document.getElementById(item).addEventListener('click', (event) => {
    if (!starredRepositories) { return; } // 防止 starredRepositories 为undefined，造成下面调用它的方法出错
    if (event.target.getAttribute('aria-sort') === 'none' || event.target.getAttribute('aria-sort') === 'ascending') {
      sortItem = item;
      sortDirection = 'descending';
      clearSortAttribute();
      event.target.setAttribute('aria-sort', 'descending');
      event.target.querySelector('span').classList.add('descending');
    } else if (event.target.getAttribute('aria-sort') === 'descending') {
      sortItem = item;
      sortDirection = 'ascending';
      clearSortAttribute();
      event.target.setAttribute('aria-sort', 'ascending');
      event.target.querySelector('span').classList.add('ascending');
    }
    // 重新渲染，渲染时会排序
    render();
  });
});

function sortRepositores() {
  if (sortItem === '' || sortDirection === '') return;
  starredRepositories.sort(sortItem, sortDirection);
}

function clearSortAttribute() {
  document.querySelectorAll('thead tr th').forEach((th) => {
    if (th.hasAttributes('aria-sort')) {
      starredRepositories.sort();
      th.setAttribute('aria-sort', 'none');
    }
    const span = th.querySelector('span');
    if (span) {
      span.classList.remove('ascending');
      span.classList.remove('descending');
    }
  });
}

document.getElementById('mainLanguage').addEventListener('change', (event) => {
  mainLanguageFilter = event.target.value;
  localStorage.setItem('mainLanguage', mainLanguageFilter);
  render();
});

function renderSelection() {
  if (starredRepositories.get().length === 0) return;

  const mainLanguageOptions = createSelectionList();
  const select = document.getElementById('mainLanguage');

  // 先将已有的option清空，以避免每次重新渲染时，都在继续添加
  clearOption();
  mainLanguageOptions.forEach((item) => {
    const option = document.createElement('option');
    option.innerHTML = `${item.mainLanguage} -- ${item.count}`;
    option.value = item.mainLanguage;
    select.append(option);
  });
  select.value = mainLanguageFilter;
}

function createSelectionList() {
  const mainLanguageOptions = [];

  // 语言列表
  starredRepositories.get().forEach((item1) => {
    if (item1.mainLanguage !== ''
     && mainLanguageOptions
       .filter((item2) => item1.mainLanguage === item2.mainLanguage)
       .length === 0) {
      mainLanguageOptions.push({
        mainLanguage: item1.mainLanguage,
      });
    }
  });
  // 各语言对应的仓库数量列表，并排序
  mainLanguageOptions.forEach((item1) => {
    item1.count = starredRepositories.get()
      .filter((item2) => item1.mainLanguage === item2.mainLanguage)
      .length;
  });
  mainLanguageOptions.sort((i, j) => j.count - i.count);

  return mainLanguageOptions;
}

function clearOption() {
  while (document.getElementById('mainLanguage').lastChild.value !== '-') {
    document.getElementById('mainLanguage').removeChild(
      document.getElementById('mainLanguage').lastChild,
    );
  }
}
