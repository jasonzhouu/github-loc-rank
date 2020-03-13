const getStarredRepositories = require('./getStarredRepositories.js');

const token = process.argv[2];

(async function IIFE() {
  const extractedData = getStarredRepositories(token);
  console.log(extractedData);
}());
