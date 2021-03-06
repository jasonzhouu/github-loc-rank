[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]

## used to
Rank the lines of code (LOC) of github repositories that are starred by you.

## reason why create it
because I want to join the contribution of open source repository on github, but I don't want to join a repository that's too large. I want to join the repository that is less than 20,000 lines of code, so I need to know the LOC of them.

But github don't show me the LOC. There some browser extensions can show the LOC of github repository. But they still can't fill my needs. I need to get all repositories that are written in Javascript and LOC < 20,000. So I write it by myself.

## try it online
https://jasonzhouu.github.io/github-loc-rank/

<img src="https://i.ibb.co/T1QNLs6/screenshot-localhost-8080-2020-03-15-20-23-18.png" alt="screenshot-localhost-8080-2020-03-15-20-23-18" border="0">

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
  const starredRepositories = new StarredRepositories();
  let data = [];
  data = await starredRepositories.init('your-github-token');
  fs.writeFileSync('./repositories1.json', JSON.stringify(data, null, '\t'));
  data = await starredRepositories.load();
  fs.writeFileSync('./repositories2.json', JSON.stringify(data, null, '\t'));
}());

```


[npm-image]: https://flat.badgen.net/npm/v/github-loc-rank
[npm-url]: https://www.npmjs.com/package/github-loc-rank
[install-size-image]: https://flat.badgen.net/packagephobia/install/github-loc-rank
[install-size-url]: https://packagephobia.now.sh/result?p=github-loc-rank
