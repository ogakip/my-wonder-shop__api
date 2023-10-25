import { Request, Response, Router } from "express";

const commentRoutes = Router()

commentRoutes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World' })
})

export default commentRoutes