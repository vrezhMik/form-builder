import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import formRoutes from "./routes/forms";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://admin:admin@mongo:27017/?authSource=admin";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use("/forms", formRoutes);

async function connectWithRetry(retries = 5, delay = 3000) {
  while (retries > 0) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("✅ MongoDB connected");

      app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });

      return;
    } catch (err) {
      console.error(
        `❌ MongoDB connection failed. Retries left: ${retries - 1}`
      );
      console.error(err);
      retries--;
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  console.error(
    "❌ Could not connect to MongoDB after multiple attempts. Exiting."
  );
  process.exit(1);
}

connectWithRetry();
