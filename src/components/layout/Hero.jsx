import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { Route, useNavigate } from 'react-router-dom';
import LiquidBackground from './LiquidBackground';

export default function Hero() {
  const navigator = useNavigate();
  const movetodiscover = () => {
    navigator("/discover");
  };

  return (
    <div className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      <LiquidBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Discover the best AI prompts for your next project</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Elevate Your AI with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Premium Prompts
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-4 max-w-2xl mx-auto text-xl text-zinc-400 mb-10"
        >
          Explore, share, and collaborate on high-quality prompts for Midjourney, ChatGPT, and more. Join the community of top AI creators.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl mx-auto relative group flex justify-center"
        >
          <button 
             onClick={movetodiscover}
             className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all duration-300"
          >
             Jump to Community
            
          </button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
    </div>
  );
}
