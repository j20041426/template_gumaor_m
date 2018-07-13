const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '项目名称',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: '项目描述',
      default: '古猫移动端项目',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: '作者',
      default: 'egg'
    },
    build: {
      when: 'isNotTest',
      type: 'list',
      message: 'Vue build',
      choices: [
        {
          name: 'Runtime + Compiler: 运行环境 + 编译工具（就选这个）',
          value: 'standalone',
          short: 'standalone',
        },
        {
          name:
            'Runtime-only: 运行环境',
          value: 'runtime',
          short: 'runtime',
        },
      ],
    },
    router: {
      when: 'isNotTest',
      type: 'confirm',
      message: '是否安装vue-router？',
    },
    testing: {
      when: 'isNotTest',
      type: 'confirm',
      message: '是否启用测试环境？',
    },
    unit: {
      when: 'isNotTest',
      type: 'confirm',
      message: '是否设置单元测试？',
    },
    runner: {
      when: 'isNotTest && unit',
      type: 'list',
      message: '选择单元测试引擎',
      choices: [
        {
          name: 'Jest',
          value: 'jest',
          short: 'jest',
        },
        {
          name: 'Karma and Mocha',
          value: 'karma',
          short: 'karma',
        },
        {
          name: '无（自己配置）',
          value: 'noTest',
          short: 'noTest',
        },
      ],
    },
    e2e: {
      when: 'isNotTest',
      type: 'confirm',
      message: '是否使用Nightwatch设置端到端测试？',
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message:
        '创建项目后是否自动运行 `npm install`？',
      choices: [
        {
          name: '好的，使用NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: '好的，使用Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: '不，我自己处理',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    'src/router.js': 'router',
    'build/testing.js': 'testing',
    'webpack.testing.conf.js': 'testing',
    'config/testing.env.js': 'testing'
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
