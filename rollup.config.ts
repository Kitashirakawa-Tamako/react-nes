import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import { join, resolve } from 'path'
import { readdir, unlink, rmdir, lstat } from 'fs/promises'
import { type RollupOptions, defineConfig } from 'rollup'
import { existsSync } from 'fs'
/**
 * @description 根据路径删除目录
 * @param dirs 删除的目录路径
 */
const removeDir = async (...dirs: string[]): Promise<void> => {
  for (const dir of dirs) {
    const absolutePath = resolve(dir)
    if (existsSync(absolutePath)) {
      const dirStack = [absolutePath]
      while (dirStack.length > 0) {
        const initPath = dirStack[dirStack.length - 1]
        const fileStat = await lstat(initPath)
        if (fileStat.isDirectory()) {
          const files = await readdir(initPath)
          if (files.length > 0) {
            dirStack.push(...files.map((e) => join(initPath, e)))
          } else {
            await rmdir(initPath)
            dirStack.pop()
          }
        } else if (fileStat.isFile()) {
          await unlink(initPath)
          dirStack.pop()
        }
      }
    }
  }
}
export default defineConfig(async (/* commandLineArgs */) => {
  await removeDir('es')
  const config: RollupOptions = {
    input: 'src/components/index.ts',
    external: ['react', 'react-dom', 'jsnes', 'gamecontroller.js'],
    output: {
      file: 'es/index.js',
      format: 'es',
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
            './src/components',
            'type.d.ts'
          ]
        }
      }),
      nodeResolve(),
      commonjs(),
      postcss(),
      image()
    ]
  }
  return [config]
})
