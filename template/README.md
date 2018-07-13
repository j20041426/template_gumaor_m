# {{ name }}

> {{ description }}

## Build Setup

``` bash
# 安装依赖
npm install

# 启动本地调试
npm run dev

{{#testing}}
# 打包测试版本
npm run testing
{{/testing}}

# 打包正式版本
npm run build

# 打包正式版本并分析依赖库大小
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
