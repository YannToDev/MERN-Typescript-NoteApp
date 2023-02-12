import { cleanEnv } from "envalid";
// ---- Méthode qui permet la validation des variables d'environnement ----

import { str, port } from "envalid/dist/validators";

export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port()
})