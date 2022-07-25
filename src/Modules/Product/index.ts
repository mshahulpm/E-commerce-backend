import { Request, Response, Router } from "express";
const router = Router();
import { ProductService } from './product.service'

const productService = new ProductService()

router.route('/')
    .get((req: Request, res: Response) => {
        res.status(200).json({ message: 'welcome to Products' });
    })

router.get('/all', async (req, res, next) => {
    try {
        res.status(200).json(await productService.getAll())
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.status(200).json(await productService.getOne(req.params.id))
    } catch (error) {
        next(error)
    }
})

router.get('/details/:slug', async (req, res, next) => {
    try {
        res.json(await productService.getOneBySlug(req.params.slug))
    } catch (error) {
        next(error)
    }
})

router.post('/create', async (req, res, next) => {
    try {
        res.status(201).json(await productService.create(req.body))
    } catch (error) {
        next(error)
    }
})


router.post('/edit/:id', async (req, res, next) => {
    try {
        res.status(200).json(await productService.edit(req.params.id, req.body))
    } catch (error) {
        next(error)
    }
})


export default router;