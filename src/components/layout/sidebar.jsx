
import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, FileText, X, Check, Edit3, Save } from 'lucide-react';

const Sidebar = ({
  activeCategory,
  selectedNote,
  onCategoryChange,
  onNoteSelect,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  getNotesForCategory,
}) => {
  const [activeTab, setActiveTab] = useState('documents');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteName, setNewNoteName] = useState('');
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [tempTitle, setTempTitle] = useState('');
  const [noteVisibility, setNoteVisibility] = useState({});
  const titleInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  const notes = getNotesForCategory ? getNotesForCategory(activeCategory) : [];

  useEffect(() => {
    const updatedVisibility = {};
    notes.forEach((note) => {
      if (noteVisibility[note.id] === undefined) {
        updatedVisibility[note.id] = false;
        setTimeout(() => {
          setNoteVisibility((prev) => ({ ...prev, [note.id]: true }));
        }, 300);
      } else {
        updatedVisibility[note.id] = noteVisibility[note.id];
      }
    });
    setNoteVisibility(updatedVisibility);
  }, [notes]);

  const handleDeleteClick = (e, noteId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDeleteNote?.(noteId);
    }
  };

  const handleNewNoteClick = () => {
    setIsCreatingNote(true);
    setNewNoteName('');
  };

  const handleCreateNote = () => {
    if (newNoteName.trim()) {
      onCreateNote(newNoteName.trim());
      setIsCreatingNote(false);
      setNewNoteName('');
    }
  };

  const handleCancelCreate = () => {
    setIsCreatingNote(false);
    setNewNoteName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateNote();
    } else if (e.key === 'Escape') {
      handleCancelCreate();
    }
  };

  const startEditingTitle = (e, noteId, currentTitle) => {
    e.stopPropagation();
    setEditingTitleId(noteId);
    setTempTitle(currentTitle || '');
  };

  const saveTitle = (noteId) => {
    if (tempTitle.trim() && onUpdateNote) {
      onUpdateNote(noteId, { title: tempTitle.trim(), lastModified: Date.now() });
    }
    setEditingTitleId(null);
    setTempTitle('');
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTempTitle(newTitle);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (onUpdateNote && editingTitleId) {
        onUpdateNote(editingTitleId, { title: newTitle.trim(), lastModified: Date.now() });
        setEditingTitleId(null);
      }
    }, 500);
  };

  const handleTitleKeyPress = (e, noteId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle(noteId);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setTempTitle('');
      setEditingTitleId(null);
    }
  };

  const handleTitleBlur = (noteId) => {
    setTimeout(() => {
      saveTitle(noteId);
    }, 100);
  };

  const formatDate = (id) => {
    const date = new Date(id);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPreviewText = (content) => {
    if (!content) return 'No content yet...';
    return content.length > 80 ? content.substring(0, 80) + '...' : content;
  };

  useEffect(() => {
    if (editingTitleId && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [editingTitleId]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded"></div>
          <span className="text-white font-semibold">Notemate</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setActiveTab('documents');
              onCategoryChange?.('all');
            }}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              activeTab === 'documents' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => {
              setActiveTab('page');
              onCategoryChange?.('page');
            }}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              activeTab === 'page' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Page
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center justify-between px-2 py-2 mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Notes ({notes?.length || 0})
            </span>
          </div>
          {isCreatingNote && (
            <div className="p-3 bg-gray-700 rounded mb-2 border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-400 uppercase tracking-wide">New Note</span>
              </div>
              <input
                type="text"
                value={newNoteName}
                onChange={(e) => setNewNoteName(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter note name..."
                className="w-full p-2 bg-gray-600 text-white text-sm rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCreateNote}
                  disabled={!newNoteName.trim()}
                  className="flex items-center space-x-1 px-2 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs rounded transition-colors"
                >
                  <Check className="w-3 h-3" />
                  <span>Create</span>
                </button>
                <button
                  onClick={handleCancelCreate}
                  className="flex items-center space-x-1 px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
                >
                  <X className="w-3 h-3" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
          {notes &&
            notes.map((note) => (
              <div
                key={note.id}
                className={`group p-3 text-sm rounded cursor-pointer hover:bg-gray-700 mb-1 transition-all duration-500 delay-300 ${
                  noteVisibility[note.id]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-[-100%]'
                } ${selectedNote === note.id ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
                onClick={() => {
                  onNoteSelect(note.id);
                  setNoteVisibility((prev) => ({ ...prev, [note.id]: false }));
                  setTimeout(() => {
                    setNoteVisibility((prev) => ({ ...prev, [note.id]: true }));
                  }, 300);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <FileText className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      {editingTitleId === note.id ? (
                        <div
                          className="flex items-center space-x-1 flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            ref={titleInputRef}
                            value={tempTitle}
                            onChange={handleTitleChange}
                            onKeyDown={(e) => handleTitleKeyPress(e, note.id)}
                            onBlur={() => handleTitleBlur(note.id)}
                            className="bg-gray-600 text-white px-2 py-1 rounded text-xs flex-1 min-w-0 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="Enter note title..."
                          />
                          <button
                            onClick={() => saveTitle(note.id)}
                            className="p-1 hover:bg-gray-600 rounded"
                          >
                            <Save size={10} className="text-green-400" />
                          </button>
                          <button
                            onClick={() => handleTitleKeyPress({ key: 'Escape' }, note.id)}
                            className="p-1 hover:bg-gray-600 rounded"
                          >
                            <X size={10} className="text-red-400" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                          <h4 className="font-medium truncate flex-1">
                            {note.title || 'Enter a title'}
                          </h4>
                          <button
                            onClick={(e) => startEditingTitle(e, note.id, note.title)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 rounded transition-opacity"
                          >
                            <Edit3 size={10} className="text-gray-400" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      <div className="line-clamp-2 leading-relaxed">
                        {getPreviewText(note.content)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{formatDate(note.id)}</span>
                      {note.content && (
                        <span className="text-xs text-gray-500">
                          {note.content.split(' ').filter((word) => word.length > 0).length} words
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteClick(e, note.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all ml-2"
                    title="Delete note"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="p-2 border-t border-gray-700">
          <button
            onClick={handleNewNoteClick}
            disabled={isCreatingNote}
            className="flex items-center space-x-2 p-3 w-full text-left rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">New Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;