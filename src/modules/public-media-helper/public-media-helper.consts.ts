import { ToolProperty } from "@inf-monkeys/monkeys"

export const CONTENT_TYPE_PROPERTY: ToolProperty = {
  name: 'contentType',
  displayName: {
    'zh-CN': '文件类型',
    'en-US': 'File Type',
  },
  required: false,
  type: 'string',
  description: {
    'zh-CN':
      '文件类型，为空时首先使用文件 Url 的 Content-Type，不存在则从 Url 的文件名中提取',
    'en-US':
      'File Type, if empty, first use the Content-Type of the file Url, if not exist, extract from the file name of the Url',
  },
}

export const FILE_URL_REGEX_PROPERTY: ToolProperty = {
  name: 'fileUrlRegex',
  displayName: {
    'zh-CN': '文件 Url 替换正则表达式',
    'en-US': 'File Url Regex',
  },
  required: false,
  type: 'string',
  description: {
    'zh-CN': '文件 Url 替换正则表达式，为空时不替换',
    'en-US': 'File Url Replace Regex, if empty, not replace',
  },
}

export const FILE_URL_REPLACE_PROPERTY: ToolProperty = {
  name: 'fileUrlReplace',
  displayName: {
    'zh-CN': '文件 Url 替换内容',
    'en-US': 'File Url Replace',
  },
  required: false,
  type: 'string',
  description: {
    'zh-CN': '文件 Url 替换内容，支持 $1 $2 等变量',
    'en-US': 'File Url Replace, support $1 $2 etc.',
  },
}