
import React, { useState, useRef, useEffect } from 'react';
import { Edit3 } from 'lucide-react';

const NoteEditor = ({ note, content, onChange, onUpdateNote }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false); // Initialize as false for load animation
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const titleInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Trigger animation on component mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500); // Matches header delay
  }, []);

  // Handle note selection changes
  useEffect(() => {
    if (note && note.id !== currentNoteId) {
      setDisplayTitle(note.title || '');
      setCurrentNoteId(note.id);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500); // Matches header delay
    } else if (!note) {
      setDisplayTitle('');
      setCurrentNoteId(null);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500); // Matches header delay
    }
  }, [note, currentNoteId]);

  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setTempTitle(displayTitle);
  };

  const saveTitle = () => {
    const newTitle = tempTitle.trim();
    setDisplayTitle(newTitle);
    if (onUpdateNote && note) {
      onUpdateNote(note.id, { title: newTitle, lastModified: Date.now() });
    }
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTempTitle(newTitle);
    setDisplayTitle(newTitle);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (onUpdateNote && note) {
        onUpdateNote(note.id, { title: newTitle.trim(), lastModified: Date.now() });
      }
    }, 500);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setTempTitle(displayTitle);
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    setTimeout(() => {
      saveTitle();
    }, 100);
  };

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!note) {
    return (
      <div className="flex-1 bg-gray-900 flex items-center justify-center">
        <div
          className={`text-center transition-all duration-500 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
          }`}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-white mb-2">Welcome to Notemate</h2>
          <p className="text-gray-400">Select a note to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-900 flex flex-col">
      <div
        className={`p-6 border-b border-gray-700 transition-all duration-500 delay-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
        }`}
      >
        <div className="flex items-center space-x-3 mb-2">
          {isEditingTitle ? (
            <div className="flex items-center space-x-2 flex-1">
              <input
                ref={titleInputRef}
                value={tempTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyPress}
                className="text-2xl font-semibold bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1 transition-all duration-200"
                placeholder="Enter note title..."
              />
            </div>
          ) : (
            <div className="flex items-center space-x-3 flex-1 group">
              <h1
                className="text-2xl font-semibold text-white flex-1 cursor-pointer hover:text-purple-300 transition-colors duration-200"
                onClick={startEditingTitle}
              >
                {displayTitle || 'Enter a title'}
              </h1>
              <button
                onClick={startEditingTitle}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-800 rounded transition-all duration-200"
                title="Edit title"
              >
                <Edit3 size={16} className="text-gray-400 hover:text-purple-400" />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>
            Last edited:{' '}
            {new Date(note.lastModified || note.id).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {content && (
            <span>{content.split(' ').filter((word) => word.length > 0).length} words</span>
          )}
          {content && <span>{content.length} characters</span>}
        </div>
      </div>
      <div
        className={`flex-1 p-6 transition-all duration-500 delay-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
        }`}
      >
        <textarea
          value={content || note.content || ''}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Start writing your note..."
          className="w-full h-full bg-transparent text-white text-lg leading-relaxed resize-none focus:outline-none placeholder-gray-500 transition-all duration-200 focus:placeholder-gray-600"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        />
      </div>
    </div>
  );
};

export default NoteEditor;