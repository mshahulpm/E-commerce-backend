"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const { login } = controller_1.UserController;
const router = (0, express_1.Router)();
router.route('/')
    .get((req, res) => {
    res.status(200).json({ message: 'Hello users!' });
});
router.route('/login')
    .post(login);
router.route('/:id')
    .get((req, res) => {
    if (req.params.id === '1') {
        throw new Error('User not found');
    }
    res.status(200).json({ message: 'Hello user with id: ' + req.params.id });
});
exports.default = router;
