import { Request } from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { uploadToMinIO } from "../../services/uploader"; // Service pour uploader vers MinIO/S3
// import { convertToSVG } from "./TransfomImage";          // Conversion d'image en SVG
import { compressVideo } from "./CompressVideo";         // Compression vidéo

// Types de fichiers pris en charge
const supportedImageTypes = ['jpg', 'jpeg', 'png'];
const supportedVideoTypes = ['mp4', 'mov'];
const supportedDocumentTypes = ['pdf', 'docx'];

export const uploadHandler = async (req: Request): Promise<{ fileUrl: string; fields: Record<string, string> }> => {
    return new Promise((resolve, reject) => {
        // Configuration de Formidable
        const form = formidable({
            uploadDir: "/tmp", // Dossier temporaire pour stocker les fichiers
            keepExtensions: true, // Conserver les extensions des fichiers
        });

        const fields: Record<string, string> = {}; // Stockage des champs du formulaire
        let file: formidable.File | null = null;   // Stockage du fichier uploadé

        // Récupération des champs du formulaire
        form.on("field", (fieldName, value) => {
            fields[fieldName] = value;
            console.log(`Champ reçu: ${fieldName} = ${value}`);
        });

        // Récupération du fichier uploadé
        form.on("file", (fieldName, uploadedFile) => {
            file = uploadedFile;
            console.log(`Fichier reçu: ${uploadedFile.originalFilename}, Taille: ${uploadedFile.size} octets`);
        });

        // Une fois le parsing terminé
        form.on("end", async () => {
            if (!file) {
                reject(new Error("Aucun fichier uploadé."));
                return;
            }

            const { filepath, originalFilename, mimetype } = file;

            console.log(`Traitement du fichier: ${originalFilename}, Type MIME: ${mimetype}`);

            try {
                // Extraire l'extension du fichier
                const extension = originalFilename?.split('.').pop()?.toLowerCase();
                const transformedFilePath = path.join("/tmp", `transformed-${originalFilename}`);

                console.log(`Traitement du fichier: ${originalFilename}, Extension: ${extension}`);

                // Transformation selon le type de fichier
                if (supportedImageTypes.includes(extension || '')) {
                    console.log('Conversion en SVG en cours...');
                    // await convertToSVG(filepath, transformedFilePath);
                } else if (supportedVideoTypes.includes(extension || '')) {
                    console.log('Compression vidéo en cours...');
                    await compressVideo(filepath, transformedFilePath);
                } else if (supportedDocumentTypes.includes(extension || '')) {
                    console.log('Fichier document détecté, pas de transformation nécessaire.');
                    fs.renameSync(filepath, transformedFilePath); // Renommer le fichier si aucune transformation n'est requise
                } else {
                    const errorMessage = `Type de fichier non pris en charge : ${mimetype}`;
                    console.log(errorMessage);
                    throw new Error(errorMessage);
                }

                // Upload vers MinIO/S3
                console.log('Upload vers S3/MinIO en cours...');
                const fileUrl = await uploadToMinIO(
                    transformedFilePath,
                    originalFilename || "file",
                    mimetype || "application/octet-stream"
                );

                // Supprimer les fichiers temporaires
                fs.unlinkSync(filepath); // Supprimer le fichier temporaire initial
                fs.unlinkSync(transformedFilePath); // Supprimer le fichier transformé
                console.log('Fichiers temporaires supprimés.');

                resolve({ fileUrl, fields });
            } catch (error) {
                console.log('Erreur lors du traitement du fichier:', error);
                reject(error);
            }
        });

        // Gestion des erreurs de parsing
        form.on("error", (err) => {
            console.log('Erreur lors du parsing du formulaire:', err);
            reject(err);
        });

        // Parser la requête
        form.parse(req);
    });
};