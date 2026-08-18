import PromptCard from './PromptCard';

export default function PromptGrid({ prompts }) {
  if (!prompts || prompts.length === 0) {
    return (
      <div className="w-full py-16 text-center text-zinc-500">
        No prompts found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
