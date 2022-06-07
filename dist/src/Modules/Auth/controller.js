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
exports.verifyOtp = exports.sendOtp = exports.signup = exports.login = void 0;
const user_1 = require("../../services/user");
const bcrypt_1 = require("../../utils/bcrypt");
const jwt_1 = require("../../utils/jwt");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, user_1.getOneUserByEmail)(email);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const isValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
            if (!isValid) {
                return res.status(401).json({
                    message: 'Invalid password'
                });
            }
            const accessToken = yield (0, jwt_1.signToken)({
                userId: user.userId,
                role: user.roles,
                email: user.email
            });
            // @ts-ignore
            user === null || user === void 0 ? true : delete user.password;
            return res.status(200).json({
                message: 'Login successful',
                accessToken,
                user
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.login = login;
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, user_1.getOneUserByEmail)(email);
            if (user) {
                return res.status(409).json({
                    message: 'User already exists'
                });
            }
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            const newUser = yield (0, user_1.createUser)({
                email,
                password: hashedPassword
            });
            const accessToken = yield (0, jwt_1.signToken)({
                userId: newUser.userId,
                role: newUser.roles,
                email: newUser.email
            });
            res.status(201).json({
                message: 'User created successfully',
                accessToken
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.signup = signup;
function sendOtp(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }
    res.status(200).json({
        message: 'Otp sent successfully'
    });
}
exports.sendOtp = sendOtp;
function verifyOtp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const otp = req.body.otp;
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        if (otp === '12345') {
            const verifiedUser = yield (0, user_1.verifyUser)(user.userId);
            res.status(200).json({
                message: 'Email verified successfully'
            });
        }
        else {
            return res.status(401).json({
                message: 'Invalid otp'
            });
        }
    });
}
exports.verifyOtp = verifyOtp;
