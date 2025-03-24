import { Router } from "express";
import platsController from "../controllers/platControllers";
import userConnect from "../middlewares/userConnect";

const plat = Router()

plat.get('/', platsController.getplats)
plat.get('/:id', platsController.getPlatById)
plat.post('/', userConnect.verifyAccessToken,userConnect.verifyRefreshToken,userConnect.verifyUserAdmin ,platsController.postPlats)
plat.put('/:id', userConnect.verifyAccessToken,userConnect.verifyRefreshToken,userConnect.verifyUserAdmin  ,platsController.updatePlat)
plat.delete('/:id',userConnect.verifyAccessToken,userConnect.verifyRefreshToken,userConnect.verifyUserAdmin  ,platsController.deletePlat)

export default plat