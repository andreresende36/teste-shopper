import { Request, Router, Response } from 'express';
import productsController from '../controllers/productsController';
import validateByCostPrice from '../middlewares/validateByCostPrice';
import validateBySalesPrice from '../middlewares/validateBySalesPrice';

const router = Router();

router.get('/', (req: Request, res: Response) => productsController.getAll(req, res));

router.get('/:code', productsController.findByCode);

router.put(
  '/',
  validateByCostPrice,
  validateBySalesPrice,
  (req: Request, res: Response) => productsController.update(req, res),
);

export default router;
