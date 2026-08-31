import React from 'react';
import { CheckCircle2 } from 'lucide-react';

function SuggestionsList({ suggestions = [], prompts = [], acceptSuggestion }) {
  return (
    <div className="grid gap-4 max-w-3xl mx-auto w-full">
      {suggestions.map((suggestion) => {
        const targetPrompt = prompts.find((p) => p.id === suggestion.promptId);

        return (
          <div
            key={suggestion.id}
            className="
                          bg-white
                          border
                          border-black/[0.06]
                          rounded-2xl
                          p-6
                          flex
                          flex-col
                          gap-4
                        "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={suggestion.authorAvatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-xl border border-black/[0.08]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#252525]">{suggestion.authorName}</p>
                  <p className="text-xs text-[#8A8881] mt-0.5">
                    Suggested an edit for{' '}
                    <span className="text-[#44423E] font-medium">"{targetPrompt?.title}"</span>
                  </p>
                </div>
              </div>

              <span
                className={`
                              text-xs
                              font-semibold
                              px-2.5
                              py-1
                              rounded-lg
                              border

                              ${
                                suggestion.status === 'pending'
                                  ? 'bg-[#FEF9EC] text-[#B08030] border-[#F5E4A8]'
                                  : 'bg-[#F0F5F1] text-[#5B7A6B] border-[#C5DDD1]'
                              }
                            `}
              >
                {suggestion.status.toUpperCase()}
              </span>
            </div>

            <div className="
                            bg-[#F7F6F2]
                            border
                            border-black/[0.05]
                            rounded-xl
                            p-4
                            font-mono
                            text-sm
                            text-[#3D3B37]
                            leading-relaxed
                            whitespace-pre-wrap
                          ">
              {suggestion.text}
            </div>

            {suggestion.status === 'pending' && (
              <div className="flex justify-end">
                <button
                  onClick={() => acceptSuggestion(suggestion.id)}
                  className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                bg-[#252525]
                                hover:bg-[#111]
                                text-white
                                text-sm
                                font-semibold
                                rounded-xl
                                transition-all
                                shadow-sm
                              "
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept &amp; Update Prompt
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SuggestionsList;
