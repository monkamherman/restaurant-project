declare module 'pino-logrotate' {
    interface LogRotateOptions {
      file: string; // Chemin du fichier de log
      size?: string; // Taille maximale avant rotation (ex. '10M')
      interval?: string; // Intervalle de rotation (ex. '1d')
      count?: number; // Nombre de fichiers à conserver
      compress?: boolean; // Activer la compression (facultatif)
    }
  
    export function createStream(options: LogRotateOptions, extraOptions?: unknown): NodeJS.WritableStream;
  }