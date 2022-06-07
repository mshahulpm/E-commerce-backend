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
exports.updateUser = exports.verifyUser = exports.createUser = exports.getOneUserById = exports.getOneUserByEmail = void 0;
const client_1 = require("@prisma/client");
const { user, } = new client_1.PrismaClient();
const { Prisma__UserClient } = client_1.Prisma;
function getOneUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user.findUnique({
            where: {
                email
            },
            select: {
                userId: true,
                email: true,
                password: true,
                roles: true,
                firstName: true,
                lastName: true,
                emailVerified: true,
            }
        });
    });
}
exports.getOneUserByEmail = getOneUserByEmail;
function getOneUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user.findUnique({
            where: {
                userId: id
            }
        });
    });
}
exports.getOneUserById = getOneUserById;
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user.create({
            data
        });
    });
}
exports.createUser = createUser;
function verifyUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user.update({
            where: {
                userId: id
            },
            data: {
                emailVerified: true
            }
        });
    });
}
exports.verifyUser = verifyUser;
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user.update({
            where: {
                userId: id
            },
            data
        });
    });
}
exports.updateUser = updateUser;
