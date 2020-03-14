[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]


used to get the LOC of github repositories that are starred.

## try it online
https://jasonzhouu.github.io/github-loc-rank/

<img src="https://i.ibb.co/zxwYXn6/screenshot-localhost-8080-2020-03-14-16-17-14.png" alt="screenshot-localhost-8080-2020-03-14-16-17-14" border="0">

## import package 
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
