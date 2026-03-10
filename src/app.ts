import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
// import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use("/api/v1", router);

const test = (req: Request, res: Response) => {
  res.send(`Hello from Tour Management Server`);
};

app.get(`/`, test);

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
