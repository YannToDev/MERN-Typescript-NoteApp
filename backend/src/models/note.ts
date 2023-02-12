// ---- Fichier pour définir le Schéma et le model de notre table Notes dans la BDD ----

import { InferSchemaType,model, Schema } from "mongoose";

// l'objet timestamps passé en second argument va permettre a mongoose et donc Mongo de gérer 
// automatiquement les dates de création et de mise à jour des données.
const noteSchema = new Schema({

    title: { type : String, required: true },
    text:{ type : String, required: false},
}, { timestamps: true })

//  type automatiquement crée à partir de notre shéma et qui permet de typer le model qu'on exporte.
type Note = InferSchemaType<typeof noteSchema>;

export default  model<Note>("Note",noteSchema);
