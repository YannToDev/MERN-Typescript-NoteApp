
//  ---- Fichier qui permer la mise en place de la route pour récupérer tous les posts ----

// on importe Express et on instancie le Router.
import express from "express";
const router = express.Router();

// on importe le controller associé à la route.
import { getNotes, createNote, getNote, updateNote, deleteNote } from '../controllers/notes';

// route pour récupérer tous les notes.
router.get("/", getNotes);

// route pour récupérer un post donné à partir de son Id.
router.get("/:noteId", getNote);

// route pour créer une nouvelle note.
router.post("/", createNote)

//  route qui permet de mettre à jour une post.
router.patch("/:noteId", updateNote)

// route qui permet de supprimer une note
router.delete("/:noteId", deleteNote)

export default router;