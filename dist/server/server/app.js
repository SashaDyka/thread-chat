"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const messageRoutes_1 = require("./routes/messageRoutes");
const app = (0, express_1.default)();
// --- Middleware ---
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// --- Routes ---
app.use('/api/messages', messageRoutes_1.messageRouter);
// --- Error handling ---
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});
// --- Server startup ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
    console.log(`Available at: http://localhost:${PORT}`);
});
