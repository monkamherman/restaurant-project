// Fichier api.ts (ou axiosConfig.ts)
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Remplacez par votre URL Render


export const axiosTable = axios.create({
	baseURL: `${BASE_URL}/sendMails`, // Notez le chemin corrigé
	withCredentials: true, // Pour les cookies/sessions
	timeout: 50000,
	headers: {
	  'Content-Type': 'application/json',
	  'Accept': 'application/json'
	},
	validateStatus: (status) => status < 500
  });
  
  // Intercepteur pour erreurs réseau
  axiosTable.interceptors.response.use(
	response => response,
	error => {
	  if (error.message === 'Network Error') {
		error.message = 'Problème de connexion au serveur';
	  }
	  return Promise.reject(error);
	}
  );