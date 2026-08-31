import { cn } from '../../utils/cn';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
            activeCategory === category
              ? 'bg-[#252525] border-[#252525] text-white shadow-sm'
              : 'bg-white border-black/[0.07] text-[#77756F] hover:text-[#252525] hover:bg-[#F5F4F0] hover:border-black/[0.12]'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
