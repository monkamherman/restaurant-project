// src/app.ts
import express from 'express';
// import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cors from 'cors';
import { ONE_HUNDRED, SIXTY } from './core/constants/index';
import { logger } from 'env-var';
import { createClient } from 'redis';
import helmet from 'helmet';
import { registerRoutes } from './routes';
// import compression from 'compression';
import cacheControl from 'express-cache-controller';
import './utils/cronJobs'
// import user from './routes/userRoute';
// import plat from './routes/platRoute';


// Création du client Redis en dehors de toute fonction
const redisClient = createClient({
	url: 'redis://localhost:6379',
  });
  
  // Gestion des erreurs Redis
  redisClient.on('error', (err) => {
	console.error('Erreur de connexion Redis:', err.message);
  });
  
  // Fonction pour démarrer le serveur
  async function startServer() {
	try {
	  await redisClient.connect();
	  console.log("Connexion Redis établie avec succès.");
	} catch (error) {
	  console.error('Erreur lors de la connexion Redis:', error);
	  process.exit(1); // Arrête le serveur si Redis ne se connecte pas
	}
}






const morganStream = {
	write: (message: string) => {
		logger('http', message.trim());
	}
};

const app = express();
app.use(express.json());



registerRoutes(app);

app.use(cors({
  origin: 'http://localhost:10000', // Your frontend URL
  credentials: true, // Required if using cookies/auth
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware CORS critique
app.use((req, res, next) => {
  // Autorise spécifiquement votre frontend
  res.header('Access-Control-Allow-Origin', 'http://localhost:10000');
  
  // Nécessaire si vous utilisez des cookies/JWT
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Méthodes autorisées (inclure OPTIONS)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // En-têtes autorisés
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Répondre immédiatement aux requêtes OPTIONS (préflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://trusted.cdn.com"],
      imgSrc: ["'self'", "data:", "https://trusted.cdn.com"],
      fontSrc: ["'self'", "https://trusted.cdn.com"],
      connectSrc: ["'self'", "https://api.trusted.com"],
    },
  },
  hsts: {
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  },
  // frameguard: { action: 'deny' }, // Empêche le clickjacking
  // hidePoweredBy: true,           // Masque l'en-tête X-Powered-By
  // noSniff: true,                 // Empêche le sniffing MIME
  // referrerPolicy: { policy: 'strict-origin-when-cross-origin' }, // Politique de référent
  // xssFilter: true, 
}));
// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

app.get('/keep-alive', (req, res) => res.send('OK'))

// Rate limiting (après les routes critiques)


app.use(async (req, res, next) => {
	const ip = req.ip;
	const key = `rate_limit:${ip}`;
	const limit = ONE_HUNDRED;
  
	const current = await redisClient.incr(key);
  
	if (current === 1) {
	  await redisClient.expire(key, SIXTY); // Expire après 60 secondes
	}
  
	if (current > limit) {
	  return res.status(429).json({ error: 'Trop de requêtes depuis cette adresse IP' });
	}
  
	next();
  });

// app.use(compression())
app.use(cacheControl({ maxAge: 86400 }));
// Logging
app.use(morgan('combined', { stream: morganStream }));

app.use(express.static('public'));

// Route racine modifiée
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use((req, res, next) => {
  console.log('Requête reçue:', req.method, req.url);
  next();
});


// Gestion des erreurs CORS
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.message.includes('CORS')) {
    res.status(403).json({ error: err.message });
  } else {
    next(err);
  }
});

startServer()


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 2000;

// Ajoutez ce contrôle d'erreur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
}).on('error', (err) => {
  console.error('Erreur de démarrage:', err.message);
  process.exit(1);
});

