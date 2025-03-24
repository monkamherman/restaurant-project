import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const deleteUnverifiedUsers = async () => {
    try {
      // Récupérer la date actuelle
      const now = new Date();
  
      // Supprimer les utilisateurs non vérifiés ou dont l'OTP a expiré
      const deletedUsers = await prisma.user.deleteMany({
        where: {
          OR: [
            { isVerified: false }, // Comptes non vérifiés
            { otpExpiresAt: { lt: now } }, // OTP expiré
          ],
        },
      });
  
      // Vérifier si des comptes ont été supprimés
      if (deletedUsers.count > 0) {
        console.log(`🗑️ ${deletedUsers.count} comptes non vérifiés supprimés.`);
      } else {
        console.log('✅ Aucun compte non vérifié à supprimer.');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la suppression des comptes non vérifiés :', error);
    }
  };

// Planifier le cron job pour s'exécuter chaque jour à minuit
cron.schedule('0 0 * * *', () => {
  console.log('⏰ Exécution du cron job pour supprimer les comptes non vérifiés...');
  deleteUnverifiedUsers();
});

console.log('⏳ Cron job programmé pour s\'exécuter chaque jour à minuit.');