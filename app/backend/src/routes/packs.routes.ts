import { Request, Router, Response } from 'express';
import packsController from '../controllers/packsController';

const router = Router();

router.get('/', (req: Request, res: Response) => packsController.getAll(req, res));

router.get('/:code', packsController.findByCode);

export default router;
