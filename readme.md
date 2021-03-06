###
### webpack 动态导入
```
loadImg() {
  import(/* webpackChunkName: "asyncImage" */'components/Image').then(({default: Comp}) => {
    this.setState({
      Comp
    })
  })
}
render() {
  const { Comp } = this.state;
  return (
    <div>
      <button onClick={this.loadImg.bind(this)}>加载图片</button>
      <div className="img">{Comp ? <Comp src={example} /> : null}</div>
    </div>
  )
}
```
- - -
##### `TODO`
- [ ] `CSS` 模块化导入
- [X] 环境变量读取 - mode 参数和 `DefinePlugin` 只能设置浏览器端的全局变量，node 环境需要使用 `cross-env`
- [X] `HMR` 报错解决 - `dev` 环境下 `speed-measure-webpack-plugin` 与 `HMR` 冲突
- [X] `HMR` 开发模式下生成的包文件不能使用 `chunkhash`，需要根据环境变量做判断
- [X] 构建以后的代码没有样式文件 - 被 production 的 mode 给 Treeshaking 优化掉了，在 CSS 模块化引用支持之前先在 package.json 中声明 sideEffects 数组来解决
- [X] 完成查看构建生成文件体积的 npm 脚本 - 获取命令行中传递的参数来判断是否使用 webpack-bundle-analyzer 插件
- [X] 代码中使用 async 和 await 报 regeneratorRuntime is not defined 的错误 - 安装 @babel/runtime 和插件 @babel/plugin-transform-runtime 解决
- [X] 将框架包单独打成一个 vendor 文件引入，最大限度利用缓存，业务包如 highlight.js 配置 externals 从外部 CDN 引入
- [X] 通过环境变量切换线上、线下和测试等多环境的请求地址
