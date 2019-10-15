const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const {koaWebpackDevMiddleware, koaWebpackHotMiddleware} = require('../dist/index');
const app = new Koa();
const compiler = webpack(webpackConfig);

app.use(koaWebpackDevMiddleware(compiler, {
    host: 'localhost',
    contentBase: './dist',
    log: false,
    stats: {
        colors: true, // webpack编译输出日志带上颜色，相当于命令行 webpack –colors
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