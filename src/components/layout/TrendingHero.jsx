import { motion } from 'framer-motion';
import orangeImage from '../../assets/pic13.png';
import dogImage from '../../assets/pic14.png';

export default function TrendingHero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F6F2]">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO CONTENT */}
        <div
          className="
            flex
            flex-col
            items-center
            text-center

            pt-10
            pb-10

            sm:pt-12
            sm:pb-12

            lg:pt-14
            lg:pb-12
            

          "
        >

          {/* TRENDING BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-black/[0.06]

              bg-white

              px-4
              py-1.5

              text-xs
              font-medium
              text-[#77756F]

              shadow-[0_3px_12px_rgba(30,30,30,0.035)]
            "
          >
            <span className="text-[#D99100]">
              ✦
            </span>

            Trending
          </div>


          {/* =====================================================
              TOP
          ====================================================== */}
<h1
  className="
    mt-10
    flex
    items-center
    justify-center

    font-bold
    tracking-[-0.055em]
    leading-[0.85]

    text-[#252525]

    text-[72px]
    sm:text-[92px]
    md:text-[115px]
    lg:text-[140px]
  "
>
  {/* T */}
  <span className="relative">
    T
  </span>


  {/* =================================================
      ORANGE = O
  ================================================== */}
  <span
    className="
      relative
      inline-flex
      items-center
      justify-center

      w-[0.98em]
      h-[0.82em]

      mx-[0.015em]
    "
  >
    <motion.img
      src={orangeImage}
      alt=""
      aria-hidden="true"

      className="
        absolute
        left-1/2
        top-[59%]

        w-[1.18em]
        h-[1.18em]

        -translate-x-1/2
        -translate-y-1/2

        object-contain
        select-none
      "

      animate={{
        rotate: 360,
      }}

      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </span>


  {/* P */}
  <span className="relative">
    P
  </span>
</h1>

          {/* =====================================================
              PROMPTS
          ====================================================== */}

          <h2
            className="
              mt-1

              font-bold
              tracking-[-0.055em]
              leading-[0.85]

              text-[#D99100]

              text-[72px]
              sm:text-[92px]
              md:text-[115px]
              lg:text-[140px]
            "
          >
            PROMPTS
          </h2>


          {/* =====================================================
              DESCRIPTION
          ====================================================== */}

          <p
            className="
              mt-7

              max-w-xl

              text-sm
              sm:text-base

              leading-relaxed

              text-[#77756F]
            "
          >
            Discover the prompts everyone is talking about.
            Find what is trending, popular, and worth trying.
          </p>

        </div>


         {/* =====================================================
            DOG
            The dog sits on the right side and looks toward
            the hero content.
        ====================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            x: 40,
            y: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute

            z-30

            pointer-events-none

            right-[-20px]
            bottom-[-5px]

            w-[230px]

            sm:right-[-25px]
            sm:bottom-[-8px]
            sm:w-[280px]

            md:right-[-20px]
            md:w-[320px]

            lg:right-[-40px]
            lg:bottom-[-50px]
            lg:w-[330px]
          "
        >

          <motion.img
            src={dogImage}
            alt=""
            aria-hidden="true"

            className="
              block

              w-full
              h-auto
              rotate-[-10deg]

              object-contain
              select-none

              drop-shadow-[0_18px_20px_rgba(30,25,20,0.18)]
            "

            animate={{
              y: [0, -5, 0],
              rotate: [0, -1, 0, 1, 0],
            }}

            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

        </motion.div>

   

      </div>

    </section>
  );
}