import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { collections } from '../services/collectionData';
import CollectionHero from '../components/layout/CollectionHero';
import CollectionFooter from '../components/layout/CollectionFooter';

export default function Collections() {
  const { prompts } = useAppContext();

  const collectionsWithCounts = collections.map((collection) => ({
    ...collection,
    promptCount: collection.promptIds.filter((promptId) =>
      prompts.some((prompt) => prompt.id === promptId)
    ).length,
  }));

  return (
    <div className="flex flex-col gap-8 pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" style={{ minHeight: '100vh' }}>
      {/* Page Header */}
         <CollectionHero />
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[#F5F4F0] border border-black/5 flex items-center justify-center">
            <Layers className="w-4 h-4 text-[#77756F]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8881]">Collections</span>
        </div>
        <p className="text-sm text-[#77756F] mt-1">
          Specialised groups of prompts hand-picked by experts for mastering AI workflows.
        </p>
      </div>
   

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
        {collectionsWithCounts.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.id}`}
            className="group block h-full"
          >
            <div className="group flex h-full flex-col bg-white border border-black/5 rounded-2xl p-6 hover:border-black/10 hover:shadow-[0_6px_24px_rgba(30,30,30,0.06)] transition-all duration-200 cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium bg-[#ECEAE4] text-[#55534E] px-2.5 py-1 rounded-lg">
                  {collection.promptCount} Prompts
                </span>
              </div>

              <h3 className="text-[15px] font-semibold text-[#252525] mb-2 group-hover:text-[#44423E] transition-colors">
                {collection.name}
              </h3>

              <p className="text-sm text-[#8A8881] leading-relaxed mb-6 grow">
                {collection.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-black/5 mt-auto">
                <span className="text-xs text-[#AAA79F]">Curated by</span>
                <span className="text-xs font-medium text-[#55534E]">{collection.curator}</span>
              </div>
            </div>
          </Link>
        ))}
      
      </div>
        <CollectionFooter />
    </div>
  );
}
