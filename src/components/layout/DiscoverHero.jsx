import { Search } from 'lucide-react';

export default function DiscoverHero() {
  return (
    <div className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-white/5 mb-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-[80px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Community Prompts</h1>
        <p className="text-lg text-zinc-400 max-w-2xl px-4">
          Browse our collection of high-quality prompts curated by the community. Find exactly what you need to optimize your AI results.
        </p>
        
        <div className="max-w-2xl mx-auto w-full relative group mt-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
          <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl p-2 mx-4 sm:mx-0">
            <Search className="w-5 h-5 text-zinc-400 ml-4 hidden sm:block" />
            <input 
              type="text" 
              placeholder="Search prompts by keyword, tag, or author..."
              className="w-full bg-transparent border-none text-zinc-100 placeholder-zinc-500 focus:ring-0 px-4 py-3 text-base outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
