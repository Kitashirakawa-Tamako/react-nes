import type { RollupOptions } from 'rollup'

const config: RollupOptions = {
  /* 你的配置 */
  input: 'src/components/HelloWorld.tsx',
  output: {
    file: 'es/index.js',
    format: 'es'
  }
}
export default config
