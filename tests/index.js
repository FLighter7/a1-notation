const {readdirSync, statSync} = require('fs');

// Module
const A1 = require('../dist/index.umd.js');

// Dynamic require all tests
const isNotPrivate = item => !item.startsWith('_'),
      isDirectory  = path => statSync(path).isDirectory(),
      isFile       = path => statSync(path).isFile(),
      root         = __dirname;

for(const scope of readdirSync(root))
{
  const pathToScope = `${root}/${scope}`;
  const isScope = isNotPrivate(scope) && isDirectory(pathToScope);

  if(!isScope)
    continue;

  for(const method of readdirSync(pathToScope))
  {
    const isMethod = isNotPrivate(method) && isFile(`${pathToScope}/${method}`);

    if(!isMethod)
      continue;

    require(`./${scope}/${method}`)(A1);// run test
  }
}
