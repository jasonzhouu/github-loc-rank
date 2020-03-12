const axios = require('axios');

let currentPage = 2;
let repositories = [];

module.exports = function getPage({ userId, pageLength }) {
  const url = `https://api.github.com/user/${userId}/starred?sort=created&page=${currentPage}`;
  axios.get(url).then((stat) => {
    // console.log(data);
    repositories = repositories.concat(stat.data);
    currentPage += 1;
    if (currentPage <= pageLength) {
      getPage({ userId, pageLength });
    }
  });
};
