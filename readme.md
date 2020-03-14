[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]


used to get the LOC of github repositories that are starred.

## usage
install:
```bash
npm i github-loc-rank -S
```

get the data and write to `json` file:
```javascript
const fs = require('fs');
const StarredRepositories = require('github-loc-rank');

(async function IIFE() {
  const starredRepositories = new StarredRepositories({
    token: 'your-github-token',
  });
  await starredRepositories.init();
  // get one page
  await starredRepositories.getOnePage();
  // get the extracted data
  const extractedData = starredRepositories.get();
  fs.writeFileSync('./repositories.json', JSON.stringify(extractedData, null, '\t'));
}());

```


[npm-image]: https://flat.badgen.net/npm/v/github-loc-rank
[npm-url]: https://www.npmjs.com/package/github-loc-rank
[install-size-image]: https://flat.badgen.net/packagephobia/install/github-loc-rank
[install-size-url]: https://packagephobia.now.sh/result?p=github-loc-rank
