import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { mockPrompts } from '../services/mockData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [prompts, setPrompts] = useState(mockPrompts);
  const [bookmarkedPrompts, setBookmarkedPrompts] = useState([]);
  const [likedPrompts, setLikedPrompts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Load from local storage when user signs in (simulating a DB fetch)
  useEffect(() => {
    if (isSignedIn && user) {
      const storedBookmarks = localStorage.getItem(`bookmarks_${user.id}`);
      const storedLikes = localStorage.getItem(`likes_${user.id}`);
      const storedSuggestions = localStorage.getItem(`suggestions_${user.id}`);
      const storedPrompts = localStorage.getItem(`prompts_${user.id}`);
      
      if (storedBookmarks) setBookmarkedPrompts(JSON.parse(storedBookmarks));
      if (storedLikes) setLikedPrompts(JSON.parse(storedLikes));
      if (storedSuggestions) setSuggestions(JSON.parse(storedSuggestions));
      if (storedPrompts) setPrompts(JSON.parse(storedPrompts));
    } else {
      // Clear state on sign out
      setBookmarkedPrompts([]);
      setLikedPrompts([]);
      // We keep general prompts for unauthenticated viewers rather than resetting.
    }
  }, [isSignedIn, user]);

  // Save to local storage whenever state changes (simulating DB updates)
  useEffect(() => {
    if (isSignedIn && user) {
      localStorage.setItem(`bookmarks_${user.id}`, JSON.stringify(bookmarkedPrompts));
      localStorage.setItem(`likes_${user.id}`, JSON.stringify(likedPrompts));
      localStorage.setItem(`suggestions_${user.id}`, JSON.stringify(suggestions));
      localStorage.setItem(`prompts_${user.id}`, JSON.stringify(prompts));
    }
  }, [bookmarkedPrompts, likedPrompts, suggestions, prompts, isSignedIn, user]);

  const toggleBookmark = (promptId) => {
    if (!isSignedIn) return false; // Need auth to bookmark
    setBookmarkedPrompts(prev => prev.includes(promptId) ? prev.filter(id => id !== promptId) : [...prev, promptId]);
    return true;
  };

  const toggleLike = (promptId) => {
    if (!isSignedIn) return false; // Need auth to like
    setLikedPrompts(prev => {
      const isCurrentlyLiked = prev.includes(promptId);
      
      // Update mock total count
      setPrompts(currentPrompts => currentPrompts.map(p => {
        if (p.id === promptId) {
          return { ...p, likes: p.likes + (isCurrentlyLiked ? -1 : 1) };
        }
        return p;
      }));

      return isCurrentlyLiked ? prev.filter(id => id !== promptId) : [...prev, promptId];
    });
    return true;
  };

  const submitSuggestion = (promptId, text) => {
    if (!isSignedIn) return false;
    const newSuggestion = {
      id: `sugg-${Date.now()}`,
      promptId,
      authorName: user.fullName || user.username || user.firstName,
      authorAvatar: user.imageUrl,
      text,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setSuggestions(prev => [...prev, newSuggestion]);
    return true;
  };

  const acceptSuggestion = (suggestionId) => {
    if (!isSignedIn) return false;
    
    setSuggestions(prev => {
      const suggestion = prev.find(s => s.id === suggestionId);
      if (!suggestion) return prev;
      
      // Update prompt content
      setPrompts(currentPrompts => 
        currentPrompts.map(p => 
          p.id === suggestion.promptId 
            ? { ...p, content: suggestion.text } 
            : p
        )
      );

      // Mark suggestion as accepted
      return prev.map(s => s.id === suggestionId ? { ...s, status: 'accepted' } : s);
    });
    return true;
  };

  const isBookmarked = (promptId) => bookmarkedPrompts.includes(promptId);
  const isLiked = (promptId) => likedPrompts.includes(promptId);

  const value = {
    prompts,
    bookmarkedPrompts,
    likedPrompts,
    suggestions,
    toggleBookmark,
    toggleLike,
    isBookmarked,
    isLiked,
    submitSuggestion,
    acceptSuggestion
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
