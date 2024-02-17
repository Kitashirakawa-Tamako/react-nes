import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: false,
  search: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

export default withNextra({
  output: 'export',
  eslint: {
    // Eslint behaves weirdly in this monorepo.
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['zh-CN','en-US'],
    defaultLocale: 'zh-CN'
  },
  redirects: () => [
    {
      source: '/',
      destination: '/zh-CN',
      permanent: true
    }
  ]
})