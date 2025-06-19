

// import React, { useState, useEffect } from 'react';
// import API from "./Services/api.js";
// import { SCREENS } from './utils/constants';

// // Auth Components
// import WelcomeScreen from './components/auth/WelcomeScreen';
// import LoginScreen from './components/auth/loginScreen';
// import PasswordScreen from './components/auth/passwordScreen';
// import SignUpScreen from './components/auth/SignUpScreen';

// // Layout Components
// import Sidebar from './components/layout/sidebar';
// import TopBar from './components/layout/TopBar';
// import RightSidebar from './components/layout/RightSidebar';
// import NoteEditor from './components/editor/NoteEditor';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
//   const [error, setError] = useState('');
  
//   const [notes, setNotes] = useState([]);
//   const [selectedNoteId, setSelectedNoteId] = useState(null);
//   const [noteContent, setNoteContent] = useState('');
//   const [pendingContent, setPendingContent] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');
    
//     if (token && storedUser) {
//       API.defaults.headers.Authorization = `Token ${token}`;
//       setIsAuthenticated(true);
//       setUser(JSON.parse(storedUser));
//       setCurrentScreen(SCREENS.APP);
//     }
//   }, []);

//   const fetchNotes = async (newOffset = 0, append = false) => {
//     setIsLoading(true);
//     try {
//       const response = await API.get('notes/', {
//         params: { limit: 20, offset: newOffset }
//       });
//       if (Array.isArray(response.data.results)) {
//         const fetchedNotes = response.data.results.map(note => ({
//           ...note,
//           isPage: note.is_page !== undefined ? note.is_page : note.isPage,
//           lastModified: note.last_modified || note.lastModified || note.id,
//           category: note.category || 'Uncategorized',
//         }));
//         setNotes(prev => append ? [...prev, ...fetchedNotes] : fetchedNotes);
//         setHasMore(!!response.data.next);
//         setOffset(newOffset + fetchedNotes.length);
//       } else {
//         console.error('Notes response is not an array:', response.data);
//         setNotes([]);
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//       setNotes([]);
//       setHasMore(false);
//       setError('Failed to fetch notes');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchNotes(0, false);
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     if (pendingContent !== '' && selectedNoteId) {
//       const timeoutId = setTimeout(async () => {
//         try {
//           await handleUpdateNote(selectedNoteId, { content: pendingContent });
//         } catch (error) {
//           setError('Failed to update note content');
//         }
//       }, 500);
//       return () => clearTimeout(timeoutId);
//     }
//   }, [pendingContent, selectedNoteId]);

//   const selectedNote = Array.isArray(notes) ? notes.find(note => note.id === selectedNoteId) || null : null;

//   const handleLogin = async (username, password) => {
//     try {
//       const response = await API.post('login/', { username, password });
//       if (!response.data?.token || !response.data?.user) {
//         throw new Error('Invalid login response');
//       }
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       API.defaults.headers.Authorization = `Token ${response.data.token}`;
//       setIsAuthenticated(true);
//       setUser(response.data.user);
//       setCurrentScreen(SCREENS.APP);
//       setError('');
//     } catch (error) {
//       console.error('Login failed:', error);
//       setError(error.response?.data?.message || 'Login failed');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await API.post('logout/');
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       delete API.defaults.headers.Authorization;
//       setIsAuthenticated(false);
//       setUser(null);
//       setNotes([]);
//       setSelectedNoteId(null);
//       setNoteContent('');
//       setPendingContent('');
//       setCurrentScreen(SCREENS.WELCOME);
//       setError('');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       setError('Logout failed');
//     }
//   };

//   const handleCreateNote = async (title) => {
//     if (title.length < 3) {
//       setError('Title must be at least 3 characters long');
//       throw new Error('Title too short');
//     }
//     setIsLoading(true);
//     setError('');
//     console.log('Creating note with title:', title);
//     try {
//       const response = await API.post('notes/', {
//         title,
//         is_page: false,
//         category: 'Uncategorized',
//       });
//       console.log('Create note response:', response.data);
//       const newNote = {
//         ...response.data,
//         isPage: response.data.is_page !== undefined ? response.data.is_page : response.data.isPage,
//         lastModified: response.data.last_modified || response.data.lastModified || response.data.id,
//         category: response.data.category || 'Uncategorized',
//       };
//       setNotes(prev => [newNote, ...prev]); // Add new note at the top
//       setSelectedNoteId(newNote.id);
//       setNoteContent('');
//       setPendingContent('');
//     } catch (error) {
//       console.error('Error creating note:', error);
//       console.error('Error details:', error.response?.data);
//       setError(error.response?.data?.message || error.message || 'Failed to create note');
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreatePage = async (title) => {
//     if (title.length < 3) {
//       setError('Title must be at least 3 characters long');
//       throw new Error('Title too short');
//     }
//     setIsLoading(true);
//     setError('');
//     console.log('Creating page with title:', title);
//     try {
//       const response = await API.post('notes/', {
//         title,
//         is_page: true,
//         category: 'Uncategorized',
//       });
//       console.log('Create page response:', response.data);
//       const newPage = {
//         ...response.data,
//         isPage: response.data.is_page !== undefined ? response.data.is_page : response.data.isPage,
//         lastModified: response.data.last_modified || response.data.lastModified || response.data.id,
//         category: response.data.category || 'Uncategorized',
//       };
//       setNotes(prev => [newPage, ...prev]); // Add new page at the top
//       setSelectedNoteId(newPage.id);
//       setNoteContent('');
//       setPendingContent('');
//     } catch (error) {
//       console.error('Error creating page:', error);
//       console.error('Error details:', error.response?.data);
//       setError(error.response?.data?.message || error.message || 'Failed to create page');
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNoteSelect = (noteId) => {
//     const note = Array.isArray(notes) ? notes.find(n => n.id === noteId) : null;
//     if (note) {
//       setSelectedNoteId(noteId);
//       setNoteContent(note.content || '');
//       setPendingContent(note.content || '');
//     }
//   };

//   const handleUpdateNote = async (noteId, updates) => {
//     console.log('Updating note:', noteId, updates);
//     try {
//       const response = await API.patch(`notes/${noteId}/`, {
//         ...updates,
//       });
//       console.log('Update note response:', response.data);
//       const updatedNote = {
//         ...response.data,
//         isPage: response.data.is_page !== undefined ? response.data.is_page : response.data.isPage,
//         lastModified: response.data.last_modified || response.data.lastModified || response.data.id,
//         category: response.data.category || 'Uncategorized',
//       };
//       setNotes(prev => prev.map(note => 
//         note.id === noteId ? updatedNote : note
//       ));
//     } catch (error) {
//       console.error('Error updating note:', error);
//       throw error;
//     }
//   };

//   const handleDeleteNote = async (noteId) => {
//     try {
//       await API.delete(`notes/${noteId}/`);
//       setNotes(prev => prev.filter(note => note.id !== noteId));
//       if (selectedNoteId === noteId) {
//         setSelectedNoteId(null);
//         setNoteContent('');
//         setPendingContent('');
//       }
//     } catch (error) {
//       console.error('Error deleting note:', error);
//       setError('Failed to delete note');
//     }
//   };

//   const handleContentChange = (content) => {
//     setNoteContent(content);
//     setPendingContent(content);
//   };

//   const getNotesForCategory = () => {
//     return Array.isArray(notes) ? notes : [];
//   };

//   const loadMoreNotes = () => {
//     if (hasMore && !isLoading) {
//       fetchNotes(offset, true);
//     }
//   };

//   const handleLoginScreen = () => {
//     setCurrentScreen(SCREENS.LOGIN);
//     setError('');
//   };

//   const handlePasswordSubmit = (password) => {
//     handleLogin(user?.username || '', password);
//   };

//   const handleSignUp = async (userData) => {
//     try {
//       const response = await API.post('signup/', userData);
//       if (!response.data?.token || !response.data?.user) {
//         throw new Error('Invalid signup response');
//       }
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       API.defaults.headers.Authorization = `Token ${response.data.token}`;
//       setIsAuthenticated(true);
//       setUser(response.data.user);
//       setCurrentScreen(SCREENS.APP);
//       setError('');
//     } catch (error) {
//       console.error('Signup failed:', error);
//       setError(error.response?.data?.message || 'Signup failed. Please try again.');
//       throw error;
//     }
//   };

//   if (!isAuthenticated) {
//     if (currentScreen === SCREENS.WELCOME) {
//       return (
//         <WelcomeScreen
//           onLogin={handleLoginScreen}
//           onSignUp={() => setCurrentScreen(SCREENS.SIGNUP)}
//         />
//       );
//     }

//     if (currentScreen === SCREENS.LOGIN) {
//       return (
//         <LoginScreen
//           onNext={(username) => {
//             setUser({ username });
//             setCurrentScreen(SCREENS.PASSWORD);
//           }}
//           onSignUp={() => setCurrentScreen(SCREENS.SIGNUP)}
//         />
//       );
//     }

//     if (currentScreen === SCREENS.PASSWORD) {
//       return (
//         <PasswordScreen 
//           onSubmit={handlePasswordSubmit} 
//           onBack={() => setCurrentScreen(SCREENS.LOGIN)}
//           username={user?.username}
//         />
//       );
//     }

//     if (currentScreen === SCREENS.SIGNUP) {
//       return (
//         <SignUpScreen
//           onNext={handleSignUp}
//           onLogin={handleLoginScreen}
//         />
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 flex">
//       {error && (
//         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded">
//           {error}
//         </div>
//       )}
//       {isLoading && (
//         <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded">
//           Loading...
//         </div>
//       )}
//       <Sidebar
//         selectedNote={selectedNoteId}
//         onNoteSelect={handleNoteSelect}
//         onCreateNote={handleCreateNote}
//         onCreatePage={handleCreatePage}
//         onUpdateNote={handleUpdateNote}
//         onDeleteNote={handleDeleteNote}
//         getNotesForCategory={getNotesForCategory}
//         searchQuery={searchQuery}
//         loadMoreNotes={loadMoreNotes}
//         hasMore={hasMore}
//         isLoading={isLoading}
//       />
//       <div className="flex-1 flex flex-col">
//         <TopBar 
//           username={user?.username || 'User'} 
//           onLogout={handleLogout}
//           onSearch={setSearchQuery}
//           searchQuery={searchQuery}
//         />
//         <div className="flex-1 flex">
//           <NoteEditor
//             note={selectedNote}
//             content={noteContent}
//             onChange={handleContentChange}
//             onUpdateNote={handleUpdateNote}
//           />
//           <RightSidebar noteId={selectedNoteId} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import API from "./Services/api.js";
import { SCREENS } from './utils/constants';

// Auth Components
import WelcomeScreen from './components/auth/WelcomeScreen';
import LoginScreen from './components/auth/loginScreen';
import PasswordScreen from './components/auth/passwordScreen';
import SignUpScreen from './components/auth/SignUpScreen';

// Layout Components
import Sidebar from './components/layout/sidebar';
import TopBar from './components/layout/TopBar';
import RightSidebar from './components/layout/RightSidebar';
import NoteEditor from './components/editor/NoteEditor';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
  const [error, setError] = useState('');
  
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [pendingContent, setPendingContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      API.defaults.headers.Authorization = `Token ${token}`;
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      setCurrentScreen(SCREENS.APP);
    }
  }, []);

  const fetchNotes = async (newOffset = 0, append = false) => {
    setIsLoading(true);
    try {
      const response = await API.get('notes/', {
        params: { limit: 20, offset: newOffset }
      });
      if (Array.isArray(response.data.results)) {
        const fetchedNotes = response.data.results.map(note => ({
          ...note,
          isPage: note.is_page !== undefined ? note.is_page : note.isPage,
          lastModified: note.last_modified || note.lastModified || note.id,
          category: note.category || 'Uncategorized',
        }));
        setNotes(prev => append ? [...prev, ...fetchedNotes] : fetchedNotes);
        setHasMore(!!response.data.next);
        setOffset(newOffset + fetchedNotes.length);
      } else {
        console.error('Notes response is not an array:', response.data);
        setNotes([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
      setHasMore(false);
      setError('Failed to fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes(0, false);
    }
  }, [isAuthenticated]);

  const selectedNote = Array.isArray(notes) ? notes.find(note => note.id === selectedNoteId) || null : null;

  const handleLogin = async (username, password) => {
    try {
      const response = await API.post('login/', { username, password });
      if (!response.data?.token || !response.data?.user) {
        throw new Error('Invalid login response');
      }
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      API.defaults.headers.Authorization = `Token ${response.data.token}`;
      setIsAuthenticated(true);
      setUser(response.data.user);
      setCurrentScreen(SCREENS.APP);
      setError('');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await API.post('logout/');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete API.defaults.headers.Authorization;
      setIsAuthenticated(false);
      setUser(null);
      setNotes([]);
      setSelectedNoteId(null);
      setNoteContent('');
      setPendingContent('');
      setCurrentScreen(SCREENS.WELCOME);
      setError('');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed');
    }
  };

  const handleCreateNote = async (title, isPage = false, category = 'Uncategorized') => {
    if (title.length < 3) {
      setError('Title must be at least 3 characters long');
      throw new Error('Title too short');
    }
    setIsLoading(true);
    setError('');
    console.log('Creating note with title:', title, 'isPage:', isPage, 'category:', category);
    try {
      const existingNotes = notes.filter(note => note.title.toLowerCase() === title.toLowerCase());
      if (existingNotes.length > 0) {
        setError('A note with this title already exists. Please choose a different title.');
        throw new Error('Duplicate title');
      }

      const response = await API.post('notes/', {
        title,
        is_page: isPage,
        category,
      });
      console.log('Create note response:', response.data);
      const newNote = {
        ...response.data,
        isPage: response.data.is_page !== undefined ? response.data.is_page : response.data.isPage,
        lastModified: response.data.last_modified || response.data.lastModified || response.data.id,
        category: response.data.category || category,
      };
      setNotes(prev => [newNote, ...prev]);
      setSelectedNoteId(newNote.id);
      setNoteContent('');
      setPendingContent('');
    } catch (error) {
      console.error('Error creating note:', error);
      console.error('Error details:', error.response?.data);
      setError(error.response?.data?.message || error.message || 'Failed to create note');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePage = async (title) => {
    await handleCreateNote(title, true, 'Uncategorized');
  };

  const handleCreateDoc = async (title) => {
    await handleCreateNote(title, false, 'Documentation');
  };

  const handleNoteSelect = (noteId) => {
    const note = Array.isArray(notes) ? notes.find(n => n.id === noteId) : null;
    if (note) {
      setSelectedNoteId(noteId);
      setNoteContent(note.content || '');
      setPendingContent(note.content || '');
    }
  };

  const handleUpdateNote = async (noteId, updates) => {
    console.log('Updating note:', noteId, updates);
    try {
      const response = await API.patch(`notes/${noteId}/`, {
        ...updates,
      });
      console.log('Update note response:', response.data);
      const updatedNote = {
        ...response.data,
        isPage: response.data.is_page !== undefined ? response.data.is_page : response.data.isPage,
        lastModified: response.data.last_modified || response.data.lastModified || response.data.id,
        category: response.data.category || 'Uncategorized',
      };
      setNotes(prev => prev.map(note => 
        note.id === noteId ? updatedNote : note
      ));
    } catch (error) {
      console.error('Error updating note:', error);
      setError('Failed to update note');
      throw error;
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`notes/${noteId}/`);
      setNotes(prev => prev.filter(note => note.id !== noteId));
      if (selectedNoteId === noteId) {
        setSelectedNoteId(null);
        setNoteContent('');
        setPendingContent('');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note');
    }
  };

  const handleContentChange = (content) => {
    setNoteContent(content);
    setPendingContent(content);
  };

  const getNotesForCategory = () => {
    return Array.isArray(notes) ? notes : [];
  };

  const loadMoreNotes = () => {
    if (hasMore && !isLoading) {
      fetchNotes(offset, true);
    }
  };

  const handleLoginScreen = () => {
    setCurrentScreen(SCREENS.LOGIN);
    setError('');
  };

  const handlePasswordSubmit = (password) => {
    handleLogin(user?.username || '', password);
  };

  const handleSignUp = async (userData) => {
    try {
      const response = await API.post('signup/', userData);
      if (!response.data?.token || !response.data?.user) {
        throw new Error('Invalid signup response');
      }
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      API.defaults.headers.Authorization = `Token ${response.data.token}`;
      setIsAuthenticated(true);
      setUser(response.data.user);
      setCurrentScreen(SCREENS.APP);
      setError('');
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
      throw error;
    }
  };

  if (!isAuthenticated) {
    if (currentScreen === SCREENS.WELCOME) {
      return (
        <WelcomeScreen
          onLogin={handleLoginScreen}
          onSignUp={() => setCurrentScreen(SCREENS.SIGNUP)}
        />
      );
    }

    if (currentScreen === SCREENS.LOGIN) {
      return (
        <LoginScreen
          onNext={(username) => {
            setUser({ username });
            setCurrentScreen(SCREENS.PASSWORD);
          }}
          onSignUp={() => setCurrentScreen(SCREENS.SIGNUP)}
        />
      );
    }

    if (currentScreen === SCREENS.PASSWORD) {
      return (
        <PasswordScreen 
          onSubmit={handlePasswordSubmit} 
          onBack={() => setCurrentScreen(SCREENS.LOGIN)}
          username={user?.username}
        />
      );
    }

    if (currentScreen === SCREENS.SIGNUP) {
      return (
        <SignUpScreen
          onNext={handleSignUp}
          onLogin={handleLoginScreen}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded">
          Loading...
        </div>
      )}
      <Sidebar
        selectedNote={selectedNoteId}
        onNoteSelect={handleNoteSelect}
        onCreateNote={handleCreateNote}
        onCreatePage={handleCreatePage}
        onCreateDoc={handleCreateDoc}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        getNotesForCategory={getNotesForCategory}
        searchQuery={searchQuery}
        loadMoreNotes={loadMoreNotes}
        hasMore={hasMore}
        isLoading={isLoading}
      />
      <div className="flex-1 flex flex-col">
        <TopBar 
          username={user?.username || 'User'} 
          onLogout={handleLogout}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="flex-1 flex">
          <NoteEditor
            note={selectedNote}
            content={noteContent}
            onChange={handleContentChange}
            onUpdateNote={handleUpdateNote}
          />
          <RightSidebar noteId={selectedNoteId} />
        </div>
      </div>
    </div>
  );
};

export default App;