import { useUser } from '@clerk/react';
import { Navigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileTabs from '../components/profile/ProfileTabs';
import ProfilePromptSection from '../components/profile/ProfilePromptSection';
import SuggestionsList from '../components/profile/SuggestionsList';
import EmptyState from '../components/profile/EmptyState';

import { Bookmark, Heart, MessageSquarePlus, FileText, Sparkles } from 'lucide-react';

import { useState } from 'react';
import { motion } from 'framer-motion';

import profileCat from '../assets/pic23.png';


// -------------------------------------------------------
// Profile
// -------------------------------------------------------

export default function Profile() {
  const { isLoaded, isSignedIn, user } = useUser();

  const {
    prompts,
    bookmarkedPrompts,
    likedPrompts,
    suggestions,
    acceptSuggestion,
  } = useAppContext();

  const [activeTab, setActiveTab] = useState('prompts');


  // -----------------------------------------------------
  // Auth
  // -----------------------------------------------------

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/" />;
  }

  if (!isLoaded || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#D4D1C9] border-t-[#252525]" />
      </div>
    );
  }


  // -----------------------------------------------------
  // User data
  // -----------------------------------------------------

  const userBookmarks = prompts.filter((p) =>
    bookmarkedPrompts.includes(p.id)
  );

  const userLikes = prompts.filter((p) =>
    likedPrompts.includes(p.id)
  );

  const myPrompts = prompts.filter(
    (p) =>
      p.author.name === user.fullName ||
      p.author.name === user.firstName ||
      p.author.handle === `@${user.username}`
  );


  // -----------------------------------------------------
  // Tabs
  // -----------------------------------------------------

  const tabs = [
    {
      id: 'prompts',
      label: 'My Prompts',
      icon: FileText,
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
    },
    {
      id: 'likes',
      label: 'Likes',
      icon: Heart,
    },
    {
      id: 'suggestions',
      label: 'Suggestions',
      icon: MessageSquarePlus,
    },
  ];


  return (
    <main className="min-h-screen bg-[#F7F6F2] pt-24 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            TOP PROFILE HERO
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-black/[0.06]
            bg-white
            shadow-[0_20px_60px_rgba(35,32,25,0.06)]
          "
        >

          {/* Soft background decoration */}

          <div
            className="
              pointer-events-none
              absolute
              -top-32
              -right-32
              w-80
              h-80
              rounded-full
              bg-[#F5EFE4]
              blur-3xl
              opacity-60
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-20
              w-72
              h-72
              rounded-full
              bg-[#F8F5EF]
              blur-3xl
            "
          />


          {/* ===================================================
              HERO CONTENT
          =================================================== */}


          <div
            className="
              relative
              z-10
              grid
              lg:grid-cols-[1fr_360px]
              items-center
              min-h-[360px]
            "
          >

            <ProfileHeader
              user={user}
              counts={{
                published: myPrompts.length,
                bookmarks: bookmarkedPrompts.length,
                likes: likedPrompts.length,
                suggestions: suggestions.length,
              }}
            />


            {/* -----------------------------------------------
                RIGHT — CAT
            ------------------------------------------------ */}

            <div
              className="
                relative
                hidden
                lg:flex
                h-full
                min-h-[360px]
                items-end
                justify-center
                overflow-visible
                pr-8
              "
            >

              {/* Decorative circle */}

              <div
                className="
                  absolute
                  right-8
                  top-12
                  w-64
                  h-64
                  rounded-full
                  bg-[#F7F1E8]
                "
              />

              <div
                className="
                  absolute
                  right-20
                  bottom-12
                  w-40
                  h-20
                  rounded-[50%]
                  bg-black/[0.05]
                  blur-xl
                "
              />


              {/* Cat */}

              <motion.img
                src={profileCat}
                alt=""
                aria-hidden="true"
                initial={{
                  opacity: 0,
                  y: 20,
                  rotate: 2,
                }}
                animate={{
                  opacity: 1,
                  y: [5, 0, 5],
                  rotate: [1, 0, 1],
                }}
                transition={{
                  opacity: {
                    duration: 0.6,
                  },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  rotate: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className="
                  relative
                  z-10
                  w-[260px]
                  xl:w-[290px]
                  h-auto
                  object-contain
                  drop-shadow-[0_18px_20px_rgba(30,30,30,0.14)]
                "
              />

            </div>

          </div>

        </motion.section>


        {/* =====================================================
            TABS
        ====================================================== */}

        <section className="mt-10">
          <ProfileTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

          <div className="pt-8">

            {activeTab === 'prompts' && (
              <ProfilePromptSection
                prompts={myPrompts}
                emptyProps={{
                  icon: FileText,
                  title: 'No published prompts yet',
                  body: "Once you publish prompts, they'll appear here so you can track their likes, bookmarks, and suggestions.",
                  action: (
                    <Link to="/submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#252525] text-white text-sm font-medium hover:bg-[#111] transition-all">
                      <span className="sr-only">Publish</span>
                      Publish your first prompt
                    </Link>
                  ),
                }}
              />
            )}

            {activeTab === 'bookmarks' && (
              <ProfilePromptSection
                prompts={userBookmarks}
                emptyProps={{ icon: Bookmark, title: 'No bookmarks yet', body: 'When you find a prompt you want to save for later, click the bookmark icon and it will show up here.' }}
              />
            )}

            {activeTab === 'likes' && (
              <ProfilePromptSection
                prompts={userLikes}
                emptyProps={{ icon: Heart, title: 'No liked prompts', body: 'Show some love! Prompts you upvote by clicking the heart icon will be collected here.' }}
              />
            )}

            {activeTab === 'suggestions' && (
              suggestions.length > 0 ? (
                <SuggestionsList suggestions={suggestions} prompts={prompts} acceptSuggestion={acceptSuggestion} />
              ) : (
                <EmptyState icon={MessageSquarePlus} title="No incoming suggestions" body="When the community suggests improvements to your prompts, you can review and accept them here." />
              )
            )}

          </div>

        </section>


   

      

      </div>

    </main>
  );
}