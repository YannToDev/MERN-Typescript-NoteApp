// ---- Fichier qui permet de définit le controller contenant toutes les méthodes associées auw routes de type "Posts" ----

//  -- typage pour la méthode de création --
interface CreateNoteBody  {

    title?: string,
    text?: string
}

//  -- typage pour la méthode update --
interface UpdateNoteBody {
    title?: string,
    text?: string
}

interface UpdateNoteParams {
    noteId: string
}

// Pour le typage des arguments de la méthode controleur car Express ne peut pas déduire que c'est un controller.
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";

// import du model qui défini une note.
import NoteModel from '../models/note';

//  méthode qui utilise la méthode find() de mongo pour récupérer tous nos posts.
export const getNotes : RequestHandler = async(req, res, next) => {

    try {
        // throw Error("super")
        const notes = await NoteModel.find().exec();

        if(!notes){
            throw createHttpError(404,"Notes not found");
        }

        res.status(200).json(notes);

    } catch (error) {
       next(error)
    }
};


// -- méthode pour récupérer un poste donné à partir de son id --
export const getNote : RequestHandler = async(req, res, next) => {

    const noteId = req.params.noteId;

    try {

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404,"Note not found");
        }

        res.status(200).json(note);

    } catch (error) {
        next(error)
    }
};

//  -- méthode pour créer un nouveau post en base de donnée --
// soit on ne type pas le RequestHandler soit on doit typer les 4 paramètres. Nous on veut paramètrer uniquement
// le reqBody qui est le 3eme argument en utilisant notre interface.
// Note: unknown n'a rien à voir avec "any", any est dangereux car on peut passer n'importe quoi alors que unknown est restrictif
export const createNote : RequestHandler<unknown,unknown,CreateNoteBody, unknown> = async(req, res, next) => {

    const title = req.body.title;
    const text = req.body.text;

    try {

        if(!title){
            throw createHttpError(400, "Note must have a title");
        }
        const newNote = await NoteModel.create({
            title: title,
            text: text
        });

        res.status(201).json(newNote);

    } catch (error) {
        next(error)
    }
};

// --- Méthode qui permet de mettre à jour une note après l'avoir récupéreé grâche à son Id.
export const updateNote:RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {

    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;

    try {
        
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }

        
        if(!newTitle){
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(noteId).exec();

         if(!note){
            throw createHttpError(404,"Note not found");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();
        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
};

// -- Méthode qui permet de supprimer un post --
// Note: 
//      1.ici pas besoin de passer de type au RequestHandler car on utilise pas le body et l'id
//      est identifié automatiquement comme un string par Typescrip car provient de l'URL.
//      2. on utilise sendStatus() et pas status() car on utilise pas de .json() dérrière.
export const deleteNote:RequestHandler = async(req,res,next) => {

     const noteId = req.params.noteId;

     try {

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404,"Note not found, impossible to update");
        }

        await note.remove();
        res.sendStatus(204);

     } catch (error) {
        next(error);
     }
};