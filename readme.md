used to get the LOC of github repositories that are starred.

## example
get the data and write to `json` file:
```javascript
const fs = require('fs');
const getStarredRepositories = require('github-loc-rank');

(async function IIFE() {
  const repositories = await getStarredRepositories({ token: '*****github-token*****', sort: 'created' });
  fs.writeFileSync('./repositories.json', JSON.stringify(repositories, null, '\t'));
}());
```