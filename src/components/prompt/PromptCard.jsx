import { Link } from 'react-router-dom';
import { Heart, Bookmark, Copy, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { useUser } from '@clerk/clerk-react';
import SuggestionModal from './SuggestionModal';
import { cn } from '../../utils/cn';

export default function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useAppContext();
  const { isSignedIn } = useUser();

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(prompt.id);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(prompt.id);
  };

  const handleSuggest = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSignedIn) {
      setIsSuggestModalOpen(true);
    }
  };

  const hasLiked = isLiked(prompt.id);
  const hasBookmarked = isBookmarked(prompt.id);

  return (
    <>
      <Link to={`/prompt/${prompt.id}`} className="block h-full">
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="group relative flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:bg-zinc-800/60 hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgb(168,85,247,0.12)] transition-colors duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {prompt.category}
            </span>
            <button 
              onClick={handleCopy}
              className="p-1.5 text-zinc-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors isolate z-10"
              title="Copy Prompt"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex-grow">
            <h3 className="text-xl font-bold text-zinc-100 mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
              {prompt.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
              {prompt.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {prompt.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
            <div className="flex items-center gap-2">
              <img 
                src={prompt.author.avatar} 
                alt={prompt.author.name} 
                className="w-6 h-6 rounded-full border border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors leading-tight">
                  {prompt.author.name}
                </span>
                <span className="text-xs text-zinc-500 leading-tight">{prompt.author.handle}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2 text-xs font-medium text-zinc-500">
              <button 
                onClick={handleSuggest}
                className="flex items-center gap-1.5 transition-colors tooltip-trigger z-10 p-1.5 rounded-md hover:bg-white/5 hover:text-purple-400"
                title="Suggest Edit"
              >
                <MessageSquarePlus className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 transition-colors tooltip-trigger z-10 p-1.5 rounded-md hover:bg-white/5",
                  hasLiked ? "text-pink-500 hover:text-pink-400" : "hover:text-pink-400"
                )}
                title={hasLiked ? "Unlike" : "Like"}
              >
                <Heart className={cn("w-4 h-4", hasLiked && "fill-pink-500")} />
                <span>{prompt.likes}</span>
              </button>
              
              <button 
                onClick={handleBookmark}
                className={cn(
                  "flex items-center gap-1.5 transition-colors tooltip-trigger z-10 p-1.5 rounded-md hover:bg-white/5",
                  hasBookmarked ? "text-blue-500 hover:text-blue-400" : "hover:text-blue-400"
                )}
                title={hasBookmarked ? "Remove Bookmark" : "Bookmark"}
              >
                <Bookmark className={cn("w-4 h-4", hasBookmarked && "fill-blue-500")} />
                <span>{prompt.bookmarks}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
      
      <SuggestionModal 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
        prompt={prompt} 
      />
    </>
  );
}
