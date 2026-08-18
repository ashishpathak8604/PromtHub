import { Layers } from 'lucide-react';

export default function Collections() {
  // Simulating collection clusters
  const mockCollections = [
    {
      id: 1,
      name: "Mastering Midjourney V6",
      description: "A curated set of prompts designed for photorealistic portraits, dynamic lighting, and surreal landscapes in Midjourney.",
      count: 12,
      curator: "AI Art Collective",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      name: "Expert Coding Assistants",
      description: "Powerful ChatGPT structures and context prompts to bootstrap Next.js applications, debug complex state, and write tests.",
      count: 8,
      curator: "DevOps Dave",
      color: "from-emerald-500 to-teal-400"
    },
    {
      id: 3,
      name: "Marketing Copy Hacks",
      description: "Copywriting frameworks optimized for Claude and GPT-4 to generate converting ad copy, email sequences, and SEO blogs.",
      count: 15,
      curator: "Growth Gurus",
      color: "from-orange-500 to-pink-500"
    }
  ];

  return (
    <div className="flex flex-col gap-10 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-500/10 mb-2">
          <Layers className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Collections</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Explore specialized groups of prompts hand-picked by experts for achieving specific tasks and mastering AI workflows.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {mockCollections.map(collection => (
          <div 
            key={collection.id}
            className="group relative flex flex-col h-full bg-zinc-900/40 border border-white/5 rounded-2xl p-6 hover:bg-zinc-800/60 transition-colors duration-300 cursor-pointer overflow-hidden"
          >
            {/* Ambient background glow */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${collection.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 text-zinc-300">
                  {collection.count} Prompts
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                {collection.name}
              </h3>
              
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-grow">
                {collection.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <span className="text-xs text-zinc-500">Curated by</span>
                <span className="text-sm font-medium text-zinc-300">{collection.curator}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
