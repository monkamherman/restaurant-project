import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
import log from '../core/config/index';
import sendMail from '../nodemailer/sendmail'; 
import { generateAccessToken, generateRefreshToken } from '../token/tokenModule';

const prisma = new PrismaClient();

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // OTP de 6 chiffres
  }

const usersController = {
  // Créer un nouvel utilisateur
  postUser: async (req: Request, res: Response) => {
    try {
      const { step, nom, email, otp, numero } = req.body;

      let user

      switch (step) {
        // Étape 1 : Inscription et envoi de l'OTP
        case 'register': {
          if (!nom || !email) {
            return res.status(HttpCode.BAD_REQUEST).json({ msg: "Le nom et l'email sont obligatoires" });
          }

          // Vérifier si l'utilisateur existe déjà
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });
          if (existingUser) {
            return res.status(HttpCode.BAD_REQUEST).json({ msg: "L'utilisateur existe déjà" });
          }

          // Générer un OTP
          const generatedOTP = generateOTP();

          // Créer l'utilisateur dans la base de données
          await prisma.user.create({
            data: {
              nom,
              email,
              otp: generatedOTP,
              otpExpiresAt: new Date(Date.now() + 30 * 60 * 1000), // OTP expire après 5 minutes
            },
          });

          // Envoyer l'OTP par email
          const emailText = `Votre code OTP est : ${generatedOTP}. Il expire dans 5 minutes.`;
          await sendMail(email, emailText);

          res.status(HttpCode.OK).json({ msg: "Un code OTP a été envoyé à votre email. Veuillez le vérifier." });
          break;
        }

        // Étape 2 : Vérification de l'OTP
        case 'verify-otp': {
          if (!email || !otp) {
            return res.status(HttpCode.BAD_REQUEST).json({ msg: "L'email et l'OTP sont obligatoires" });
          }

          // Vérifier si l'utilisateur existe
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user) {
            return res.status(HttpCode.NOT_FOUND).json({ msg: "Email non trouvé" });
          }

          // Vérifier si l'OTP est correct et n'a pas expiré
          if (user.otp !== otp || (user.otpExpiresAt !== null && new Date() > user.otpExpiresAt)) {
            return res.status(HttpCode.BAD_REQUEST).json({ msg: "Code OTP invalide ou expiré" });
          }

          // Marquer l'utilisateur comme vérifié
          await prisma.user.update({
            where: { email },
            data: { isVerified: true },
          });

          res.status(HttpCode.OK).json({ msg: "OTP validé avec succès" });
          break;
        }

        // Étape 3 : Ajout du numéro de téléphone
        case 'add-phone-number': {
          if (!email || !numero) {
            return res.status(HttpCode.BAD_REQUEST).json({ msg: "L'email et le numéro de téléphone sont obligatoires" });
          }

          // Vérifier si l'utilisateur existe et est vérifié
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user || !user.isVerified) {
            return res.status(HttpCode.BAD_REQUEST).json({ msg: "Email non trouvé ou OTP non vérifié" });
          }

          // Ajouter le numéro de téléphone et finaliser la création du compte
        await prisma.user.update({
            where: { email },
            data: { numero },
          });

          res.status(HttpCode.OK).json({ msg: "Compte créé avec succès" });
          break;
        }

        // Étape inconnue
        default: {
          res.status(HttpCode.BAD_REQUEST).json({ msg: "Étape inconnue" });
        }
      }

      if(user){
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
      }
    } catch (error) {
      console.error(error);
      return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ msg: "Erreur interne du serveur" });
    }
  },
  // Contrôleur pour renvoyer l'OTP
 resendOTP: async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(HttpCode.NOT_FOUND).json({ msg: "Email non trouvé" });
    }

    // Générer un nouvel OTP
    const generatedOTP = generateOTP();

    // Mettre à jour l'OTP et sa date d'expiration
    await prisma.user.update({
      where: { email },
      data: {
        otp: generatedOTP,
        otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000), // OTP expire après 2 minutes
      },
    });

    // Envoyer l'OTP par email
    const emailText = `Votre nouveau code OTP est : ${generatedOTP}. Il expire dans 2 minutes.`;
    await sendMail(email, emailText);

    res.status(HttpCode.OK).json({ msg: "Un nouveau code OTP a été envoyé à votre email." });
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