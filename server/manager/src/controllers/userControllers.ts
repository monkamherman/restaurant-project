import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import log from '../core/config/index';

const prisma = new PrismaClient();

const usersController = {
  // Créer un nouvel utilisateur
  postUser: async (req: Request, res: Response) => {
    try {
      const { nom, email, numero } = req.body;

      // Vérifier que tous les champs obligatoires sont présents
      if (!nom || !email) {
        return res.status(HttpCode.BAD_REQUEST).json({ msg: "Le nom et l'email sont obligatoires" });
      }

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(HttpCode.BAD_REQUEST).json({ msg: "L'utilisateur existe déjà", existingUser });
      }

      // Créer un nouvel utilisateur
      const newUser = await prisma.user.create({
        data: {
          nom,
          email,
          numero,
        },
      });

      res.status(HttpCode.OK).json({ msg: "Utilisateur ajouté avec succès", newUser });
      log.info("Utilisateur ajouté avec succès", newUser);
    } catch (error) {
      console.error(error);
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
    }
  },

  // Récupérer tous les utilisateurs
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();

      if (!users || users.length === 0) {
        return res.status(HttpCode.NOT_FOUND).json({ msg: "Aucun utilisateur trouvé" });
      }

      res.status(HttpCode.OK).json({ msg: "Utilisateurs récupérés avec succès", users });
      log.info("Utilisateurs récupérés avec succès", users);
    } catch (error) {
      console.error(error);
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
    }
  },

  // Récupérer un utilisateur par son ID
  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun ID fourni" });
      }

      const user = await prisma.user.findUnique({
        where: { user_id : id },
      });

      if (!user) {
        return res.status(HttpCode.NOT_FOUND).json({ msg: "Utilisateur non trouvé" });
      }

      res.status(HttpCode.OK).json({ msg: "Utilisateur récupéré avec succès", user });
      log.info("Utilisateur récupéré avec succès", user);
    } catch (error) {
      console.error(error);
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun ID fourni" });
      }

      const { nom, email, numero } = req.body;

      // Vérifier si l'utilisateur existe
      const existingUser = await prisma.user.findUnique({
        where: { user_id : id },
      });
      if (!existingUser) {
        return res.status(HttpCode.NOT_FOUND).json({ msg: "Utilisateur non trouvé" });
      }

      // Mettre à jour l'utilisateur
      const updatedUser = await prisma.user.update({
        where: { user_id : id },
        data: {
          nom,
          email,
          numero,
        },
      });

      res.status(HttpCode.OK).json({ msg: "Utilisateur mis à jour avec succès", updatedUser });
      log.info("Utilisateur mis à jour avec succès", updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(HttpCode.BAD_REQUEST).json({ msg: "Aucun ID fourni" });
      }

      // Vérifier si l'utilisateur existe
      const existingUser = await prisma.user.findUnique({
        where: { user_id : id },
      });
      if (!existingUser) {
        return res.status(HttpCode.NOT_FOUND).json({ msg: "Utilisateur non trouvé" });
      }

      // Supprimer l'utilisateur
      const deletedUser = await prisma.user.delete({
        where: { user_id : id },
      });

      res.status(HttpCode.OK).json({ msg: "Utilisateur supprimé avec succès", deletedUser });
      log.info("Utilisateur supprimé avec succès", deletedUser);
    } catch (error) {
      console.error(error);
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
    }
  },
};

export default usersController;