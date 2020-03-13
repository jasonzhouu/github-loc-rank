/* eslint-disable no-unused-vars */
const getStarredRepositories = require('../getStarredRepositories.js');

// 7420af224d5e2034e4f07f338f594000a88460e8
(async function IIFE() {
  const repositories = await getStarredRepositories({ token: '7420af224d5e2034e4f07f338f594000a88460e8', sort: 'created' });
}());
