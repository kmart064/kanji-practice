import app from './app.js';
import * as dotenv from 'dotenv';
import deckManagerRouter from './routes/deckManagerRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import { errorHandler } from "./middlewares/errorMiddleware.js";

// Load environment-specific configuration
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const port = process.env.PORT || 5000;

app.use('/api', deckManagerRouter);
app.use('/review', reviewRouter);

// Global error middleware should be the last middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});