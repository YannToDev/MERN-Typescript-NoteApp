// ---- Fichier qui sert à instancier express et à définir la route principale ainsi que la gestion des erreurs ----

import express from "express";
import "dotenv/config";
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';

import notesRoutes from './routes/notes'

// pour le typage des arguments du Middleware
import { Request, Response, NextFunction } from "express";

// on créer une instance d'express.
const app = express();

// -- Middelware qui permet d'afficher les réponses de requête dans la console sous un jolie format.
app.use(morgan("dev"));

//  -- Middleware qui permet a Expresse de reçevoir des données au format JSON --
app.use(express.json());

// -- Middleware qui permet la mise en place de la route principale --
app.use("/api/v1/notes", notesRoutes);


// -- Middleware qui permet de gérer le cas d'une route inexistante --
// il doit être placé avant la middleware de gestion d'erreur puisqu'il passe l'erreur
//  en argument à next()
app.use((req,res,next) =>{
    next(createHttpError(404,"Endpoint not found"))
});


// -- Middleware qui permet de gérer les erreurs --
// Il est appelé avec la méthode Next() de block catch et reçoit en argument l'erreur à gérer.
// pour l'erreur on l'a définie à unknow car c'est Express qui va être capable de déduire de lui même
// de quelle type d'erreurs il va s'agir.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next:NextFunction) =>  {

    console.log(error);
    let errorMessage = "An unknow error occurred: ";
    let statusCode = 500;

    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage})
});   

export default app;

//  Note : On utilise un block try/catch dans la route get("/") car on a du code asynchrone, si ce n'était pas le cas ce block serait inutile car Express
// est assez intelligent pour savoir que l'erreur doit alors être envoyée dans le middleware.
//  A partir des version 5.0.0 et plus ce Try/Catch ne devrait plus être obligatoire même pour du code Async.


// ---- Ancienne version ou on envoyait l'erreur en dure sans utilise http-errors
// app.use((req,res,next) =>{
//     next( Error("Endpoint not found"))
// });

// app.use((error:unknown, req:Request, res:Response, next:NextFunction) =>  {

//      console.log(error);
//     let errorMessage = "An unknow error occurred: ";

//     if(error instanceof Error){
//         errorMessage = error.message;
//         res.status(500).json({error: errorMessage});
//     }
// });   