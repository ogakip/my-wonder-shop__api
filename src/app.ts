import express from "express";
const cors = require("cors");
import { Request, Response } from "express";

const app = express();

app.use('/', (req: Request, res: Response) => {
    return res.json({ message: 'hello world' })
})

app.use(express.json());
app.use(cors());

export default app;
