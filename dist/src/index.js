"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const common_1 = require("./middlewares/common");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// logger
app.use(common_1.logger);
// user details 
app.use(common_1.getUserDetails);
routes_1.routes.forEach(route => {
    app.use(route.path, route.router);
});
// 404 handler
app.use('*', common_1.notFound404);
// 500 Internal Server Error
app.use(common_1.error500);
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
