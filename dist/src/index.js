"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./Modules/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log('Request: ', req.method, req.url);
    next();
});
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
app.use('/users', User_1.default);
// 404 handler
app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    });
});
// 500 Internal Server Error
app.use((error, req, res, next) => {
    console.log('Error: ', error);
    res.status(500).json({
        message: error.message,
    });
});
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
