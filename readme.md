[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]

## used to
Rank the lines of code (LOC) of github repositories that are starred by you.

## reason why create it
because I want to join the contribution of open source repository on github, but I don't want to join a repository that's too large. I want to join the repository that is less than 20,000 lines of code, so I need to know the LOC of them.

But github don't show me the LOC. There some browser extensions can show the LOC of github repository. But they still can't fill my needs. I need to get all repositories that are written in Javascript and LOC < 20,000. So I write it by myself.

## try it online
https://jasonzhouu.github.io/github-loc-rank/

<img src="https://i.ibb.co/Wvc2TXk/screenshot-jasonzhouu-github-io-2020-03-15-18-18-18.png" alt="screenshot-jasonzhouu-github-io-2020-03-15-18-18-18" border="0">

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
  const starredRepositories = new StarredRepositories);
  await starredRepositories.init('your-github-token');
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
