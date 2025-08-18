import express from 'express';
import type { Express, Request, Response } from 'express';

import cors from 'cors';
import { messageRouter } from './routes/messageRoutes';

const app: Express = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Routes ---
app.use('/api/messages', messageRouter);

// --- Error handling ---
app.use((req: Request, res: Response) => {
    res.status(404).send('404: Page not found');
});

// --- Server startup ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
    console.log(`Available at: http://localhost:${PORT}`);
});
