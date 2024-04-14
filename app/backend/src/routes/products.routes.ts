import { Request, Router, Response } from 'express';
import productsController from '../controllers/productsController';

const router = Router();

router.get('/', (req: Request, res: Response) => productsController.getAll(req, res));

router.put('/', (req: Request, res: Response) => productsController.update(req, res));

export default router;
