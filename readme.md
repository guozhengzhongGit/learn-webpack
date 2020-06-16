###
##### `TODO`
- [ ] `CSS` 模块
- [X] 环境变量读取 - mode 参数和 `DefinePlugin` 只能设置浏览器端的全局变量，node 环境需要使用 `cross-env`
- [X] `HMR` 报错解决 - `dev` 环境下 `speed-measure-webpack-plugin` 与 `HMR` 冲突
- [X] 构建以后的代码没有样式文件 - 被 production 的 mode 给 Treeshaking 优化掉了，在 CSS 模块化引用支持之前先在 package.json 中声明 sideEffects 数组来解决
- [X] 完成查看构建生成文件体积的 npm 脚本 - 获取命令行中传递的参数来判断是否使用 webpack-bundle-analyzer 插件