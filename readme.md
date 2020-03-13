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
  // get the 1st page
  await starredRepositories.init();
  // get next page
  await starredRepositories.getNextPageData();
  // get the extracted data
  const extractedData = starredRepositories.get();
  fs.writeFileSync('./repositories.json', JSON.stringify(extractedData, null, '\t'));
}());

```