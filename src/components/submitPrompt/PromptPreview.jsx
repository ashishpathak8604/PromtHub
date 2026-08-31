
import React from 'react';
import { Link } from 'react-router-dom';
import cat from '../../assets/pic20.png';
export default function PromptPreview({ category, model, title, description, content, tags }) {

  return (
    <div className="max-w-4xl mx-auto ">
      <div
        className="
          bg-white
          rounded-3xl
          border border-black/[0.07]
          p-8
          sm:p-12
          shadow-[0_4px_24px_rgba(30,30,30,0.04)]
        "
      >
        <div className="flex items-center gap-2 mb-6">
          <span
            className="
              px-2.5
              py-1
              rounded-lg
              bg-[#ECEAE4]
              text-xs
              font-medium
              text-[#55534E]
            "
          >
            {category || 'Uncategorized'}
          </span>

          {model && <span className="text-xs text-[#AAA79F]">{model}</span>}
        </div>

        <h1
          className="
            text-3xl
            sm:text-4xl
            font-bold
            tracking-[-0.03em]
            text-[#252525]
          "
        >
          {title || 'Untitled prompt'}
        </h1>

        <p
          className="
            mt-4
            text-sm
            leading-relaxed
            text-[#77756F]
          "
        >
          {description || 'No description added yet.'}
        </p>

        <div className="mt-10">
          <div className="flex items-center justify-between mb-3">
            <h3
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-[#77756F]
              "
            >
              Prompt
            </h3>
          </div>

          <div
            className="
              bg-[#F7F6F2]
              border border-black/[0.06]
              rounded-2xl
              p-6
              font-mono
              text-sm
              leading-[1.8]
              whitespace-pre-wrap
              text-[#3D3B37]
            "
          >
            {content || 'No prompt content added yet.'}
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-[#8A8881]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-12 flex justify-center">
  <img
    src={cat}
    alt="Cat illustration"
    className="w-40 sm:w-40 md:w-70 h-auto object-contain"
  />
</div>
    </div>
    
  );
}
