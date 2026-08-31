import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';

import sittingCat from '../../assets/pic7.png';
import questionMark from '../../assets/pic10.png';
import layingCat from '../../assets/pic9.png';

const sparkles = [
  {
    left: '8%',
    top: '28%',
    size: 'w-2 h-2',
    type: 'dot',
    delay: 0,
    duration: 3.5,
  },
  {
    left: '18%',
    top: '15%',
    size: 'w-1.5 h-1.5',
    type: 'dot',
    delay: 0.8,
    duration: 4,
  },
  {
    left: '27%',
    top: '75%',
    size: 'w-1.5 h-1.5',
    type: 'dot',
    delay: 1.4,
    duration: 4.5,
  },
  {
    left: '73%',
    top: '20%',
    size: 'w-2 h-2',
    type: 'star',
    delay: 0.4,
    duration: 3.8,
  },
  {
    left: '82%',
    top: '29%',
    size: 'w-2 h-2',
    type: 'dot',
    delay: 1.2,
    duration: 4.2,
  },
  {
    left: '91%',
    top: '48%',
    size: 'w-1.5 h-1.5',
    type: 'dot',
    delay: 0.6,
    duration: 3.6,
  },
  {
    left: '78%',
    top: '73%',
    size: 'w-1.5 h-1.5',
    type: 'star',
    delay: 1.8,
    duration: 4.4,
  },
  {
    left: '12%',
    top: '62%',
    size: 'w-1.5 h-1.5',
    type: 'dot',
    delay: 2,
    duration: 4,
  },
];

export default function DiscoverHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#F7F6F2' }}
    >
      {/* =====================================================
          HERO CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          min-h-[540px]
          sm:min-h-[570px]
          lg:min-h-[600px]
          flex
          items-center
        "
      >

        {/* =====================================================
            SOFT AMBIENT LIGHT
        ====================================================== */}

        <div
          className="
            absolute
            -left-40
            top-[180px]
            w-[360px]
            h-[360px]
            rounded-full
            bg-[#E8DECC]
            blur-[100px]
            opacity-25
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[190px]
            w-[360px]
            h-[360px]
            rounded-full
            bg-[#E8DECC]
            blur-[100px]
            opacity-20
            pointer-events-none
          "
        />

        {/* =====================================================
            TWINKLING DECORATIVE ELEMENTS
        ====================================================== */}

        {sparkles.map((item, index) => (
          <motion.div
            key={index}
            className="absolute pointer-events-none"
            style={{
              left: item.left,
              top: item.top,
            }}
            animate={{
              opacity: [0.25, 0.9, 0.3, 0.75, 0.25],
              scale: [0.75, 1.15, 0.85, 1, 0.75],
              y: [0, -4, 2, -2, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {item.type === 'star' ? (
              <span
                className={`${item.size} block text-[#B89A6A]/60 text-xl leading-none`}
              >
                ✦
              </span>
            ) : (
              <span
                className={`
                  ${item.size}
                  block
                  rounded-full
                  bg-[#C9B58D]/55
                `}
              />
            )}
          </motion.div>
        ))}

        {/* =====================================================
            MAIN CONTENT CONTAINER
        ====================================================== */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[1400px]
            mx-auto
            px-5
            sm:px-8
            lg:px-12
          "
        >

          {/* =================================================
              LEFT CAT
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              left-[2%]
              sm:left-[4%]
              lg:left-[6%]
              xl:left-[8%]
              top-[155px]
              sm:top-[150px]
              lg:top-[145px]
              w-[165px]
              sm:w-[190px]
              lg:w-[220px]
              xl:w-[235px]
              hidden
              sm:block
            "
          >

            {/* Ground shadow */}

          <motion.div
  className="
    absolute
    bottom-[2px]
    left-[7%]
    w-[86%]
    h-[28px]
    rounded-[50%]
    bg-black/[0.40]
    blur-[12px]
    z-0
  "
  animate={{
    scaleX: [1, 0.94, 1],
    opacity: [0.9, 0.65, 0.9],
  }}
  transition={{
    duration: 4.5,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>

            {/* Sitting cat */}

          <motion.img
  src={sittingCat}
  alt=""
  aria-hidden="true"
  className="
    relative
    z-10
    w-full
    h-auto
    object-contain
    select-none
    drop-shadow-[0_14px_18px_rgba(30,30,30,0.10)]
  "
  style={{
    filter:
      'grayscale(1) brightness(0.72) contrast(1.08)',
  }}
  animate={{
    y: [0, -3, 0],
    rotate: [0, -0.4, 0, 0.3, 0],
  }}
  transition={{
    duration: 5.5,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
            {/* =================================================
                QUESTION MARK
                Now anchored much closer to cat's head
            ================================================== */}

           <motion.div
  className="
    absolute
    z-20
    left-[45%]
    -translate-x-1/2

    -top-[30px]
    sm:-top-[34px]
    lg:-top-[20px]

    w-[65px]
    sm:w-[70px]
    lg:w-[76px]
  "
  animate={{
    y: [0, -6, 0, -2, 0],
    rotate: [-3, 3, -2, 2, 0],
    scale: [1, 1.05, 1, 1.02, 1],
  }}
  transition={{
    duration: 3.8,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
  <img
    src={questionMark}
    alt=""
    aria-hidden="true"
    className="
      w-full
      h-auto
      object-contain
      select-none
      drop-shadow-[0_7px_12px_rgba(30,30,30,0.12)]
    "
    style={{
      filter:
        'grayscale(1) brightness(0.62) contrast(1.15)',
    }}
  />
</motion.div>

          </motion.div>


          {/* =================================================
              CENTER CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-30
              max-w-3xl
              mx-auto
              text-center
              pt-24
              pb-14
              sm:pt-26
              sm:pb-16
              lg:pt-28
              lg:pb-18
            "
          >

            {/* Community label */}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: 'easeOut',
              }}
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-1.5
                mb-5
                rounded-full
                border
                border-black/[0.06]
                bg-white/80
                backdrop-blur-sm
                text-xs
                font-medium
                text-[#77756F]
                shadow-[0_4px_18px_rgba(30,30,30,0.04)]
              "
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89A6A]" />
              Explore the community
            </motion.div>


            {/* Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                text-4xl
                sm:text-5xl
                lg:text-[64px]
                font-bold
                tracking-[-0.05em]
                leading-[1]
                text-[#252525]
              "
            >
              Community Prompts
            </motion.h1>


            {/* Description */}

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.06,
                ease: 'easeOut',
              }}
              className="
                mt-5
                mx-auto
                max-w-xl
                text-sm
                sm:text-base
                text-[#77756F]
                leading-relaxed
              "
            >
              Browse high-quality prompts curated by the community.
              Find exactly what you need to optimise your AI results.
            </motion.p>


            {/* =================================================
                SEARCH
            ================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-7
                w-full
                max-w-2xl
                mx-auto
              "
            >
              <div
                className="
                  group
                  flex
                  items-center
                  gap-3.5
                  w-full
                  px-5
                  py-4
                  sm:px-6
                  sm:py-4.5
                  bg-white
                  border
                  border-black/[0.07]
                  rounded-[18px]
                  shadow-[0_10px_32px_rgba(30,30,30,0.06)]
                  transition-all
                  duration-300
                  focus-within:border-black/[0.15]
                  focus-within:shadow-[0_14px_40px_rgba(30,30,30,0.09)]
                "
              >

                <Search
                  className="
                    w-5
                    h-5
                    text-[#AAA79F]
                    shrink-0
                  "
                />

                <input
                  type="text"
                  placeholder="Search prompts by keyword, tag, or author..."
                  className="
                    w-full
                    bg-transparent
                    border-none
                    outline-none
                    ring-0
                    focus:ring-0
                    text-[#252525]
                    placeholder-[#AAA79F]
                    text-sm
                    sm:text-base
                  "
                />

              </div>
            </motion.div>

          </div>


          {/* =================================================
              RIGHT CAT
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              right-[2%]
              sm:right-[4%]
              lg:right-[6%]
              xl:right-[8%]
              top-[215px]
              sm:top-[220px]
              lg:top-[225px]
              w-[175px]
              sm:w-[205px]
              lg:w-[235px]
              xl:w-[250px]
              hidden
              sm:block
            "
          >

            {/* Ground shadow */}

            <motion.div
              className="
                absolute
                bottom-[5px]
                left-[8%]
                w-[84%]
                h-[18px]
                rounded-[50%]
                bg-black/[0.90]
                blur-xl
              "
              animate={{
                scaleX: [1, 0.88, 1],
                opacity: [0.65, 0.38, 0.65],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Laying cat */}

            <motion.img
              src={layingCat}
              alt=""
              aria-hidden="true"
              className="
                relative
                z-10
                w-full
                h-auto
                object-contain
                select-none
                drop-shadow-[0_14px_18px_rgba(30,30,30,0.08)]
              "
              style={{
                filter:
                  'grayscale(1) brightness(0.72) contrast(1.08)',
              }}
              animate={{
                y: [0, -2, 0, -1, 0],
                rotate: [0, 0.6, 0, -0.35, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

          </motion.div>

        </div>

      </div>
    </section>
  );
}