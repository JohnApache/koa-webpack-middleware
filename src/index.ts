import webpackDevMiddle, {
	Options as DevOptions,
	WebpackDevMiddleware
} from "webpack-dev-middleware";
import webpackHotMiddle, {
    Options as HotOptions,
	EventStream as WebpackHotMiddleware
} from "webpack-hot-middleware";

import { Compiler } from "webpack";
import { NextHandleFunction } from "connect";
import { Context } from "koa";
import { ServerResponse, IncomingMessage } from "http";

type InjectedResponse = ServerResponse & {
    send(content: any): any,
    setHeader(key: string, value: string | string[]): void
}


const applyWebpackDevMiddleware = (
	middleware: WebpackDevMiddleware& NextHandleFunction,
    req: IncomingMessage,
    res: InjectedResponse
): Promise<boolean> => {
    const _send = res.send;
    return new Promise((resolve, reject) => {
        try {
            res.send = (content: any) => {
                _send && _send.call(res, content) && resolve(false)
            }
            middleware(req, res, () => resolve(true))
        } catch (error) {
            reject(error);
        }
    })
};

const applyWebpackHotMiddleware = (
	middleware: WebpackHotMiddleware & NextHandleFunction,
    req: IncomingMessage,
    res: ServerResponse 
): Promise<boolean> => {
    const _end = res.end;
    return new Promise((resolve, reject) => {
        try {
            res.end = function(...params: any) {
                _end && _end.apply(this, params);
                resolve(false);
            }
            middleware(req, res, () => resolve(true))
        } catch (error) {
            reject(error);
        }
    })
};

export const koaWebpackDevMiddleware = (compiler: Compiler, options?: DevOptions) => {
    const middleware = webpackDevMiddle(compiler, options)
	return async (ctx: Context, next: () => Promise<any>) => {
        const hasNext = await applyWebpackDevMiddleware(
            middleware, 
            ctx.req,
            Object.assign({}, ctx.res, {
                send(content: any) {
                    return ctx.body = content
                },
                setHeader(key: string, value: string | string[]) {
                    ctx.set.call(ctx, key, value);
                },
                locals: ctx.locals || ctx.state
            })
        );
        hasNext && await next();
    };
};


export const koaWebpackHotMiddleware = (compiler: Compiler, options?: HotOptions) => {
    const middleware = webpackHotMiddle(compiler, options);
	return async (ctx: Context, next: () => Promise<any>) => {
        const hasNext = await applyWebpackHotMiddleware(
            middleware, 
            ctx.req, 
            ctx.res
        );
        hasNext && await next();
    };
}

export const webpackHotMiddleware = koaWebpackHotMiddleware;
export const webpackDevMiddleware = koaWebpackDevMiddleware;

