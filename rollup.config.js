import resolve    from 'rollup-plugin-node-resolve';
import commonjs   from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import {terser}   from 'rollup-plugin-terser';
import config     from './package.json';

const projectName = config.projectName,
      context     = config.projectContext;// top-level context

const input     = './src/index.ts',
      outFile   = './dist/index',
      name      = projectName,// module name
      format    = 'iife',
      sourcemap = false,
      isProd    = process.env.IS_DEV === 'false';

const typescriptConfig = (declaration = false) =>
{
  return {
    tsconfigDefaults:
    {
      compilerOptions:
      {
        target: 'ESNext',
        sourceMap: sourcemap,
        declaration,
      },
      exclude: ['node_modules'],
    }
  }
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
