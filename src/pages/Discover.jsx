import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CategoryFilter from '../components/prompt/CategoryFilter';
import PromptGrid from '../components/prompt/PromptGrid';
import DiscoverHero from '../components/layout/DiscoverHero';
import { categories } from '../services/mockData';
import { useAppContext } from '../context/AppContext';
import DiscoverFooter from '../components/layout/DiscoverFooter';
import Footer from '../components/layout/Footer';

export default function Discover() {
  const { prompts } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPrompts = activeCategory === 'All'
    ? prompts
    : prompts.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPrompts = filteredPrompts.slice(startIndex, startIndex + itemsPerPage);

return (
  <div
    className="flex flex-col gap-0 pb-0"
    style={{ background: '#F7F6F2' }}
  >
    <DiscoverHero />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Category filter */}
      <div className="flex flex-col items-center gap-6 mb-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="border-t border-black/[0.05] pt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-[#252525]">
            {activeCategory === 'All'
              ? 'All Prompts'
              : `${activeCategory} Prompts`}
          </h3>

          <span className="text-sm text-[#8A8881]">
            {filteredPrompts.length} results
          </span>
        </div>

        <PromptGrid prompts={paginatedPrompts} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-black/[0.05]">
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-black/[0.07] text-[#77756F] hover:text-[#252525] hover:border-black/[0.14] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm text-[#77756F]">
              Page{' '}
              <span className="font-semibold text-[#252525]">
                {currentPage}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-[#252525]">
                {totalPages}
              </span>
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-black/[0.07] text-[#77756F] hover:text-[#252525] hover:border-black/[0.14] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Discover footer */}
      <DiscoverFooter />
        
    </div>
  </div>
);
}
