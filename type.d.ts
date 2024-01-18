declare module '*.module.scss' {
  const classes: Readonly<Record<string, string>>
  export default classes
}

declare module 'rollup-plugin-babel-minify'
