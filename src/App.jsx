import React, { useState } from 'react';
import { SCREENS } from './utils/constants';
import { useNotes } from './hooks/useNotes';

// Auth Components
import WelcomeScreen from './components/auth/WelcomeScreen';
import LoginScreen from './components/auth/LoginScreen';
import PasswordScreen from './components/auth/PasswordScreen';
import SignUpScreen from './components/auth/SignUpScreen';

// Layout Components
import Sidebar from './components/layout/sidebar';
import TopBar from './components/layout/TopBar';
import RightSidebar from './components/layout/RightSidebar';
import NoteEditor from './components/editor/NoteEditor';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
  const [username, setUsername] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [notes, setNotes] = useState([
    { id: Date.now(), title: 'My First Note', content: 'This is my first note content', lastModified: Date.now() }
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Get the currently selected note
  const selectedNote = notes.find(note => note.id === selectedNoteId) || null;

  // Note management functions
  const handleCreateNote = (title) => {
    const newNote = {
      id: Date.now(),
      title,
      content: '',
      lastModified: Date.now()
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const updateNoteContent = (content) => {
    if (selectedNoteId) {
      handleUpdateNote(selectedNoteId, { content, lastModified: Date.now() });
    }
  };

  const updateNoteTitle = (noteId, updates) => {
    handleUpdateNote(noteId, updates);
  };

  const handleUpdateNote = (noteId, updates) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNoteId === noteId) {
      setSelectedNoteId(null);
    }
  };

  const getCurrentNote = () => {
    return selectedNote;
  };

  const getNotesForCategory = (category) => {
    return notes; // In a real app, you would filter by category
  };

  // Auth handlers
  const handleLogin = (user) => {
    setUsername(user);
    setCurrentScreen(SCREENS.PASSWORD);
  };

  const handlePasswordSubmit = () => {
    setCurrentScreen(SCREENS.APP);
  };

  const handleSignUp = (user) => {
    setUsername(user);
    setCurrentScreen(SCREENS.APP);
  };

  // Render auth screens
  if (currentScreen === SCREENS.WELCOME) {
    return (
      <WelcomeScreen
        onLogin={() => setCurrentScreen(SCREENS.LOGIN)}
        onSignUp={() => setCurrentScreen(SCREENS.SIGNUP)}
      />
    );
  }

  if (currentScreen === SCREENS.LOGIN) {
    return (
      <LoginScreen
        onNext={handleLogin}
        onSignUp={() => setCurrentScreen(SCREENS.SIGNUP)}
      />
    );
  }

  if (currentScreen === SCREENS.PASSWORD) {
    return <PasswordScreen onSubmit={handlePasswordSubmit} />;
  }

  if (currentScreen === SCREENS.SIGNUP) {
    return (
      <SignUpScreen
        onNext={handleSignUp}
        onLogin={() => setCurrentScreen(SCREENS.LOGIN)}
      />
    );
  }

  // Main app interface
  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar
        activeCategory={activeCategory}
        selectedNote={selectedNoteId}
        onCategoryChange={setActiveCategory}
        onNoteSelect={setSelectedNoteId}
        onCreateNote={handleCreateNote}
        onUpdateNote={updateNoteTitle}
        onDeleteNote={deleteNote}
        getNotesForCategory={getNotesForCategory}
      />
      <div className="flex-1 flex flex-col">
        <TopBar username={username} />
        <div className="flex-1 flex">
          <NoteEditor
            note={selectedNote}
            content={selectedNote?.content || ''}
            onChange={updateNoteContent}
            onUpdateNote={updateNoteTitle}
          />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default App;