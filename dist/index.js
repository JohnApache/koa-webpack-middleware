"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var applyWebpackDevMiddleware = function (middleware, req, res) {
    var _send = res.send;
    return new Promise(function (resolve, reject) {
        try {
            res.send = function (content) {
                _send && _send.call(res, content) && resolve(false);
            };
            middleware(req, res, function () { return resolve(true); });
        }
        catch (error) {
            reject(error);
        }
    });
};
var applyWebpackHotMiddleware = function (middleware, req, res) {
    var _end = res.end;
    return new Promise(function (resolve, reject) {
        try {
            res.end = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                _end && _end.apply(this, params);
                resolve(false);
            };
            middleware(req, res, function () { return resolve(true); });
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.koaWebpackDevMiddleware = function (compiler, options) {
    var middleware = webpack_dev_middleware_1.default(compiler, options);
    return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
        var hasNext, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, applyWebpackDevMiddleware(middleware, ctx.req, Object.assign({}, ctx.res, {
                        send: function (content) {
                            return ctx.body = content;
                        },
                        setHeader: function (key, value) {
                            ctx.set.call(ctx, key, value);
                        },
                        locals: ctx.locals || ctx.state
                    }))];
                case 1:
                    hasNext = _b.sent();
                    _a = hasNext;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, next()];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    _a;
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.koaWebpackHotMiddleware = function (compiler, options) {
    var middleware = webpack_hot_middleware_1.default(compiler, options);
    return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
        var hasNext, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, applyWebpackHotMiddleware(middleware, ctx.req, ctx.res)];
                case 1:
                    hasNext = _b.sent();
                    _a = hasNext;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, next()];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    _a;
                    return [2 /*return*/];
            }
        });
    }); };
};
exports.webpackHotMiddleware = exports.koaWebpackHotMiddleware;
exports.webpackDevMiddleware = exports.koaWebpackDevMiddleware;
