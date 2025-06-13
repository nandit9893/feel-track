import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import homeRouter from "./routes/home.routes.js";
import aboutRouter from "./routes/about.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("✅ Server is running correctly!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/about", aboutRouter);

export default app;
