import { Request, Response, Router } from "express";

const ratingRoutes = Router()

ratingRoutes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World' })
})

export default ratingRoutes