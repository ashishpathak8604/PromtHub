import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';
import ProfileStats from './ProfileStats';

function ProfileHeader({ user, counts = {} }) {
  const { published = 0, bookmarks = 0, likes = 0, suggestions = 0 } = counts;

  return (
    <div className="px-7 py-10 sm:px-10 lg:px-12 lg:py-12">

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        <div className="relative shrink-0">
          <img
            src={user.imageUrl}
            alt={user.fullName || 'Profile'}
            className="
              w-24
              h-24
              sm:w-28
              sm:h-28
              rounded-[26px]
              object-cover
              border
              border-black/[0.08]
              shadow-[0_8px_25px_rgba(30,30,30,0.08)]
            "
          />

          <div className="
                      absolute
                      -bottom-2
                      -right-2
                      w-8
                      h-8
                      rounded-xl
                      bg-white
                      border
                      border-black/[0.08]
                      flex
                      items-center
                      justify-center
                      shadow-sm
                    ">
            <Sparkles className="w-4 h-4 text-[#B89A6A]" />
          </div>
        </div>

        <div className="text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-[#252525]">{user.fullName}</h1>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F9F1DE] border border-[#EBDCB9] text-[11px] font-semibold text-[#9A793D]">
              <Sparkles className="w-3 h-3" />
              Creator
            </span>
          </div>

          <p className="mt-1 text-sm text-[#8A8881]">@{user.username || user.firstName?.toLowerCase() || 'user'}</p>

          <p className="mt-4 text-sm sm:text-[15px] text-[#55534E] max-w-lg">
            Prompt creator, developer, and curious builder sharing useful ideas, workflows, and AI experiments with the community.
          </p>

          <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
            <Link to="/submit" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#252525] text-white text-sm font-medium hover:bg-[#111] hover:-translate-y-[1px] transition-all shadow-sm">
              <Plus className="w-4 h-4" />
              New Prompt
            </Link>
          </div>

        </div>

      </div>

      <ProfileStats stats={[
        { value: published, label: 'Published' },
        { value: bookmarks, label: 'Bookmarks' },
        { value: likes, label: 'Likes' },
        { value: suggestions, label: 'Suggestions' },
      ]} />

    </div>
  );
}

export default ProfileHeader;
