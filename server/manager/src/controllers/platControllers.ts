import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import log from '../core/config/index'

const prisma = new PrismaClient();

const platsController = {

    postPlats: async (req: Request, res: Response) => {

        try {

            const { title, description, price, image, category } = req.body

            if(!title || !description || !price || !image || !category) {
                
                               
              res.status(HttpCode.BAD_REQUEST).json({ msg: "Tous les champs sont obligatoires" });
                log.error("Tous les champs sont obligatoires");
            }

            const newPlat = await prisma.plats.create({
                include: {
                    category: true
                },
                data: {
                    title,
                    description,
                    price,
                    image,
                    category
                }
            })

            res.status(HttpCode.OK).json({ msg: "Plat ajouté avec succès", newPlat });
            log.info("Plat ajouté avec succès", newPlat);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
        }
    },
    getplats: async (req: Request, res: Response) => {
        try {
            const plats = await prisma.plats.findMany()
            res.status(HttpCode.OK).json({ msg: "Plats retirés avec succès", plats });
            log.info("Plats retirés avec succès", plats);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
        }
        
    },
    getPlatById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const plat = await prisma.plats.findUnique({
                where: {
                    id
                }
            })
            res.status(HttpCode.OK).json({ msg: "Plat retiré avec succès", plat });
            log.info("Plat retiré avec succès", plat);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
        }
        
    },
    updatePlat: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const { title, description, price, image, category } = req.body
            const plat = await prisma.plats.update({
                where: {
                    id
                },
                data: {
                    title,
                    description,
                    price,
                    image,
                    category
                }
            })
            res.status(HttpCode.OK).json({ msg: "Plat mis à jour avec succès", plat });
            log.info("Plat mis à jour avec succès", plat);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
        }
        
    },
    deletePlat: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const plat = await prisma.plats.delete({
                where: {
                    id
                }
            })
            res.status(HttpCode.OK).json({ msg: "Plat supprimé avec succès", plat });
            log.info("Plat supprimé avec succès", plat);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
        }
        
    }
  
}

export default platsController