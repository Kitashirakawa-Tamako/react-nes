import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>React Nes</span>,
  project: {
    link: 'https://github.com/Kitashirakawa-Tamako/react-nes'
  },
  i18n: [
    { locale: 'zh-CN', name: '简体中文' },
    { locale: 'en-US', name: 'English' }
  ]
}

export default config
