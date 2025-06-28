"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const formSchema = new mongoose_1.Schema({
    name: { type: String, default: "" },
    fields: { type: Array, default: [] },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Form", formSchema);
