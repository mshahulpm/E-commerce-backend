"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { UserController } from "../controllers/UserController";
const router = (0, express_1.Router)();
router.route('/')
    .get((req, res) => {
    res.status(200).json({ message: 'Hello users!' });
});
router.route('/:id')
    .get((req, res) => {
    res.status(200).json({ message: 'Hello user with id: ' + req.params.id });
});
exports.default = router;
