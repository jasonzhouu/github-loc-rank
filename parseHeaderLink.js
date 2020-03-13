module.exports = function parseHeaderLink(link) {
  // todo: 如果没有第二页，headers.link会是怎么样的
  let pageLength = 0;

  // 防止数据结构不是预期的样子
  try {
    pageLength = link.split('/')[8].split('=')[2].slice(0, -6);
  } catch (error) {
    pageLength = 1;
    console.error(error);
  }

  return pageLength;
};
