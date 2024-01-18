import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { type RollupOptions } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import babelMinify from 'rollup-plugin-babel-minify'

const config: RollupOptions = {
  input: 'src/components/HelloWorld.tsx',
  external: ['react', 'react-dom'],
  output: {
    file: 'es/index.js',
    format: 'es',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    postcss(),
    image(),
    babelMinify({
      removeConsole: true
    })
  ],
  cache: false
}
export default config
