"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const forms_1 = __importDefault(require("./routes/forms"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 30,
});
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "";
console.log(MONGO_URI);
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((0, helmet_1.default)());
app.use(limiter);
app.use(express_1.default.json());
app.use("/forms", forms_1.default);
async function connectWithRetry(retries = 5, delay = 3000) {
    while (retries > 0) {
        try {
            await mongoose_1.default.connect(MONGO_URI);
            console.log("✅ MongoDB connected");
            app.listen(PORT, () => {
                console.log(`🚀 Server is running on http://localhost:${PORT}`);
            });
            return;
        }
        catch (err) {
            console.error(`❌ MongoDB connection failed. Retries left: ${retries - 1}`);
            console.error(err);
            retries--;
            await new Promise((res) => setTimeout(res, delay));
        }
    }
    console.error("❌ Could not connect to MongoDB after multiple attempts. Exiting.");
    process.exit(1);
}
connectWithRetry();
