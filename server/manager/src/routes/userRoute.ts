import { Router } from "express";
import usersController from "../controllers/userControllers";
import userConnect from "../middlewares/userConnect";

const user = Router()

user.get('/', userConnect.verifyAccessToken,userConnect.verifyRefreshToken,userConnect.verifyUserAdmin ,usersController.getUsers)
user.get('/:id', userConnect.verifyAccessToken,userConnect.verifyRefreshToken,usersController.getUserById)
user.post('/', usersController.postUser)
user.put('/:id', userConnect.verifyAccessToken,userConnect.verifyRefreshToken,usersController.updateUser)
user.delete('/:id',userConnect.verifyAccessToken,userConnect.verifyRefreshToken,userConnect.verifyUserAdmin  ,usersController.deleteUser)

export default user