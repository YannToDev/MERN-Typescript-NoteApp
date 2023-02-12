// ---- Fichier qui sert à connecter la base de donnée et à lancer notre serveur Express ----

import mongoose from "mongoose";
import app from './app';
// permet la validation des variables d'environnements.
import env from "./util/validateEnv";

const port = env.PORT;

mongoose.set('strictQuery', true);
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() =>{
        console.log("Mongoose connected")
        app.listen(port, () => {

        console.log("Server running on port " + port);
        })
    
    })
    .catch(console.error);



// "npx tsc --init" pour créer le fichier tsconfig.ts

// "npx tsc" pour convertir nos fichiers ts en Js car par défaut node et les navigateurs interpretent du JS
// "node server.js" pour exécuter notre fichier.

// ce fichier "server.js" sera uniquement utile en producution donc on va le compiler dans un ficher "dist", pour cela
// il faut aller dans le fichier tsconfig.ts et décommenter la ligne "outDir:" et spéifier "outDit:/dist".
//  on re éxécute la commande "npx tsc" et il créer le fichier server.js dans le dossier "dist"
// on relance notre server avec la commande "node /dist/server.js"

// on a ensuite supprimer le dossier "dist" car on en a pas vraiment besoin pour le moment.

// "npm i --save-dev nodemon"  pour installer nodemon qui va remettre notre seveur à jour en temps réel.
//  "npm i -D ts-node"  pour installer ts-node qui permet de compiler directment le Ts autremant dit au lieu de lancer le server.js
//  on peut directement lancer le server.ts autrement dit cela permet à nodemon de bosser avec typescript.
// on tappe la commande "npx nodemon src/server.ts"
// une fois qu'on a mis en place un script on tappe directement "npm start" pour éxécuter le script.

// mise en place du eslint : "npm i -D eslinit" puis initialisation avec la commande "npx eslint --init"
//  pour exécuter le linter "npx eslint . --ext .ts"  note: le "." apres eslint sert à spécifer qu'on veut l'éxécuter dans le fichier actuel
//  et le "--ext" pour spécifier sur quelles type d'extension on doit l'éxécuter
// on peut aller plus vite en créant un script et on le lance avec "npm run lint"

// on va encore plus vite en installant l'extension "eslint" qui exécute tout seul le lint et nous affiche directement en jaune ce qui ne va pas.

// "npm i morgan" pour installer le middleware Morgan qui permet d'afficher les réponses de requête dans la console sous un jolie format.
// "npm i --save-dev @types/morgan" permet d'installer le package pour que l'import de Morgan fonctionne avec Typescript.

// "npm i http-errors" pour installer le package qui permert de gérer les erreurs http, il permet de géréer précisément les code d'erreurs, 404, 500,ect.. et de créer
// des messages d'erreurs adaptés.
// "npm i -D @types/http-errors" pour que ce package soit compatible avec typescript.