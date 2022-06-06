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
exports.UserController = void 0;
const jwt_1 = require("../../middlewares/jwt");
const common_1 = require("../../types/common");
exports.UserController = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield (0, jwt_1.signToken)({
                id: 1,
                name: 'John Doe',
                role: common_1.UserRoleKey.role_1
            });
            res.status(200).json({
                token
            });
        }
        catch (error) {
            next(error);
        }
    })
};
