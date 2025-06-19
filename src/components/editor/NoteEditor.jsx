// import React, { useState, useRef, useEffect } from 'react';
// import { Edit3 } from 'lucide-react';
// import { CATEGORIES } from '../../utils/constants';

// const NoteEditor = ({ note, content, onChange, onUpdateNote }) => {
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [tempTitle, setTempTitle] = useState('');
//   const [displayTitle, setDisplayTitle] = useState('');
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentNoteId, setCurrentNoteId] = useState(null);
//   const [category, setCategory] = useState(note?.category || 'Uncategorized');
//   const titleInputRef = useRef(null);
//   const saveTimeoutRef = useRef(null);

//   useEffect(() => {
//     setTimeout(() => setIsVisible(true), 500);
//   }, []);

//   useEffect(() => {
//     if (note && note.id !== currentNoteId) {
//       setDisplayTitle(note.title || '');
//       setCategory(note.category || 'Uncategorized');
//       setCurrentNoteId(note.id);
//       setIsVisible(false);
//       setTimeout(() => setIsVisible(true), 500);
//     } else if (!note) {
//       setDisplayTitle('');
//       setCategory('Uncategorized');
//       setCurrentNoteId(null);
//       setIsVisible(false);
//       setTimeout(() => setIsVisible(true), 500);
//     }
//   }, [note, currentNoteId]);

//   const startEditingTitle = () => {
//     setIsEditingTitle(true);
//     setTempTitle(displayTitle);
//   };

//   const saveTitle = () => {
//     const newTitle = tempTitle.trim();
//     setDisplayTitle(newTitle);
    
//     if (onUpdateNote && note) {
//       onUpdateNote(note.id, { title: newTitle, lastModified: Date.now() });
//     }
//     setIsEditingTitle(false);
//   };

//   const handleTitleChange = (e) => {
//     const newTitle = e.target.value;
//     setTempTitle(newTitle);
//     setDisplayTitle(newTitle);

//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }

//     saveTimeoutRef.current = setTimeout(() => {
//       if (onUpdateNote && note) {
//         onUpdateNote(note.id, { title: newTitle.trim(), lastModified: Date.now() });
//       }
//     }, 500);
//   };

//   const handleTitleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       saveTitle();
//     } else if (e.key === 'Escape') {
//       e.preventDefault();
//       setTempTitle(displayTitle);
//       setIsEditingTitle(false);
//     }
//   };

//   const handleTitleBlur = () => {
//     setTimeout(() => {
//       saveTitle();
//     }, 100);
//   };

//   const handleCategoryChange = (e) => {
//     const newCategory = e.target.value;
//     setCategory(newCategory);
//     if (onUpdateNote && note) {
//       onUpdateNote(note.id, { category: newCategory, lastModified: Date.now() });
//     }
//   };

//   useEffect(() => {
//     if (isEditingTitle && titleInputRef.current) {
//       titleInputRef.current.focus();
//       titleInputRef.current.select();
//     }
//   }, [isEditingTitle]);

//   useEffect(() => {
//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, []);

//   if (!note) {
//     return (
//       <div className="flex-1 bg-gray-900 flex items-center justify-center">
//         <div
//           className={`text-center transition-all duration-500 delay-500 ${
//             isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
//           }`}
//         >
//           <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mx-auto mb-4"></div>
//           <h3 className="text-2xl font-semibold text-white mb-2">Welcome to Notemate</h3>
//           <p className="text-gray-400">Select a note or page to start editing</p>
//         </div>
//       </div>
//     );
//   }

//   const isPage = note?.isPage;
//   const currentContent = content || note?.content || '';
//   const lastModified = note?.lastModified || note?.id;

//   return (
//     <div className="flex-1 bg-gray-900 flex flex-col">
//       <div
//         className={`p-6 border-b border-gray-700 transition-all duration-500 delay-500 ${
//           isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
//         }`}
//       >
//         <div className="flex items-center space-x-3 mb-2">
//           {isEditingTitle ? (
//             <div className="flex items-center space-x-2 flex-1">
//               <input
//                 ref={titleInputRef}
//                 value={tempTitle}
//                 onChange={handleTitleChange}
//                 onBlur={handleTitleBlur}
//                 onKeyDown={handleTitleKeyPress}
//                 className="text-2xl font-semibold bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1 transition-all duration-200"
//                 placeholder="Enter title..."
//               />
//             </div>
//           ) : (
//             <div className="flex items-center space-x-3 flex-1 group">
//               <h1
//                 className={`text-2xl font-semibold flex-1 cursor-pointer hover:text-purple-300 transition-colors duration-200 ${
//                   isPage ? 'text-purple-400' : 'text-white'
//                 }`}
//                 onClick={startEditingTitle}
//               >
//                 {displayTitle || (isPage ? 'My Page' : 'Enter a title')}
//               </h1>
//               <button
//                 onClick={startEditingTitle}
//                 className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-800 rounded transition-all duration-200"
//                 title="Edit title"
//               >
//                 <Edit3 size={16} className="text-gray-400 hover:text-purple-400" />
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
//           <span>
//             Last edited:{' '}
//             {new Date(lastModified).toLocaleDateString('en-US', {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//               hour: '2-digit',
//               minute: '2-digit',
//             })}
//           </span>
//           {currentContent && (
//             <span>{currentContent.split(' ').filter((word) => word.length > 0).length} words</span>
//           )}
//           {currentContent && <span>{currentContent.length} characters</span>}
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-gray-400">
//           <span>Category:</span>
//           <select
//             value={category}
//             onChange={handleCategoryChange}
//             className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
//           >
//             <option value="Uncategorized">Uncategorized</option>
//             {CATEGORIES.map((cat) => (
//               <option key={cat.name} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div
//         className={`flex-1 p-6 transition-all duration-500 delay-700 ${
//           isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
//         }`}
//       >
//         <textarea
//           value={currentContent}
//           onChange={(e) => onChange?.(e.target.value)}
//           placeholder={isPage ? "This is your page. Write anything you want here..." : "Start writing your note..."}
//           className="w-full h-full bg-transparent text-white text-lg leading-relaxed resize-none focus:outline-none placeholder-gray-500 transition-all duration-200 focus:placeholder-gray-600"
//           style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
//         />
//       </div>
//     </div>
//   );
// };

// export default NoteEditor;

import React, { useState, useRef, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import { CATEGORIES } from '../../utils/constants';

const NoteEditor = ({ note, content, onChange, onUpdateNote }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [category, setCategory] = useState(note?.category || 'Uncategorized');
  const titleInputRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  useEffect(() => {
    if (note && note.id !== currentNoteId) {
      setDisplayTitle(note.title || '');
      setCategory(note.category || 'Uncategorized');
      setCurrentNoteId(note.id);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500);
    } else if (!note) {
      setDisplayTitle('');
      setCategory('Uncategorized');
      setCurrentNoteId(null);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 500);
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

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    if (onUpdateNote && note) {
      onUpdateNote(note.id, { category: newCategory, lastModified: Date.now() });
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    onChange(newContent);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      if (onUpdateNote && note) {
        onUpdateNote(note.id, { content: newContent, lastModified: Date.now() });
      }
    }, 1000); // Debounce content saves by 1 second
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
          <h3 className="text-2xl font-semibold text-white mb-2">Welcome to Notemate</h3>
          <p className="text-gray-400">Select a note or page to start editing</p>
        </div>
      </div>
    );
  }

  const isPage = note?.isPage;
  const isDoc = note?.category === 'Documentation';
  const currentContent = content || note?.content || '';
  const lastModified = note?.lastModified || note?.id;

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
                placeholder="Enter title..."
              />
            </div>
          ) : (
            <div className="flex items-center space-x-3 flex-1 group">
              <h1
                className={`text-2xl font-semibold flex-1 cursor-pointer hover:text-purple-300 transition-colors duration-200 ${
                  isPage ? 'text-purple-400' : isDoc ? 'text-blue-400' : 'text-white'
                }`}
                onClick={startEditingTitle}
              >
                {displayTitle || (isPage ? 'My Page' : isDoc ? 'My Documentation' : 'Enter a title')}
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
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
          <span>
            Last edited:{' '}
            {new Date(lastModified).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          {currentContent && (
            <span>{currentContent.split(' ').filter((word) => word.length > 0).length} words</span>
          )}
          {currentContent && <span>{currentContent.length} characters</span>}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Category:</span>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="bg-gray-800 text-white px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          >
            <option value="Uncategorized">Uncategorized</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={`flex-1 p-6 transition-all duration-500 delay-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'
        }`}
      >
        <textarea
          value={currentContent}
          onChange={handleContentChange}
          placeholder={isPage ? "This is your page. Write anything you want here..." : isDoc ? "Write your documentation here..." : "Start writing your note..."}
          className="w-full h-full bg-transparent text-white text-lg leading-relaxed resize-none focus:outline-none placeholder-gray-500 transition-all duration-200 focus:placeholder-gray-600"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        />
      </div>
    </div>
  );
};

export default NoteEditor;