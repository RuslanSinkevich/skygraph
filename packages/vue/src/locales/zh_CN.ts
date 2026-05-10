import type { SgLocale } from '../types'

/** Chinese (Simplified, zh-CN) preset for {@link SgConfigProvider} `locale`. */
export const zh_CN: SgLocale = {
  modal: {
    okText: '确定',
    cancelText: '取消',
  },
  popconfirm: {
    okText: '确定',
    cancelText: '取消',
  },
  empty: {
    description: '暂无数据',
  },
  pagination: {
    totalPrefix: '共',
    itemsPerPage: ' 条/页',
    jump: '跳至',
    page: '页',
  },
  inputPassword: {
    showPassword: '显示密码',
    hidePassword: '隐藏密码',
    strengthWeak: '弱',
    strengthMedium: '中',
    strengthStrong: '强',
    strengthVeryStrong: '非常强',
  },
  searchInput: {
    placeholder: '搜索…',
    clear: '清除',
    search: '搜索',
  },
  tagInput: {
    placeholder: '添加标签…',
    removeTag: '删除',
  },
  pinInput: {
    ariaLabel: 'PIN 输入',
  },
  inlineEdit: {
    placeholder: '点击编辑…',
    save: '保存',
    cancel: '取消',
  },
}
