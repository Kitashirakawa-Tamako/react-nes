import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>rollup-react-component</span>,
  project: {
    link: 'https://github.com/Kitashirakawa-Tamako/rollup-react-component.git',
  },
  i18n: [
    { locale: 'en-US', name: 'English' },
    { locale: 'zh-CN', name: '简体中文' }
  ]
}

export default config