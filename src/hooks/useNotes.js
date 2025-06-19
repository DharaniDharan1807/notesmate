import { useState, useEffect } from 'react';
import API from "../Services/api";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [activeCategory, setActiveCategory] = useState('Documents');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await API.get('notes/');
      setNotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  // Update local note content when selected note changes
  useEffect(() => {
    const currentNote = notes.find(note => note.id === selectedNote);
    if (currentNote) {
      setNoteContent(currentNote.content);
    }
  }, [selectedNote, notes]);

  // Create a new note
  const handleCreateNote = async (title) => {
    try {
      const response = await API.post('notes/', {
        title,
        content: '',
        category: activeCategory === 'all' ? 'Documents' : activeCategory,
        is_page: false
      });
      setNotes([...notes, response.data]);
      setSelectedNote(response.data.id);
      setNoteContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    }
  };

  // Create a new page
  const handleCreatePage = async (title) => {
    try {
      const response = await API.post('notes/', {
        title,
        content: '',
        category: 'Documents',
        is_page: true
      });
      setNotes([...notes, response.data]);
      setSelectedNote(response.data.id);
      setNoteContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create page');
    }
  };

  // Update note content
  const updateNoteContent = async (content) => {
    if (!selectedNote) return;
    
    try {
      await API.patch(`notes/${selectedNote}/`, { content });
      setNotes(notes.map(note => 
        note.id === selectedNote 
          ? { ...note, content, lastModified: new Date().toISOString() }
          : note
      ));
      setNoteContent(content);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  // Update note title
  const updateNoteTitle = async (noteId, updates) => {
    try {
      await API.patch(`notes/${noteId}/`, updates);
      setNotes(notes.map(note => 
        note.id === noteId 
          ? { ...note, ...updates, lastModified: new Date().toISOString() }
          : note
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
    }
  };

  // Delete a note
  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`notes/${noteId}/`);
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNote === noteId) {
        setSelectedNote(null);
        setNoteContent('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Get current selected note
  const getCurrentNote = () => {
    return notes.find(note => note.id === selectedNote);
  };

  // Get notes filtered by category
  const getNotesForCategory = (categoryName = activeCategory) => {
    if (categoryName === 'all') return notes;
    return notes.filter(note => note.category === categoryName);
  };

  return {
    notes,
    selectedNote,
    noteContent,
    activeCategory,
    loading,
    error,
    setSelectedNote,
    setActiveCategory,
    handleCreateNote,
    handleCreatePage,
    updateNoteContent,
    updateNoteTitle,
    handleDeleteNote,
    getCurrentNote,
    getNotesForCategory
  };
};