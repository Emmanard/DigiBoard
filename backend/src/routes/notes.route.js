import express from "express";
import {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNoteById
} from "../controllers/notes.Controller.js";

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createNotes);

router.put("/:id", updateNotes);

router.get("/:id", getNoteById);

router.delete("/:id", deleteNotes);

export default router;
