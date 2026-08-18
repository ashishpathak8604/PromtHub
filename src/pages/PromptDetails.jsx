import { useParams, Link } from 'react-router-dom';
import { mockPrompts } from '../services/mockData';
import { ArrowLeft, CheckCircle2, Copy, Heart, Bookmark, Eye, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function PromptDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  
  const prompt = mockPrompts.find(p => p.id === id);

  if (!prompt) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Prompt not found</h2>
        <Link to="/" className="text-purple-400 hover:text-purple-300">Return to home</Link>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Discover
      </Link>

      <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {prompt.category}
                </span>
                <span className="text-sm text-zinc-500">
                  Added on {new Date(prompt.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                {prompt.title}
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {prompt.description}
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-2xl border border-white/5">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-pink-400 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="font-medium">{prompt.likes}</span>
              </button>
              <div className="w-px h-6 bg-white/10" />
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-blue-400 transition-colors">
                <Bookmark className="w-5 h-5" />
                <span className="font-medium">{prompt.bookmarks}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
            <img 
              src={prompt.author.avatar} 
              alt={prompt.author.name} 
              className="w-12 h-12 rounded-full border-2 border-zinc-800"
            />
            <div>
              <div className="font-medium text-white text-lg">{prompt.author.name}</div>
              <div className="text-zinc-500">{prompt.author.handle}</div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Prompt Content</h3>
              <button 
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Prompt
                  </>
                )}
              </button>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="relative bg-[#0d1117] border border-white/10 rounded-2xl p-6 font-mono text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                {prompt.content}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span key={tag} className="text-sm font-medium text-zinc-400 bg-zinc-900/50 border border-white/5 px-3 py-1.5 rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
