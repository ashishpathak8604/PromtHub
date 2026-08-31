import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useUser } from '@clerk/react';
import { ArrowLeft, CheckCircle2, Copy, Heart, Bookmark, Edit } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

export default function PromptDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { prompts, toggleLike, toggleBookmark, isLiked, isBookmarked } = useAppContext();
  const { user: currentUser } = useUser();
  const [copied, setCopied] = useState(false);

  const prompt = prompts.find(p => p.id === id);

  if (!prompt) {
    return (
      <div className="py-20 text-center" style={{ background: '#F7F6F2', minHeight: '100vh' }}>
        <h2 className="text-xl font-semibold text-[#252525] mb-3">Prompt not found</h2>
        <Link to="/" className="text-sm text-[#77756F] hover:text-[#252525] transition-colors">
          ← Return to home
        </Link>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if current user is the author of this prompt
  const isAuthor = currentUser && prompt.author && (
    prompt.author.handle === `@${currentUser.username}` ||
    prompt.author.name === currentUser.fullName ||
    prompt.author.name === currentUser.firstName
  );

  const handleBack = () => {
    navigate(-1);
  };

  const hasLiked = isLiked(prompt.id);
  const hasBookmarked = isBookmarked(prompt.id);

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8" style={{ minHeight: '100vh' }}>
      <button 
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 text-sm text-[#77756F] hover:text-[#252525] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mt-0.5 text-3xl" />
        Back
      </button>

      <div className="bg-white border border-black/[0.07] rounded-3xl p-8 md:p-12">
        {/* Meta + Title */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[#ECEAE4] text-[#55534E]">
                {prompt.category}
              </span>
              <span className="text-xs text-[#AAA79F]">
                Added {new Date(prompt.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#252525] tracking-[-0.03em] mb-3">
              {prompt.title}
            </h1>
            <p className="text-sm text-[#77756F] leading-relaxed max-w-2xl">
              {prompt.description}
            </p>
          </div>

          {/* Like + Bookmark actions */}
          <div className="flex items-center gap-1 bg-[#F5F4F0] p-1.5 rounded-2xl border border-black/[0.05] shrink-0">
            <button
              onClick={() => toggleLike(prompt.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-colors',
                hasLiked ? 'text-[#B14A4A]' : 'text-[#77756F] hover:text-[#B14A4A] hover:bg-white'
              )}
            >
              <Heart className={cn('w-4 h-4', hasLiked && 'fill-[#B14A4A]')} />
              <span className="font-medium">{prompt.likes}</span>
            </button>
            <div className="w-px h-5 bg-black/[0.07]" />
            <button
              onClick={() => toggleBookmark(prompt.id)}
              className={cn(
                'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-colors',
                hasBookmarked ? 'text-[#5B7A6B]' : 'text-[#77756F] hover:text-[#5B7A6B] hover:bg-white'
              )}
            >
              <Bookmark className={cn('w-4 h-4', hasBookmarked && 'fill-[#5B7A6B]')} />
              <span className="font-medium">{prompt.bookmarks}</span>
            </button>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-black/6">
          <div className="flex items-center gap-3">
            <img
              src={prompt.author.avatar}
              alt={prompt.author.name}
              className="w-10 h-10 rounded-full border border-black/8"
            />
            <div>
              <div className="text-sm font-semibold text-[#252525]">{prompt.author.name}</div>
              <div className="text-xs text-[#8A8881]">{prompt.author.handle}</div>
            </div>
          </div>

          {isAuthor && (
            <Link
              to={`/prompt/${prompt.id}/edit`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[#77756F] hover:text-[#252525] hover:bg-[#F5F4F0] transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Link>
          )}
        </div>

        {/* Prompt Content */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#44423E] uppercase tracking-wider">Prompt Content</h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#252525] text-white hover:bg-[#111] transition-colors shadow-sm"
            >
              {copied
                ? <><CheckCircle2 className="w-4 h-4" />Copied!</>
                : <><Copy className="w-4 h-4" />Copy Prompt</>}
            </button>
          </div>

          <div className="bg-[#F7F6F2] border border-black/[0.06] rounded-2xl p-6 font-mono text-sm leading-[1.8] text-[#3D3B37] whitespace-pre-wrap">
            {prompt.content}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span key={tag} className="text-xs text-[#8A8881]">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
