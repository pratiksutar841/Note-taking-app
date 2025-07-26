import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Note {
  _id: string;
  title: string;
  content: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (err) {
      alert('Session expired. Login again.');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const createNote = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/notes',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      alert('Failed to create note');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
    } catch (err) {
      alert('Failed to delete note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>

      <div>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={createNote}>Create Note</button>
      </div>

      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Del_
