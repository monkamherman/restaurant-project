import { Router } from "express";
import platsController from "../controllers/platControllers";

const plat = Router()

plat.get('/', platsController.getplats)
plat.get('/:id', platsController.getPlatById)
plat.post('/', platsController.postPlats)
plat.put('/:id', platsController.updatePlat)
plat.delete('/:id', platsController.deletePlat)

export default plat