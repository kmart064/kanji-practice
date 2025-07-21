import "./preload.js";

import app from "./app.js";
import deckManagerRouter from "./routes/deckManagerRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const port = process.env.PORT || 5000;

app.use("/api", deckManagerRouter);
app.use("/review", reviewRouter);

// Global error middleware should be the last middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
