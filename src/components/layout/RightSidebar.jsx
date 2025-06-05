
import React, { useState } from 'react';
import { 
  Type, 
  Image, 
  Quote,
  Code,
  MessageCircle,
  Settings,
} from 'lucide-react';

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [comments] = useState([
    { id: 1, author: 'You', text: 'Remember to add more details here', time: '2 hours ago' },
    { id: 2, author: 'You', text: 'This section needs review', time: '1 day ago' }
  ]);

  const toolbarItems = [
    { icon: Type, name: 'Text', category: 'content' },
    { icon: Image, name: 'Image', category: 'media' },
    { icon: Quote, name: 'Page Quote', category: 'content' },
    { icon: Code, name: 'Code Block', category: 'content' }
  ];

  const handleToolbarItemClick = (item) => {
    console.log(`Clicked: ${item.name}`);
  };

  return (
    <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col">
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
            className={`px-3 py-1 text-sm rounded transition-colors ${
              activeTab === 'comments' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Comments
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
                  Comments
                </h3>
              </div>

              {comments.length > 0 ? (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-300">{comment.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No comments yet</p>
                </div>
              )}

              <div className="mt-4">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full p-2 bg-gray-700 text-white text-sm rounded resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
                <button className="w-full mt-2 p-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Button */}
      <div className="border-t border-gray-700 p-4">
        <button className="flex items-center space-x-2 w-full p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;