import "./preload.js";

import app from "./app.js";
import deckManagerRouter from "./routes/deckManagerRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const port = Number(process.env.PORT) || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://kanji-practice-omega.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/api", deckManagerRouter);
app.use("/review", reviewRouter);

// Global error middleware should be the last middleware
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on port ${port}`);
});
