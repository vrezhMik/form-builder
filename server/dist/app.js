"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const forms_1 = __importDefault(require("./routes/forms"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI ||
    "mongodb://admin:admin@mongo:27017/?authSource=admin";
app.use((0, cors_1.default)());
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
