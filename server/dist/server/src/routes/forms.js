"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Form_1 = __importDefault(require("../models/Form"));
const sanitizers_1 = require("../utils/sanitizers");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const { name, fields } = (0, sanitizers_1.sanitizeFormInput)(req.body.name, req.body.fields);
        const form = await Form_1.default.create({ name, fields });
        res.status(201).json(form);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const forms = await Form_1.default.find().sort({ createdAt: -1 });
        res.json(forms);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const form = await Form_1.default.findById(req.params.id);
        if (!form)
            return res.status(404).json({ error: "Form not found" });
        res.json(form);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const { name, fields } = (0, sanitizers_1.sanitizeFormInput)(req.body.name, req.body.fields);
        const updated = await Form_1.default.findByIdAndUpdate(req.params.id, { name, fields }, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Form not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Form_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: "Form not found" });
        res.json({ message: "Form deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
