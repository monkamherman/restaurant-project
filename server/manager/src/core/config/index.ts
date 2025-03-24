import pino, { stdTimeFunctions } from 'pino';
import pinoMultiStream from 'pino-multi-stream';
import * as rfs from 'rotating-file-stream'; // Importation corrigée
import type { RotatingFileStream } from 'rotating-file-stream'; // Importer le type
// Déterminer si l'application est en mode développement
const isDevelopment: boolean = process.env.NODE_ENV !== 'production';

// Configurer le niveau de log en fonction de l'environnement
const logLevel: string = isDevelopment ? 'trace' : 'info'; // Tous les niveaux en dev, info+ en prod

// Configuration de la rotation des logs
const rotatingStream: RotatingFileStream = rfs.createStream('../logs/app.log', {
  path: './logs',               // Dossier de stockage des logs
  size: '10M',                  // Taille maximale du fichier avant rotation
  interval: '1d',               // Rotation quotidienne
  compress: 'gzip',             // Compresser les fichiers archivés
  maxFiles: 7,                  // Conserver 7 fichiers de logs
});

// Configuration des streams pour pino
const streams = [
  // Stream pour la rotation des logs
  { stream: rotatingStream },
];

// Ajouter un stream pour la sortie console en mode développement
if (isDevelopment) {
  streams.push({
    stream: process.stdout, // Afficher les logs dans la console
  });
}

// Configurer Pino avec pino-multi-stream
const log = pino(
  {
    level: logLevel,                // Niveau minimum de log
    base: null,                     // Désactiver les métadonnées par défaut (hostname, pid)
    timestamp: stdTimeFunctions.isoTime, // Ajouter un horodatage ISO
  },
  pinoMultiStream.multistream(streams) // Utiliser plusieurs streams
);

export default log;