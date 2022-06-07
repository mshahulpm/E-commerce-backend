"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDetails = exports.logger = exports.error500 = exports.notFound404 = void 0;
const jwt_1 = require("../utils/jwt");
function notFound404(req, res, next) {
    const err = new Error('Not Found');
    res.status(404).json({
        message: 'Not Found'
    });
}
exports.notFound404 = notFound404;
function error500(err, req, res, next) {
    console.log('Error: ', err);
    res.status(500).json({
        message: err.message,
    });
}
exports.error500 = error500;
function logger(req, res, next) {
    if (process.env.NODE_ENV === 'production')
        return next();
    console.log('Request: ', req.method, req.url);
    next();
}
exports.logger = logger;
function getUserDetails(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return next();
        try {
            const user = yield (0, jwt_1.decodeToken)(token);
            // @ts-ignore
            req.user = user;
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getUserDetails = getUserDetails;
