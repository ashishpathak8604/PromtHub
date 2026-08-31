import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import PromptCard from '../components/prompt/PromptCard';
import { collections } from '../services/collectionData';


export default function CollectionDetails() {
  const { id } = useParams();
  const { prompts } = useAppContext();


  const collection = collections.find(
    (item) => item.id === id
  );


  if (!collection) {
    return (
      <div
        className="
          min-h-screen
          bg-[#F7F6F2]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">

          <h1 className="text-xl font-semibold text-[#252525] mb-2">
            Collection not found
          </h1>

          <p className="text-sm text-[#8A8881] mb-5">
            The collection you are looking for doesn't exist.
          </p>

          <Link
            to="/collections"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#55534E]
              hover:text-[#252525]
              transition-colors
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>

        </div>
      </div>
    );
  }


  const collectionPrompts = prompts.filter((prompt) =>
    collection.promptIds.includes(prompt.id)
  );


  return (
    <div
      className="
        min-h-screen
        bg-[#F7F6F2]
        pt-28
        pb-16
        px-4
        sm:px-6
        lg:px-8
      "
    >

      <div className="max-w-7xl mx-auto">

        <Link
          to="/collections"
          className="
            inline-flex
            items-center
            gap-2
            mb-8

            text-sm
            text-[#77756F]

            hover:text-[#252525]

            transition-colors
          "
        >
          <ArrowLeft className="w-4 h-4" />

          Back to Collections
        </Link>


        <div className="mb-10">

          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#F5F4F0] border border-black/5 flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#77756F]" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A8881]">
              Collection
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.035em] text-[#252525] mb-3">
            {collection.name}
          </h1>

          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#77756F]">
            {collection.description}
          </p>

          <div className="flex items-center gap-3 mt-5">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#ECEAE4] text-xs font-medium text-[#55534E]">
              {collectionPrompts.length} Prompts
            </span>
            <span className="text-xs text-[#AAA79F]">
              Curated by {collection.curator}
            </span>
          </div>
        </div>


        {collectionPrompts.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collectionPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

        ) : (

          <div className="bg-white border border-black/5 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#F5F4F0] flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#77756F]" />
            </div>
            <h2 className="text-base font-semibold text-[#252525] mb-2">
              No prompts in this collection yet
            </h2>
            <p className="text-sm text-[#8A8881]">
              Prompts added to this collection will appear here.
            </p>
          </div>

        )}
      </div>

    </div>
  );
}