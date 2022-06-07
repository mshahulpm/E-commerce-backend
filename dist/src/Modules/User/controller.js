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
exports.changePassword = exports.userBasicUpdate = void 0;
const bcrypt_1 = require("../../utils/bcrypt");
const user_1 = require("../../services/user");
function userBasicUpdate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.userId;
        try {
            const updatedUser = yield (0, user_1.updateUser)(userId, req.body);
            res.status(200).json({
                message: 'Basic info updated successfully',
                updatedUser
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.userBasicUpdate = userBasicUpdate;
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;
        try {
            const oldPasswordFromDB = (yield (0, user_1.getOneUserById)(userId)).password;
            if (!(yield (0, bcrypt_1.comparePassword)(oldPassword, oldPasswordFromDB))) {
                return res.status(401).json({
                    message: 'Invalid old password'
                });
            }
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(newPassword);
            yield (0, user_1.updateUser)(userId, { password: hashedPassword });
            res.status(200).json({
                message: 'Password changed successfully'
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.changePassword = changePassword;
