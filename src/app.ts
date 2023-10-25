import express from "express";
const cors = require("cors");
import { Request, Response } from "express";
import userRouter from "./routes/user.routes";
import productRoutes from "./routes/products.routes";
import commentRoutes from "./routes/comment.routes";
import ratingRoutes from "./routes/rating.routes";

const app = express();

app.use('/api/user', userRouter)
app.use('/api/product', productRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/rating', ratingRoutes)
app.use(express.json());
app.use(cors());

export default app;
