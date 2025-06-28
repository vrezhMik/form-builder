"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeField = sanitizeField;
exports.sanitizeFormInput = sanitizeFormInput;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
function sanitizeField(field) {
    return {
        ...field,
        label: (0, sanitize_html_1.default)(field.label || "", {
            allowedTags: [],
            allowedAttributes: {},
        }),
        settings: {
            ...field.settings,
            placeholder: (0, sanitize_html_1.default)(field.settings?.placeholder || "", {
                allowedTags: [],
                allowedAttributes: {},
            }),
            options: Array.isArray(field.settings?.options)
                ? field.settings.options.map((opt) => (0, sanitize_html_1.default)(opt, { allowedTags: [], allowedAttributes: {} }))
                : [],
            defaultOption: (0, sanitize_html_1.default)(field.settings?.defaultOption || "", {
                allowedTags: [],
                allowedAttributes: {},
            }),
        },
    };
}
function sanitizeFormInput(name, fields) {
    return {
        name: (0, sanitize_html_1.default)(name || "", { allowedTags: [], allowedAttributes: {} }),
        fields: fields.map(sanitizeField),
    };
}
