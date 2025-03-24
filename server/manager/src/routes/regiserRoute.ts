import { Router } from "express";
import connecteController from "../controllers/connecteControlleur";
import userConnect from "../middlewares/userConnect";

const register = Router()

register.get('/login', connecteController.loginUser)
register.get('/logout', userConnect.verifyAccessToken, userConnect.verifyRefreshToken,connecteController.LogoutUser)


export default register