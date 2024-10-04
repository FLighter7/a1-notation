import {readdirSync, statSync} from 'node:fs';

// Module
import A1 from '../dist/index.js';

// Dynamic require all tests
const isNotPrivate = item => !item.startsWith('_'),
      isDirectory  = path => statSync(path).isDirectory(),
      isFile       = path => statSync(path).isFile(),
      root         = import.meta.dirname;

for(const scope of readdirSync(root)) {
  const pathToScope = `${root}/${scope}`;
  const isScope = isNotPrivate(scope) && isDirectory(pathToScope);

  if(!isScope)
    continue;

  for(const method of readdirSync(pathToScope))
  {
    const isMethod = isNotPrivate(method) && isFile(`${pathToScope}/${method}`);

    if(!isMethod)
      continue;

    // Run test
    const test = await import(`./${scope}/${method}`);
    test.default(A1);
  }
}
