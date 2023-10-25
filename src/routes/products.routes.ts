import { Request, Response, Router } from "express";

const productRoutes = Router()

productRoutes.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello World' })
})

export default productRoutes