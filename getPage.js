/* eslint-disable consistent-return */
const axios = require('axios');

let currentPage = 2;
let repositories = [];

module.exports = async function getLeftPagesRepositories({ userId, pageLength }) {
  const url = `https://api.github.com/user/${userId}/starred?sort=created&page=${currentPage}`;
  const { data } = await axios.get(url);
  repositories = repositories.concat(data);
  currentPage += 1;
  if (currentPage <= pageLength) {
    await getLeftPagesRepositories({ userId, pageLength });
  }
  return repositories;
};
