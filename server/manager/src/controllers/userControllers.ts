// controllers/authController.js
import { PrismaClient } from "@prisma/client";
import z from "zod";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Schéma Zod pour valider les données d'inscription
const registerSchema = z.object({
  nom: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
});

// Schéma Zod pour valider l'OTP
const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "L'OTP doit contenir exactement 6 caractères"),
});

// Schéma Zod pour valider le numéro de téléphone
const phoneNumberSchema = z.object({
  email: z.string().email(),
  numero: z.string().regex(/^\+[1-9]\d{1,14}$/, "Numéro de téléphone invalide"),
});

// Générer un OTP aléatoire
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // OTP de 6 chiffres
}

// Configuration de Nodemailer pour envoyer des emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contrôleur unique pour gérer tout le processus
export const handleAccountCreation = async (req, res) => {
  try {
    const { step, ...data } = req.body;

    switch (step) {
      case "register": {
        // Étape 1 : Inscription
        const validatedData = registerSchema.parse(data);

        const { nom, email } = validatedData;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Générer un OTP
        const otp = generateOTP();

        // Créer l'utilisateur dans la base de données
        await prisma.user.create({
          data: {
            nom,
            email,
            otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000), // OTP expire après 5 minutes
          },
        });

        // Envoyer l'OTP par email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Votre code OTP",
          text: `Votre code OTP est : ${otp}. Il expire dans 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
          message: "Un code OTP a été envoyé à votre email. Veuillez le vérifier.",
        });
        break;
      }

      case "verify-otp": {
        // Étape 2 : Vérification OTP
        const validatedData = verifyOTPSchema.parse(data);

        const { email, otp } = validatedData;

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(400).json({ message: "Email non trouvé" });
        }

        // Vérifier si l'OTP est correct et n'a pas expiré
        if (user.otp !== otp || new Date() > user.otpExpiresAt) {
          return res.status(400).json({ message: "Code OTP invalide ou expiré" });
        }

        // Marquer l'utilisateur comme vérifié
        await prisma.user.update({
          where: { email },
          data: { isVerified: true },
        });

        res.status(200).json({ message: "OTP validé avec succès" });
        break;
      }

      case "add-phone-number": {
        // Étape 3 : Ajout du numéro de téléphone
        const validatedData = phoneNumberSchema.parse(data);

        const { email, numero } = validatedData;

        // Vérifier si l'utilisateur existe
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.isVerified) {
          return res.status(400).json({ message: "Email non trouvé ou OTP non vérifié" });
        }

        // Ajouter le numéro de téléphone et finaliser la création du compte
        await prisma.user.update({
          where: { email },
          data: { numero },
        });

        res.status(200).json({ message: "Compte créé avec succès" });
        break;
      }

      default: {
        res.status(400).json({ message: "Étape inconnue" });
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Une erreur s'est produite" });
  }
};