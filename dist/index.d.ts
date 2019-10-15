import webpackDevMiddle from "webpack-dev-middleware";
import webpackHotMiddle from "webpack-hot-middleware";
import { Compiler } from "webpack";
import { Context } from "koa";
export declare const koaWebpackDevMiddleware: (compiler: Compiler, options?: webpackDevMiddle.Options | undefined) => (ctx: Context, next: () => Promise<any>) => Promise<void>;
export declare const koaWebpackHotMiddleware: (compiler: Compiler, options?: webpackHotMiddle.Options | undefined) => (ctx: Context, next: () => Promise<any>) => Promise<void>;
export declare const webpackHotMiddleware: (compiler: Compiler, options?: webpackHotMiddle.Options | undefined) => (ctx: Context, next: () => Promise<any>) => Promise<void>;
export declare const webpackDevMiddleware: (compiler: Compiler, options?: webpackDevMiddle.Options | undefined) => (ctx: Context, next: () => Promise<any>) => Promise<void>;
