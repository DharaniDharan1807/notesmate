import React, { useState, useEffect, useRef } from 'react';
import API from "../../Services/api.js";
import { 
  Type, 
  Image, 
  Quote,
  Code,
  MessageCircle,
  Upload,
  FileText,
  Edit2,
  Trash2,
  Check,
  X
} from 'lucide-react';

const RightSidebar = ({ noteId }) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Refs for file inputs
  const textFileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);
  const quoteFileInputRef = useRef(null);
  const codeFileInputRef = useRef(null);

  const toolbarItems = [
    { icon: Type, name: 'Text', category: 'content', type: 'text' },
    { icon: Image, name: 'Image', category: 'media', type: 'image' },
    { icon: Quote, name: 'Page Quote', category: 'content', type: 'quote' },
    { icon: Code, name: 'Code Block', category: 'content', type: 'code' }
  ];

  // Fetch comments for the current note
  useEffect(() => {
    if (noteId) {
      const fetchComments = async () => {
        setLoading(true);
        try {
          const response = await API.get(`notes/${noteId}/comments/`);
          setComments(response.data);
        } catch (err) {
          console.error('Failed to fetch comments:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchComments();
    }
  }, [noteId]);

  // Add a new comment
  const addComment = async () => {
    if (!newComment.trim() || !noteId) return;
    
    try {
      const response = await API.post(`notes/${noteId}/comments/`, { text: newComment.trim() });
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  // Update existing comment
  const saveEditComment = async () => {
    if (!editingText.trim() || !editingCommentId) return;
    
    try {
      const response = await API.patch(`comments/${editingCommentId}/`, { text: editingText.trim() });
      setComments(comments.map(comment => 
        comment.id === editingCommentId 
          ? response.data
          : comment
      ));
      setEditingCommentId(null);
      setEditingText('');
    } catch (err) {
      console.error('Failed to update comment:', err);
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await API.delete(`comments/${commentId}/`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  const startEditComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  // Handle text file upload
  const handleTextFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textContent = e.target.result;
        console.log('Text content loaded:', textContent);
        alert(`Text file loaded: ${file.name}\nContent preview: ${textContent.substring(0, 100)}...`);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid text file (.txt)');
    }
    event.target.value = '';
  };

  // Handle image file upload
  const handleImageFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        console.log('Image loaded:', file.name);
        alert(`Image uploaded: ${file.name}\nSize: ${(file.size / 1024).toFixed(2)} KB`);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (jpg, png, gif, etc.)');
    }
    event.target.value = '';
  };

  // Handle quote file upload
  const handleQuoteFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const quoteContent = e.target.result;
        console.log('Quote content loaded:', quoteContent);
        alert(`Quote file loaded: ${file.name}\nContent: "${quoteContent.substring(0, 100)}..."`);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid text file (.txt) for quotes');
    }
    event.target.value = '';
  };

  // Handle code file upload
  const handleCodeFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const codeContent = e.target.result;
        console.log('Code content loaded:', codeContent);
        const fileExtension = file.name.split('.').pop();
        alert(`Code file loaded: ${file.name}\nLanguage: ${fileExtension}\nLines: ${codeContent.split('\n').length}`);
      };
      reader.readAsText(file);
    } else {
      alert('Please select a valid code file');
    }
    event.target.value = '';
  };

  // Handle manual text input
  const handleManualTextInput = () => {
    const textContent = prompt('Enter your text:');
    if (textContent) {
      console.log('Manual text input:', textContent);
      alert(`Text added: ${textContent}`);
    }
  };

  // Handle quote insertion
  const handleQuoteInsertion = () => {
    const quoteChoice = confirm('Click OK to upload a quote file, or Cancel to type quote manually');
    if (quoteChoice) {
      quoteFileInputRef.current?.click();
    } else {
      const quoteText = prompt('Enter your quote:');
      if (quoteText) {
        console.log('Manual quote input:', quoteText);
        alert(`Quote added: "${quoteText}"`);
      }
    }
  };

  // Handle code block insertion
  const handleCodeBlockInsertion = () => {
    const codeChoice = confirm('Click OK to upload a code file, or Cancel to type code manually');
    if (codeChoice) {
      codeFileInputRef.current?.click();
    } else {
      const codeText = prompt('Enter your code:');
      if (codeText) {
        console.log('Manual code input:', codeText);
        alert(`Code block added`);
      }
    }
  };

  const handleToolbarItemClick = (item) => {
    console.log(`Clicked: ${item.name}`);
    
    switch (item.type) {
      case 'text':
        const textChoice = confirm('Click OK to upload a text file, or Cancel to type text manually');
        if (textChoice) {
          textFileInputRef.current?.click();
        } else {
          handleManualTextInput();
        }
        break;
      case 'image':
        imageFileInputRef.current?.click();
        break;
      case 'quote':
        handleQuoteInsertion();
        break;
      case 'code':
        handleCodeBlockInsertion();
        break;
      default:
        console.log(`No handler for ${item.type}`);
    }
  };

  return (
    <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={textFileInputRef}
        onChange={handleTextFileUpload}
        accept=".txt"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={imageFileInputRef}
        onChange={handleImageFileUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={quoteFileInputRef}
        onChange={handleQuoteFileUpload}
        accept=".txt"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={codeFileInputRef}
        onChange={handleCodeFileUpload}
        accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.php,.rb,.go,.rs,.swift,.kt,.scala,.sh,.sql,.json,.xml,.yaml,.yml,.md"
        style={{ display: 'none' }}
      />

      {/* Tab Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              activeTab === 'editor' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Editor
          </button>
          <button 
            onClick={() => setActiveTab('comments')}
            className={`px-3 py-1 text-sm rounded transition-colors flex items-center space-x-1 ${
              activeTab === 'comments' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>Comments</span>
            {comments.length > 0 && (
              <span className="bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {comments.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'editor' && (
          <div className="p-4 space-y-6">
            {/* Insert Functions Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">
                Insert Functions
              </h3>
              <div className="space-y-1">
                {toolbarItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors group"
                      onClick={() => handleToolbarItemClick(item)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        <span className="text-white text-sm group-hover:text-white">{item.name}</span>
                      </div>
                      {(item.type === 'text' || item.type === 'image' || item.type === 'quote' || item.type === 'code') && (
                        <Upload className="w-3 h-3 text-gray-500 group-hover:text-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  Comments ({comments.length})
                </h3>
              </div>

              {/* Add new comment */}
              <div className="space-y-2">
                <textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white text-sm rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
                <button 
                  onClick={addComment}
                  disabled={!newComment.trim() || !noteId}
                  className="w-full p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
                >
                  Add Comment
                </button>
              </div>

              {/* Comments list */}
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">Loading comments...</p>
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{comment.author || 'Anonymous'}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-400">
                            {new Date(comment.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <button
                            onClick={() => startEditComment(comment.id, comment.text)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                            title="Edit comment"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteComment(comment.id)}
                            className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                            title="Delete comment"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full p-2 bg-gray-600 text-white text-sm rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows="2"
                            autoFocus
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={saveEditComment}
                              className="flex items-center space-x-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                            >
                              <Check className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={cancelEditComment}
                              className="flex items-center space-x-1 px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
                            >
                              <X className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-300">{comment.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No comments yet</p>
                  <p className="text-xs text-gray-600 mt-1">Add your first comment above</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;