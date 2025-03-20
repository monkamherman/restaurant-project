import pino, { stdTimeFunctions, transport } from 'pino';
import  { createStream } from 'pino-logrotate';

// Déterminer si l'application est en mode développement
const isDevelopment: boolean = process.env.NODE_ENV !== 'production';

// Configurer le niveau de log en fonction de l'environnement
const logLevel: string = isDevelopment ? 'trace' : 'info'; // Tous les niveaux en dev, info+ en prod

// Créer un flux de rotation des logs
const stream = createStream(
  {
    file: './logs/app.log', // Fichier de log principal
    size: '10M', // Taille maximale avant rotation (ex. 10 Mo)
    interval: '1d', // Rotation quotidienne
    count: 7, // Conserver 7 fichiers de logs
  },
  {} // Options supplémentaires (vide ici)
);

// Configuration du transport pour le formatage des logs en développement
const prettyTransport = isDevelopment
  ? transport({
      target: 'pino-pretty',
      options: {
        colorize: true, // Activer les couleurs
        translateTime: 'yyyy-MM-dd HH:mm:ss', // Format d'horodatage
        ignore: 'pid,hostname', // Ignorer les champs inutiles
      },
    })
  : undefined;

// Configurer Pino pour utiliser le flux de rotation et/ou le transport
const log = pino(
  {
    level: logLevel, // Niveau minimum de log
    base: null, // Désactiver les métadonnées par défaut (hostname, pid)
    timestamp: stdTimeFunctions.isoTime, // Ajouter un horodatage ISO
  },
  isDevelopment ? prettyTransport : stream // Utiliser le transport en développement, sinon le fichier
);

export default log;