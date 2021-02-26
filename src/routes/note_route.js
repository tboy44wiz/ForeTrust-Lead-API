"use strict";

import { Router } from 'express';
import TokenVerification from "../utils/token_verification";
import NotesController from "../controllers/Notes_Controller";

//  Set up Express Router.
const noteRouter = Router();


//  Create a single Note.
noteRouter.post("/create_note",
    TokenVerification.staffTokenVerification,
    NotesController.createNote
);

//  Get all Notes for a Particular Lead.
noteRouter.get("/get_all_lead_notes/:id",
    TokenVerification.staffTokenVerification,
    NotesController.getNotesForParticularLead
);

//  Update a Note.
noteRouter.put("/update_note/:id",
    TokenVerification.staffTokenVerification,
    NotesController.updateNote
);

//  Delete a Note.
noteRouter.delete("/delete_note/:id",
    TokenVerification.staffTokenVerification,
    NotesController.deleteNote
);

export default noteRouter;
