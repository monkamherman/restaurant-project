import { Router } from "express";
import usersController from "../controllers/userControllers";

const user = Router()

user.get('/', usersController.getUsers)
user.get('/:id', usersController.getUserById)
user.post('/', usersController.postUser)
user.put('/:id', usersController.updateUser)
user.delete('/:id', usersController.deleteUser)

export default user