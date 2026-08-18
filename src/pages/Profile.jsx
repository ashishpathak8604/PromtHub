import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import PromptGrid from '../components/prompt/PromptGrid';
import { Bookmark, Heart, Settings, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { prompts, bookmarkedPrompts, likedPrompts, suggestions, acceptSuggestion } = useAppContext();
  const [activeTab, setActiveTab] = useState('bookmarks');

  // Protect route
  if (isLoaded && !isSignedIn) {
    return <Navigate to="/" />;
  }

  if (!isLoaded || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  // Filter global prompts based on AppContext user state
  const userBookmarks = prompts.filter(p => bookmarkedPrompts.includes(p.id));
  const userLikes = prompts.filter(p => likedPrompts.includes(p.id));

  return (
    <div className="flex flex-col gap-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 pt-12">
          <img 
            src={user.imageUrl} 
            alt={user.fullName}
            className="w-24 h-24 rounded-2xl border-4 border-zinc-900 shadow-xl"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">{user.fullName}</h1>
            <p className="text-zinc-400">@{user.username || user.firstName?.toLowerCase() || 'user'}</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors border border-white/5">
            <Settings className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Quick Stats */}
        <div className="relative z-10 flex flex-wrap justify-center sm:justify-start gap-8 mt-8 pt-8 border-t border-white/5 text-center sm:text-left">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">{bookmarkedPrompts.length}</span>
            <span className="text-sm text-zinc-500 font-medium">Bookmarks</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">{likedPrompts.length}</span>
            <span className="text-sm text-zinc-500 font-medium">Likes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">{suggestions.length}</span>
            <span className="text-sm text-zinc-500 font-medium">Suggestions</span>
          </div>
        </div>
      </div>

      {/* Profile Content Tabs */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 sm:gap-4 border-b border-white/5 pb-px overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'bookmarks' 
                ? 'border-purple-500 text-purple-400' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Bookmarked Prompts
          </button>
          <button 
            onClick={() => setActiveTab('likes')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'likes' 
                ? 'border-pink-500 text-pink-400' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            Liked Prompts
          </button>
          <button 
            onClick={() => setActiveTab('suggestions')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'suggestions' 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MessageSquarePlus className="w-4 h-4" />
            Suggestions Inbox
          </button>
        </div>

        <div className="pt-4">
          {activeTab === 'bookmarks' && (
            userBookmarks.length > 0 ? (
              <PromptGrid prompts={userBookmarks} />
            ) : (
              <div className="text-center py-20 px-4 glass rounded-2xl border border-white/5 border-dashed">
                <Bookmark className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">No bookmarks yet</h3>
                <p className="text-zinc-500 max-w-sm mx-auto">
                  When you find a prompt you want to save for later, click the bookmark icon and it will show up here.
                </p>
              </div>
            )
          )}

          {activeTab === 'likes' && (
            userLikes.length > 0 ? (
              <PromptGrid prompts={userLikes} />
            ) : (
              <div className="text-center py-20 px-4 glass rounded-2xl border border-white/5 border-dashed">
                <Heart className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">No liked prompts</h3>
                <p className="text-zinc-500 max-w-sm mx-auto">
                  Show some love! Prompts you upvote by clicking the heart icon will be collected here.
                </p>
              </div>
            )
          )}

          {activeTab === 'suggestions' && (
            suggestions.length > 0 ? (
              <div className="grid gap-4 max-w-3xl mx-auto w-full">
                {suggestions.map(suggestion => {
                  const targetPrompt = prompts.find(p => p.id === suggestion.promptId);
                  return (
                    <div key={suggestion.id} className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={suggestion.authorAvatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-white/10" />
                          <div>
                            <p className="text-sm font-bold text-white">{suggestion.authorName}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">Suggested an edit for <span className="text-purple-400 font-medium">"{targetPrompt?.title}"</span></p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                          suggestion.status === 'pending' 
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                            : 'bg-green-500/10 text-green-500 border-green-500/20'
                        }`}>
                          {suggestion.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-1 bg-purple-500/20 rounded-full" />
                        <div className="bg-black/30 rounded-xl p-4 font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap ml-2">
                          {suggestion.text}
                        </div>
                      </div>

                      {suggestion.status === 'pending' && (
                        <div className="flex justify-end gap-3 mt-2">
                          <button 
                            onClick={() => acceptSuggestion(suggestion.id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Accept & Update Prompt
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 px-4 glass rounded-2xl border border-white/5 border-dashed">
                <MessageSquarePlus className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-300 mb-2">No incoming suggestions</h3>
                <p className="text-zinc-500 max-w-sm mx-auto">
                  When the community suggests improvements to prompts, you can review and accept them here.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
