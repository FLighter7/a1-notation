# 3.0.0

- Updated all dependencies
- Added Prettier and reformatted the whole codebase to a single consistent style
- Added ESLint (flat config) and fixed all findings
- **Breaking:** rebuilt the package with tsdown to publish both ESM (`dist/index.mjs`) and CommonJS (`dist/index.cjs`) with matching `.d.mts`/`.d.cts` types, wired up via `package.json#exports`. The browser bundle moved from `dist/index.next.min.js` to `dist/index.global.iife.js`
- Added `engines.node >= 14`

# 2.2.1

- Updated README

# 2.2.0

- Updated packages
- Removed UMD version
- Changed package.json type to module
- Fixed errors after update
- Updated README

# 2.1.3

- Updated packages

# 2.1.2

- Removed "named" exports (didn't work)

# 2.1.1

- Fixed default exports (didn't work)

# 2.1.0

- Deleted sourcemaps
- Deleted ES5 minified version
- Added named export
- Updated packages

# 2.0.2

- Deleted ES5, ESNext full versions
- Updated packages

# 2.0.0

- Deleted the version "without object"
- Optimized the library
- Added new methods `set*`
- Updated documentation
- Changed tab indents to spaces
- Updated name in the license

# 1.0.7

- Packages updated

# 1.0.6

- README updated
- Packages updated

# 1.0.5

- Removed `any` types
- README updated

# 1.0.4

- Fixed: invalid results in static functions for non-standard A1 like "E3:C5", "E5:C3", "C5:E3"

# 1.0.3

- README changed
- Removed unused files from npm module by adding "files" to "package.json"
- Added path to ".d.ts" file
