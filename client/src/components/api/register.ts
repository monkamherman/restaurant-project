// Fichier api.ts (ou axiosConfig.ts)
import axios from 'axios';

const BASE_URL = 'http://localhost:2000'; // Remplacez par votre URL Render


export const axiosRegister = axios.create({
	baseURL: `${BASE_URL}/`, 
	withCredentials: false, 
	timeout: 50000,
	headers: {
	  'Content-Type': 'application/json',
	  'Accept': 'application/json',
	  'Access-Control-Allow-Origin': '*'
	},
	validateStatus: (status) => status < 500
  });
  
  // Intercepteur pour erreurs réseau
  axiosRegister.interceptors.response.use(
	response => response,
	error => {
	  if (error.message === 'Network Error') {
		error.message = 'Problème de connexion au serveur';
	  }
	  return Promise.reject(error);
	}
  );