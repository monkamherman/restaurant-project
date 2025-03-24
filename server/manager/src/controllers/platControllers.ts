import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import log from '../core/config/index'

const prisma = new PrismaClient();

const platsController = {

    postPlats: async (req: Request, res: Response) => {

        try {

            const { title, description, price, image, category } = req.body

            if(!title || !description || !price || !category) {               
              res.status(HttpCode.BAD_REQUEST).json({ msg: "Tous les champs sont obligatoires" });
                log.error("Tous les champs sont obligatoires");
            }

            const existingPlat = await prisma.plat.findUnique(
              {  where: { title}}
            )
            if (existingPlat){
                return res.status(HttpCode.BAD_REQUEST).json({msg: 'le plat existe deja', existingPlat})
            }
            const newPlat = await prisma.plat.create({
               
                data: {
                    title,
                    description,
                    price,
                    image,
                    category,
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
            const plats = await prisma.plat.findMany()

            if(!plats){
                return res.status(HttpCode.NOT_FOUND).json({ msg: "Aucun plat trouvé" });}
            res.status(HttpCode.OK).json({ msg: "Plats recu avec succès", plats });
            log.info("Plats retirés avec succès", plats);
            
        } catch (error) {
            console.error(error);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
        }
        
    },
    getPlatById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            if(!id){
                return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun id fournies" });
            }
            const plats = await prisma.plat.findUnique({
                where: {
                    plat_id:id
                }
            })
            if(!plats){
                return res.status(HttpCode.BAD_REQUEST).json({ msg : "le plat n'existe pas"})

            }
            const plat = await prisma.plat.findUnique({
                where: {
                    plat_id : id
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
            if(!id){
                return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun id fournies" });
            }
            const plats = await prisma.plat.findUnique({
                where: {
                    plat_id:id
                }
            })
            if(!plats){
                return res.status(HttpCode.BAD_REQUEST).json({ msg : "le plat n'existe pas"})

            }
            const { title, description, price, image, category } = req.body
            const plat = await prisma.plat.update({
                where: {
                    plat_id:id
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
            if(!id){
                return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun id fournies" });
            }
            const plats = await prisma.plat.findUnique({
                where: {
                    plat_id:id
                }
            })
            if(!plats){
                return res.status(HttpCode.BAD_REQUEST).json({ msg : "le plat n'existe pas"})

            }

            const plat = await prisma.plat.delete({
                where: {
                    plat_id:id
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