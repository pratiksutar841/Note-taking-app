import { Request, Response } from 'express';
import Note from '../models/Note';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      userId: req.userId,
      title,
      content
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  const noteId = req.params.id;

  try {
    await Note.findOneAndDelete({ _id: noteId, userId: req.userId });
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
};
