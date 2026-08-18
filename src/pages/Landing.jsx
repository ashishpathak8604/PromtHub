import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Zap, Search, Flame } from 'lucide-react';
import Hero from '../components/layout/Hero';
import PromptGrid from '../components/prompt/PromptGrid';
import { useAppContext } from '../context/AppContext';

export default function Landing() {
  const { prompts } = useAppContext();
  const trendingPreview = [...prompts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <div className="flex flex-col">
      <Hero />
      

      <div className="flex flex-col gap-24 py-16">
        
        {/* Community Feed Preview */}
        <section id="community-feed" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-white">Trending in the Community</h2>
          </div>
          <Link to="/discover" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <PromptGrid prompts={trendingPreview} />
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Why Join PromptHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Curated Discovery</h3>
            <p className="text-zinc-400">Find exactly what you are looking for with advanced filtering by category, tags, and AI model.</p>
          </div>
          
          <div className="glass p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">High-Quality Prompts</h3>
            <p className="text-zinc-400">Access battle-tested prompts that yield the best results for copywriting, coding, and art generation.</p>
          </div>

          <div className="glass p-8 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Vibrant Community</h3>
            <p className="text-zinc-400">Share your custom creations, bookmark your favorites, and engage with top prompt engineers.</p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="w-full max-w-4xl mx-auto text-center px-4">
        <div className="relative rounded-3xl overflow-hidden glass border border-white/10 p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
          <div className="relative z-10">
            <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to supercharge your AI workflows?</h2>
            <Link 
              to="/discover"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-zinc-900 font-bold hover:bg-zinc-200 transition-colors"
            >
              Explore the Community Now
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
