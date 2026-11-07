import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useUser } from '@clerk/react';
import { mockPrompts } from '../services/mockData';

const AppContext = createContext();

const storageKeys = {
  bookmarks: (userId) => `bookmarks_${userId}`,
  likes: (userId) => `likes_${userId}`,
  suggestions: (userId) => `suggestions_${userId}`,
  prompts: (userId) => `prompts_${userId}`,
};

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from localStorage`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not persist ${key} to localStorage`, error);
  }
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const [prompts, setPrompts] = useState(mockPrompts);
  const [bookmarkedPrompts, setBookmarkedPrompts] = useState([]);
  const [likedPrompts, setLikedPrompts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Load from local storage when user signs in (simulating a DB fetch)
  useEffect(() => {
    if (isSignedIn && user) {
      setBookmarkedPrompts(readStorage(storageKeys.bookmarks(user.id), []));
      setLikedPrompts(readStorage(storageKeys.likes(user.id), []));
      setSuggestions(readStorage(storageKeys.suggestions(user.id), []));
      setPrompts(readStorage(storageKeys.prompts(user.id), mockPrompts));
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
      writeStorage(storageKeys.bookmarks(user.id), bookmarkedPrompts);
      writeStorage(storageKeys.likes(user.id), likedPrompts);
      writeStorage(storageKeys.suggestions(user.id), suggestions);
      writeStorage(storageKeys.prompts(user.id), prompts);
    }
  }, [bookmarkedPrompts, likedPrompts, suggestions, prompts, isSignedIn, user]);

  const toggleBookmark = useCallback(
    (promptId) => {
      if (!isSignedIn) return false; // Need auth to bookmark
      setBookmarkedPrompts((previous) =>
        previous.includes(promptId)
          ? previous.filter((id) => id !== promptId)
          : [...previous, promptId]
      );
      return true;
    },
    [isSignedIn]
  );

  const toggleLike = useCallback(
    (promptId) => {
      if (!isSignedIn) return false; // Need auth to like

      setLikedPrompts((previous) => {
        const isCurrentlyLiked = previous.includes(promptId);

        // Update mock total count
        setPrompts((currentPrompts) =>
          currentPrompts.map((prompt) => {
            if (prompt.id === promptId) {
              return { ...prompt, likes: prompt.likes + (isCurrentlyLiked ? -1 : 1) };
            }
            return prompt;
          })
        );

        return isCurrentlyLiked
          ? previous.filter((id) => id !== promptId)
          : [...previous, promptId];
      });

      return true;
    },
    [isSignedIn]
  );

  const submitSuggestion = useCallback(
    (promptId, text) => {
      if (!isSignedIn) return false;

      const newSuggestion = {
        id: `sugg-${Date.now()}`,
        promptId,
        authorName: user.fullName || user.username || user.firstName,
        authorAvatar: user.imageUrl,
        text,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      setSuggestions((previous) => [...previous, newSuggestion]);
      return true;
    },
    [isSignedIn, user]
  );

  const acceptSuggestion = useCallback(
    (suggestionId) => {
      if (!isSignedIn) return false;

      setSuggestions((previous) => {
        const suggestion = previous.find((item) => item.id === suggestionId);
        if (!suggestion) return previous;

        // Update prompt content
        setPrompts((currentPrompts) =>
          currentPrompts.map((prompt) =>
            prompt.id === suggestion.promptId
              ? { ...prompt, content: suggestion.text }
              : prompt
          )
        );

        // Mark suggestion as accepted
        return previous.map((item) =>
          item.id === suggestionId ? { ...item, status: 'accepted' } : item
        );
      });

      return true;
    },
    [isSignedIn]
  );

  const addPrompt = useCallback(
    (promptData) => {
      if (!isSignedIn || !user) return false;

      const newPrompt = {
        id: promptData.id || `prompt-${Date.now()}`,
        title: promptData.title,
        description: promptData.description,
        content: promptData.content,
        category: promptData.category,
        model: promptData.model || '',
        tags: promptData.tags || [],
        visibility: promptData.visibility || 'public',
        examplePreview: promptData.examplePreview,
        author: {
          name: user.fullName || user.firstName || user.username,
          handle: `@${user.username}`,
          avatar: user.imageUrl,
        },
        likes: 0,
        bookmarks: 0,
        createdAt: new Date().toISOString(),
      };

      setPrompts((previous) => [...previous, newPrompt]);
      return true;
    },
    [isSignedIn, user]
  );

  const updatePrompt = useCallback(
    (promptId, promptData) => {
      if (!isSignedIn || !user) return false;

      setPrompts((previous) =>
        previous.map((prompt) =>
          prompt.id === promptId
            ? {
                ...prompt,
                title: promptData.title,
                description: promptData.description,
                content: promptData.content,
                category: promptData.category,
                model: promptData.model || '',
                tags: promptData.tags || [],
                visibility: promptData.visibility || 'public',
                examplePreview: promptData.examplePreview,
              }
            : prompt
        )
      );
      return true;
    },
    [isSignedIn, user]
  );

  const isBookmarked = useCallback(
    (promptId) => bookmarkedPrompts.includes(promptId),
    [bookmarkedPrompts]
  );

  const isLiked = useCallback(
    (promptId) => likedPrompts.includes(promptId),
    [likedPrompts]
  );

  const value = useMemo(
    () => ({
      prompts,
      bookmarkedPrompts,
      likedPrompts,
      suggestions,
      toggleBookmark,
      toggleLike,
      isBookmarked,
      isLiked,
      submitSuggestion,
      acceptSuggestion,
      addPrompt,
      updatePrompt,
    }),
    [
      prompts,
      bookmarkedPrompts,
      likedPrompts,
      suggestions,
      toggleBookmark,
      toggleLike,
      isBookmarked,
      isLiked,
      submitSuggestion,
      acceptSuggestion,
      addPrompt,
      updatePrompt,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
