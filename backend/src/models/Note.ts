import mongoose, { Document } from 'mongoose';

export interface INote extends Document {
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
}

const noteSchema = new mongoose.Schema<INote>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model<INote>('Note', noteSchema);
export default Note;
