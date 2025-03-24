import express from "express";
import user from "./userRoute";
import plat from "./platRoute";

// const app = express();


export  const registerRoutes = (app: express.Application) => {
    app.use('/user', user);
    app.use('/plat', plat)
  }
  