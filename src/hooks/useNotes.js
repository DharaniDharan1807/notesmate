import { useState, useEffect } from 'react';

export const useNotes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'New Note', content: '', category: 'Documents' }
  ]);
  const [selectedNote, setSelectedNote] = useState(1);
  const [noteContent, setNoteContent] = useState('');
  const [activeCategory, setActiveCategory] = useState('Documents');

  useEffect(() => {
    const currentNote = notes.find(note => note.id === selectedNote);
    if (currentNote) {
      setNoteContent(currentNote.content);
    }
  }, [selectedNote, notes]);

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      category: activeCategory
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote.id);
  };

  const updateNoteContent = (content) => {
    setNoteContent(content);
    setNotes(notes.map(note => 
      note.id === selectedNote 
        ? { ...note, content }
        : note
    ));
  };

  const getCurrentNote = () => {
    return notes.find(note => note.id === selectedNote);
  };

  const getNotesForCategory = (categoryName) => {
    return notes.filter(note => note.category === categoryName);
  };

  return {
    notes,
    selectedNote,
    noteContent,
    activeCategory,
    setSelectedNote,
    setActiveCategory,
    handleCreateNote,
    updateNoteContent,
    getCurrentNote,
    getNotesForCategory
  };
};