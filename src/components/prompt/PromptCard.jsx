import { Link } from 'react-router-dom';
import { Heart, Bookmark, Copy, CheckCircle2, MessageSquarePlus, Edit } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import { useUser } from '@clerk/react';
import SuggestionModal from './SuggestionModal';
import { cn } from '../../utils/cn';

export default function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const { toggleBookmark, toggleLike, isBookmarked, isLiked } = useAppContext();
  const { isSignedIn, user } = useUser();

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
    if (isSignedIn) setIsSuggestModalOpen(true);
  };

  const hasLiked = isLiked(prompt.id);
  const hasBookmarked = isBookmarked(prompt.id);

  // Check if current user is the author of this prompt
  const isAuthor = user && prompt.author && (
    prompt.author.handle === `@${user.username}` ||
    prompt.author.name === user.fullName ||
    prompt.author.name === user.firstName
  );

  return (
    <>
      <Link to={`/prompt/${prompt.id}`} className="block h-full">
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="group relative flex flex-col h-full bg-white border border-black/[0.06] rounded-2xl p-5 hover:border-black/[0.12] hover:shadow-[0_6px_24px_rgba(30,30,30,0.07)] transition-all duration-200"
        >
          {/* Category + Copy */}
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[#ECEAE4] text-[#55534E]">
              {prompt.category}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 text-[#AAA79F] hover:text-[#252525] bg-[#F5F4F0] hover:bg-[#ECEAE4] rounded-lg transition-colors isolate z-10"
              title="Copy Prompt"
            >
              {copied
                ? <CheckCircle2 className="w-4 h-4 text-[#6B806F]" />
                : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Title + Description */}
          <div className="flex-grow">
            <h3 className="text-[15px] font-semibold text-[#252525] mb-2 line-clamp-2 group-hover:text-[#44423E] transition-colors leading-snug">
              {prompt.title}
            </h3>
            <p className="text-sm text-[#8A8881] line-clamp-3 mb-4 leading-relaxed">
              {prompt.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {prompt.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#8A8881]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-black/5 mt-auto">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={prompt.author.avatar}
                alt={prompt.author.name}
                className="w-6 h-6 rounded-full border border-black/8"
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#44423E] leading-tight">{prompt.author.name}</span>
                <span className="text-[10px] text-[#AAA79F] leading-tight">{prompt.author.handle}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5 text-xs text-[#8A8881]">
              {isAuthor && (
                <Link
                  to={`/prompt/${prompt.id}/edit`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-[#F5F4F0] hover:text-[#252525] transition-colors z-10"
                  title="Edit Prompt"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Link>
              )}

              <button
                onClick={handleSuggest}
                className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-[#F5F4F0] hover:text-[#55534E] transition-colors z-10"
                title="Suggest Edit"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleLike}
                className={cn(
                  'flex items-center gap-1 p-1.5 rounded-lg transition-colors z-10',
                  hasLiked
                    ? 'text-[#B14A4A]'
                    : 'hover:bg-[#F5F4F0] hover:text-[#B14A4A]'
                )}
                title={hasLiked ? 'Unlike' : 'Like'}
              >
                <Heart className={cn('w-3.5 h-3.5', hasLiked && 'fill-[#B14A4A]')} />
                <span>{prompt.likes}</span>
              </button>

              <button
                onClick={handleBookmark}
                className={cn(
                  'flex items-center gap-1 p-1.5 rounded-lg transition-colors z-10',
                  hasBookmarked
                    ? 'text-[#5B7A6B]'
                    : 'hover:bg-[#F5F4F0] hover:text-[#5B7A6B]'
                )}
                title={hasBookmarked ? 'Remove Bookmark' : 'Bookmark'}
              >
                <Bookmark className={cn('w-3.5 h-3.5', hasBookmarked && 'fill-[#5B7A6B]')} />
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
