import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Zap, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import Hero from '../components/layout/Hero';
import PromptGrid from '../components/prompt/PromptGrid';
import Footer from '../components/layout/Footer';

import { useAppContext } from '../context/AppContext';
import dogImage from '../assets/pic5.png';


// Change this path if your cactus has a different filename/location
import cactus from '../assets/cactus.png';

export default function Landing() {
  const { prompts } = useAppContext();

  const trendingPreview = [...prompts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div
      className="flex flex-col"
      style={{ background: '#F7F6F2' }}
    >
      <Hero />

      <div
        className="flex flex-col gap-20 py-16"
        style={{ background: '#F7F6F2' }}
      >

        {/* Community Feed Preview */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-[#252525] tracking-[-0.02em]">
                Trending in the Community
              </h2>

              <p className="text-sm text-[#8A8881] mt-0.5">
                The most-liked prompts right now
              </p>
            </div>

            <Link
              to="/trending"
              className="flex items-center gap-1.5 text-sm font-medium text-[#55534E] hover:text-[#252525] transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <PromptGrid prompts={trendingPreview} />
        </section>


        {/* How It Works */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6">

          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B89A6A] mb-3">
              Simple by design
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-[#252525] tracking-[-0.03em] mb-3">
              From idea to better results
            </h2>

            <p className="max-w-xl mx-auto text-sm text-[#8A8881] leading-relaxed">
              Find the right prompt, make it your own, and get better results
              from the AI tools you already use.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                number: '01',
                title: 'Discover',
                body: 'Browse prompts created and shared by the community. Filter by category, AI model, and use case.',
              },
              {
                number: '02',
                title: 'Customize',
                body: 'Copy a prompt and adapt it to your own workflow, project, or creative idea.',
              },
              {
                number: '03',
                title: 'Create & Share',
                body: 'Publish your own prompts and help other creators discover better ways to work with AI.',
              },
            ].map(({ number, title, body }) => (
              <div
                key={number}
                className="
                  relative
                  bg-white
                  border border-black/[0.06]
                  rounded-2xl
                  p-7
                  overflow-hidden
                  hover:border-black/[0.12]
                  hover:-translate-y-1
                  hover:shadow-[0_8px_30px_rgba(30,30,30,0.06)]
                  transition-all duration-300
                "
              >
                <span className="text-xs font-semibold text-[#B89A6A]">
                  {number}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-[#252525]">
                  {title}
                </h3>

                <p className="mt-3 text-sm text-[#8A8881] leading-relaxed">
                  {body}
                </p>
              </div>
            ))}

          </div>
        </section>


        {/* Features Section */}
       <section className="max-w-6xl mx-auto w-full px-4">

  {/* =========================
      SECTION HEADER
  ========================== */}
  <div className="text-center mb-10">
    <h2 className="text-2xl font-semibold text-[#252525] tracking-[-0.02em] mb-2">
      Why Join PromptHub?
    </h2>

    <p className="text-sm text-[#8A8881]">
      Everything you need to get more from AI tools.
    </p>
  </div>


  {/* =========================
      FEATURE CARDS
  ========================== */}
  <div className="grid md:grid-cols-3 gap-5">

    {[
      {
        icon: <Search className="w-5 h-5 text-[#77756F]" />,
        title: 'Curated Discovery',
        body: 'Find exactly what you are looking for with filtering by category, tags, and AI model.',
      },
      {
        icon: <Sparkles className="w-5 h-5 text-[#77756F]" />,
        title: 'High-Quality Prompts',
        body: 'Access battle-tested prompts that yield great results for copywriting, coding, and art generation.',
      },
      {
        icon: <Users className="w-5 h-5 text-[#77756F]" />,
        title: 'Vibrant Community',
        body: 'Share your creations, bookmark your favourites, and engage with top prompt engineers.',
      },
    ].map(({ icon, title, body }) => {

      const isCommunityCard = title === 'Vibrant Community';

      return (
        <div
          key={title}
          className={`
            relative
            overflow-visible

            bg-white
            border border-black/[0.06]
            rounded-2xl

            p-7

            hover:border-black/[0.12]
            hover:shadow-[0_4px_20px_rgba(30,30,30,0.05)]

            transition-all
            duration-200
          `}
        >

          {/* =================================================
              DOG — ONLY ON THE RIGHTMOST CARD
          ================================================== */}
          {isCommunityCard && (
            <motion.div
              className="
                absolute
                z-30
                pointer-events-none

                right-[4%]
                -top-[72px]

                w-[175px]

                sm:right-[5%]
                sm:-top-[78px]
                sm:w-[195px]

                lg:right-[3%]
                lg:-top-[82px]
                lg:w-[210px]
              "
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Soft contact shadow */}
              <div
                className="
                  absolute
                  bottom-[4px]
                  left-[12%]
                  w-[70%]
                  h-[10px]

                  rounded-[50%]

                  bg-black/[0.16]

                  blur-md

                  scale-x-[0.9]
                "
              />

              <img
                src={dogImage}
                alt=""
                aria-hidden="true"
                className="
                  relative
                  z-10

                  block
                  w-full
                  h-auto

                  object-contain
                  select-none

                  drop-shadow-[0_10px_12px_rgba(35,30,20,0.18)]
                "
              />

            </motion.div>
          )}


          {/* =================================================
              ICON
          ================================================== */}
          <div
            className="
              w-10
              h-10

              rounded-xl

              bg-[#F5F4F0]

              flex
              items-center
              justify-center

              mb-5
            "
          >
            {icon}
          </div>


          {/* =================================================
              TITLE
          ================================================== */}
          <h3
            className="
              text-[15px]
              font-semibold
              text-[#252525]
              mb-2
            "
          >
            {title}
          </h3>


          {/* =================================================
              DESCRIPTION
          ================================================== */}
          <p
            className="
              text-sm
              text-[#8A8881]
              leading-relaxed
            "
          >
            {body}
          </p>

        </div>
      );
    })}

  </div>

</section>


        {/* AI Workflow Section */}
        <section className="max-w-6xl mx-auto w-full px-4 sm:px-6">

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-[#252525]
              px-7 py-12
              sm:px-12
              sm:py-14
            "
          >

            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#B89A6A]/10 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/[0.04] blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C9B58D] mb-4">
                  One place for your ideas
                </p>

                <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white max-w-xl">
                  Built for every kind of AI workflow.
                </h2>

                <p className="mt-4 max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
                  Whether you're coding, writing, researching, designing,
                  brainstorming, or creating images, PromptHub helps you
                  find and organize prompts that actually work.
                </p>

              </div>

              <div className="flex flex-wrap lg:max-w-sm justify-center lg:justify-end gap-2">

                {[
                  'Coding',
                  'Writing',
                  'Design',
                  'Research',
                  'Marketing',
                  'Productivity',
                  'Image Generation',
                  'Business',
                ].map((item) => (
                  <span
                    key={item}
                    className="
                      px-3.5
                      py-2
                      rounded-full
                      border border-white/10
                      bg-white/[0.06]
                      text-xs
                      text-white/70
                      backdrop-blur-sm
                    "
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="w-full max-w-3xl mx-auto text-center px-4 pb-4">

          <div className="bg-white border border-black/[0.06] rounded-3xl p-12">

            <Zap className="w-9 h-9 text-[#B89A6A] mx-auto mb-5" />

            <h2 className="text-2xl font-semibold text-[#252525] tracking-[-0.02em] mb-5">
              Ready to supercharge your AI workflows?
            </h2>

            <Link
              to="/discover"
              className="
                inline-flex
                items-center
                justify-center
                px-7
                py-3
                rounded-xl
                bg-[#252525]
                text-white
                text-sm
                font-medium
                hover:bg-[#111]
                hover:-translate-y-[1px]
                transition-all
                duration-200
                shadow-sm
              "
            >
              Explore the Community Now
            </Link>

          </div>

        </section>

      </div>


      {/* Footer + Floating Cactus */}
      <div className="relative">

        {/* Cactus decoration */}
       <motion.div
  className="
    absolute
    left-8
    sm:left-2
    lg:-left-16
    -top-60
    sm:-top-70
    lg:-top-98
    z-20
    pointer-events-none
  "
>
  <img
    src={cactus}
    alt=""
    aria-hidden="true"
    className="
      w-72
      sm:w-80
      lg:w-[30rem]
      h-auto
      object-contain
      select-none
    "
  />
</motion.div>

  

      </div>

    </div>
  );
}