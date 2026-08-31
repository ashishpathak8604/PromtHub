import { TrendingUp } from 'lucide-react';
import PromptGrid from '../components/prompt/PromptGrid';
import { mockPrompts } from '../services/mockData';
import TrendingHero from '../components/layout/TrendingHero';
import TrendingFooter from '../components/layout/TrendingFooter';

export default function Trending() {
  const trendingPrompts = [...mockPrompts].sort((a, b) => b.likes - a.likes);

  return (
    <div className="flex flex-col gap-8 pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style={{ minHeight: '100vh' }}>
      {/* Page Header */}
       <TrendingHero />
     

      {/* Divider */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
        <span className="text-sm font-medium text-[#44423E]">Top Performing</span>
        <span className="text-xs bg-[#ECEAE4] text-[#55534E] px-3 py-1 rounded-full font-medium">
          Updated Today
        </span>
      </div>

      <PromptGrid prompts={trendingPrompts} />
      <div >
            <TrendingFooter />
      </div>

    </div>
  );
}
