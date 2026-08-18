import { TrendingUp, Flame } from 'lucide-react';
import PromptGrid from '../components/prompt/PromptGrid';
import { mockPrompts } from '../services/mockData';

export default function Trending() {
  // Simulate sorting by likes to define "Trending"
  const trendingPrompts = [...mockPrompts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex flex-col gap-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-orange-500/10 mb-2">
          <Flame className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Prompts</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Discover the most popular and highly-rated prompts from the community right now. These prompts are generating incredible results.
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-zinc-300 font-medium">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          <span>Top Performing</span>
        </div>
        <span className="text-sm bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
          Updated Today
        </span>
      </div>

      <PromptGrid prompts={trendingPrompts} />
    </div>
  );
}
