import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import log from '../core/config/index';
import { generateAccessToken, generateRefreshToken } from '../token/tokenModule';

const prisma = new PrismaClient();

const connecteController = {

    loginUser: async (req: Request, res: Response) => {
        try {
            const { email, numero } = req.body;

            if(!email || !numero){
                return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun email ou numéro de téléphone fourni" });
            }

            const user = await prisma.user.findUnique({
                where: {
                    
                        email           
                }
            })
            if(!user){
                return res.status(HttpCode.NOT_FOUND).json({ msg: "Utilisateur non trouvé" });
            }

            if(user.numero !== numero){
                return res.status(HttpCode.BAD_REQUEST).json({ msg: "Numeéro de téléphone incorrect" });
            }

            if(user.isVerified === false){
                return res.status(HttpCode.BAD_REQUEST).json({ msg: "Veuillez vérifier votre compte" });
            }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    // res.cookie(`${employs.name}-cookie`, refreshtoken);

    res.cookie("cook_emp_xyz", refreshToken,
        {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

    res.header('Authorization', accessToken)

    console.log(accessToken)

    res.status(HttpCode.OK).json({ msg: "Login réussi", accessToken, refreshToken });
    log.info("Login réussi", user);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
            
        }
    },
    LogoutUser: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            if (!user) {
                return res.json({ msg: "l'utilisateur n'existe pas !" }).status(HttpCode.BAD_REQUEST);
            }
            res.clearCookie("cook_emp_xyz");
            
            res.status(HttpCode.OK).json({ msg: 'User succesffully logout' });
            log.info("user logout", user)
            return res.status(HttpCode.OK).json({ msg: 'User succesffully logout' });
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: 'Erreur interne du serveur' });
        }
    },
}

export default connecteController