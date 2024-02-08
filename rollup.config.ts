import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
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
    format: 'esm',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: { jsx: 'react-jsx' },
        include: [
          'type.d.ts',
          'src/components'
        ]
      }
    }),
    nodeResolve(),
    postcss(),
    commonjs(),
    image(),
    babelMinify({
      removeConsole: true
    })
  ]
}
export default config
