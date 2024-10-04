import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import config from './package.json' assert {type: 'json'};

const projectName = config.projectName;
const input = './src/index.ts';
const outFile = './dist/index';
const name = projectName;// module name
const isProd = process.env.IS_DEV === 'false';

const typescriptConfig = (declaration = false) => {
  return {
    tsconfig: 'tsconfig.json',
    tsconfigOverride: {
      compilerOptions: {
        declaration,
      },
    }
  }
};

const plugins = [resolve(), commonjs()];

export default [
  // ESNext minified
  isProd && {
    input,
    output: {
      name,
      format: 'iife',
      file: `${outFile}.next.min.js`,
    },
    plugins: [
      ...plugins,
      typescript(typescriptConfig()),
      terser(),
    ],
  },
  // ES module
  {
    input,
    output: {
      name,
      format: 'es',
      file: `${outFile}.js`,
    },
    plugins: [
      ...plugins,
      typescript(typescriptConfig(true)),
    ],
  },
].filter(Boolean);
