"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Mongoose } from 'mongoose';
const express_1 = __importDefault(require("express"));
// Initializations
const app = (0, express_1.default)();
app.set("port", 4001);
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
