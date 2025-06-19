import React, { useState, useRef, useEffect } from 'react';
import { Search, Share2, X, Link, Users, LogOut } from 'lucide-react';

const TopBar = ({ onSearch, onShare, searchQuery, username, onLogout }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareToWeb, setIsShareToWeb] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // New state for user menu
  const shareModalRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleSearchChange = (e) => {
    onSearch?.(e.target.value);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Link copied to clipboard:', url);
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 2000);
    }).catch((err) => {
      console.error('Failed to copy link:', err);
    });
  };

  // Close share modal when clicking outside
  useEffect(() => {
    const handleClickOutsideShare = (event) => {
      if (shareModalRef.current && !shareModalRef.current.contains(event.target)) {
        setIsShareModalOpen(false);
      }
    };
    if (isShareModalOpen) {
      document.addEventListener('mousedown', handleClickOutsideShare);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideShare);
    };
  }, [isShareModalOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutsideUserMenu = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutsideUserMenu);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideUserMenu);
    };
  }, [isUserMenuOpen]);

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    onLogout?.();
  };

  return (
    <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 relative">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-1">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            value={searchQuery || ''}
            onChange={handleSearchChange}
            className="bg-transparent text-white text-sm focus:outline-none w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 relative">
        {username && (
          <span 
            className="text-white text-sm cursor-pointer hover:text-purple-300 transition-colors duration-200"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            Welcome, {username}
          </span>
        )}
        <button 
          onClick={() => setIsShareModalOpen(!isShareModalOpen)}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Share</span>
        </button>

        {/* User Menu (Logout Button) */}
        {isUserMenuOpen && (
          <div
            ref={userMenuRef}
            className="absolute top-12 right-20 w-40 bg-gray-900 text-white rounded-lg shadow-lg p-2 z-50 border border-gray-700"
          >
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Share Modal (Notion-style) */}
      {isShareModalOpen && (
        <div
          ref={shareModalRef}
          className="absolute top-14 right-6 w-80 bg-gray-900 text-white rounded-lg shadow-lg p-4 z-50 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-200">Share this note</h3>
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Share to Web Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-200">Share to web</span>
              <p className="text-xs text-gray-400">Anyone with the link can view</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isShareToWeb}
                onChange={() => setIsShareToWeb(!isShareToWeb)}
                className="sr-only"
              />
              <div className="w-10 h-5 bg-gray-600 rounded-full"></div>
              <div
                className={`absolute w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                  isShareToWeb ? 'transform translate-x-5' : 'translate-x-1'
                }`}
              />
            </label>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors mb-4"
          >
            <Link className="w-4 h-4" />
            <span>{isLinkCopied ? 'Copied!' : 'Copy link'}</span>
          </button>

          {/* Permission Settings
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-200 mb-2">
              <Users className="w-4 h-4" />
              <span>Permissions</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                <span className="text-gray-300">Can edit</span>
                <span className="text-gray-400">Only you</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                <span className="text-gray-300">Can comment</span>
                <span className="text-gray-400">No one</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded">
                <span className="text-gray-300">Can view</span>
                <span className="text-gray-400">No one</span>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TopBar;