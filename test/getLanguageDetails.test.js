const getLanguageDetails = require('../getLanguageDetails.js');

(async function IIFE() {
  console.log(
    await getLanguageDetails('bitcoin/bitcoin', '7420af224d5e2034e4f07f338f594000a88460e8'),
  );
}());
