import resolve    from 'rollup-plugin-node-resolve';
import commonjs   from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel      from 'rollup-plugin-babel';
import {uglify}   from 'rollup-plugin-uglify';
import {terser}   from 'rollup-plugin-terser';
import config     from './package.json';

const projectName = config.projectName,
      context     = config.projectContext;// top-level context

const input     = './src/index.ts',
      outFile   = './dist/index',
      name      = projectName,// module name
      format    = 'iife',
      sourcemap = true,
      isProd    = process.env.IS_DEV === 'false';

const typescriptConfig = (declaration = false) =>
{
  return {
    tsconfigDefaults:
    {
      compilerOptions:
      {
        target: 'ESNext',
        sourceMap: true,
        declaration,
      },
      exclude: ['node_modules'],
    }
  }
};

const babelConfig =
{
  sourceMaps: true,
  exclude: 'node_modules/**',
  extensions: ['.ts'],
  presets:
  [
    [
      '@babel/env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      }
    ],
  ],
};

const plugins = [resolve(), commonjs()];

export default
[
  // ESNext minified
  isProd && {
    input,
    context,
    output: {format, sourcemap, name, file: `${outFile}.next.min.js`},
    plugins:
    [
      ...plugins,
      typescript(typescriptConfig()),
      terser(),
    ],
  },
  // ES5 minified
  isProd && {
    input,
    context,
    output: {format, sourcemap, name, file: `${outFile}.min.js`},
    plugins:
    [
      ...plugins,
      typescript(typescriptConfig()),
      babel(babelConfig),
      uglify(),
    ],
  },
  // As UMD module
  isProd && {
    input,
    context,
    output:
    {
      name,
      format: 'umd',
      file: `${outFile}.umd.js`,
    },
    plugins:
    [
      ...plugins,
      typescript(typescriptConfig(true)),
    ],
  },
].filter(o => o);
