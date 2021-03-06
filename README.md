# koa-webpack-middleware
提供了Koa版本的webpack 开发插件, webpack-dev-middleware 和 webpack-hot-middleware等，同时支持ts

## 使用方式
```js
const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const {koaWebpackDevMiddleware, koaWebpackHotMiddleware} = require('../dist/koa-webpack-middleware');
const app = new Koa();
const compiler = webpack(webpackConfig);

app.use(koaWebpackDevMiddleware(compiler, {
    host: 'localhost',
    contentBase: './dist',
    log: false,
    stats: {
        colors: true,
        process: true
    }
}))

app.use(koaWebpackHotMiddleware(compiler, {
    log: false,
    path: "/__webpack_hmr",
    heartbeat: 2000,
}))

app.listen(9999, () => {
    console.log('server is running on port: 9999');
})
```