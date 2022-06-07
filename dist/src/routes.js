"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const Auth_1 = __importDefault(require("./Modules/Auth"));
const Asset_1 = __importDefault(require("./Modules/Asset"));
const Cart_1 = __importDefault(require("./Modules/Cart"));
const Category_1 = __importDefault(require("./Modules/Category"));
const Mail_1 = __importDefault(require("./Modules/Mail"));
const Order_1 = __importDefault(require("./Modules/Order"));
const Product_1 = __importDefault(require("./Modules/Product"));
const User_1 = __importDefault(require("./Modules/User"));
exports.routes = [
    {
        path: '/auth',
        router: Auth_1.default
    },
    {
        path: '/asset',
        router: Asset_1.default
    },
    {
        path: '/cart',
        router: Cart_1.default
    },
    {
        path: '/category',
        router: Category_1.default
    },
    {
        path: '/mail',
        router: Mail_1.default
    },
    {
        path: '/order',
        router: Order_1.default
    },
    {
        path: '/product',
        router: Product_1.default
    },
    {
        path: '/user',
        router: User_1.default
    }
];
