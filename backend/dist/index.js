import mongoose from "mongoose";
import app from "./app.js";
import { getConfig } from "./config.js";
const config = getConfig();
const DB_URL = config.DB_URL;
const PORT = config.PORT;
async function startServer() {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
startServer();
