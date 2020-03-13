module.exports = function parseHeaderLink(link) {
  // const link = '<https://api.github.com/user/19926174/starred?sort=created&page=2>; rel="next", <https://api.github.com/user/19926174/starred?sort=created&page=72>; rel="last"';

  const linkArr = link.split('/');

  const userId = linkArr[4];
  const pageLength = linkArr[10].split('=')[2].slice(0, -6);

  return {
    userId,
    pageLength,
  };
};
