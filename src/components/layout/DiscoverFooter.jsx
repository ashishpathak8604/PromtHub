import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

import layingOrangeCat from '../../assets/pic11.png';

export default function DiscoverFooter() {
  return (
    <section
      className="
        relative
        overflow-visible
        bg-[#F7F6F2]
        pt-10
        pb-4
        sm:pt-12
        sm:pb-5
        lg:pt-14
        lg:pb-6
      "
    >
      {/* =========================================================
          MAIN CARD
      ========================================================== */}

<div
  className="
    relative
    mx-auto
    w-[calc(100%-4rem)]
    max-w-3xl
    sm:w-[calc(100%-7rem)]
    lg:w-[calc(100%-12rem)]
  "
>

        {/* =======================================================
            CAT
            Positioned relative to the card so it sits directly
            on the top border.
        ======================================================== */}

        <motion.div
          className="
            absolute
            z-20
            pointer-events-none
            right-[9%]
            -top-[70px]
            w-[190px]
            sm:right-[10%]
            sm:-top-[82px]
            sm:w-[225px]
            lg:right-[9%]
            lg:-top-[45px]
            lg:w-[270px]
          "
          animate={{
            y: [0, -3, 0],
            rotate: [0, 0.4, 0, -0.3, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src={layingOrangeCat}
            alt=""
            aria-hidden="true"
            className="
              block
              w-full
              h-auto
              object-contain
              select-none
              drop-shadow-[0_12px_18px_rgba(50,40,25,0.14)]
            "
          />
        </motion.div>


        {/* =======================================================
            WHITE CARD
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-10
            min-h-[200px]
            sm:min-h-[205px]
            lg:min-h-[200px]

            flex
            items-center
            justify-center

            overflow-visible

            rounded-[32px]
            sm:rounded-[36px]

            bg-white

            border
            border-black/[0.055]

            shadow-[0_20px_55px_rgba(35,32,25,0.07)]
          "
        >

          {/* =====================================================
              SUBTLE INNER LIGHT
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[32px]
              sm:rounded-[36px]
              bg-[radial-gradient(circle_at_50%_35%,rgba(232,222,204,0.20),transparent_52%)]
            "
          />


          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div
            className="
              relative
              z-10

              flex
              flex-col
              items-center
              text-center

              w-full

              px-6
              py-12

              sm:px-10
              sm:py-14

              lg:px-16
              lg:py-16
            "
          >

            {/* =================================================
                BADGE
            ================================================== */}

            <motion.div
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
              }}
              transition={{
                duration: 0.45,
                delay: 0.1,
              }}
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-black/[0.06]

                bg-[#F9F8F4]

                px-3.5
                py-1.5

                text-xs
                font-medium
                text-[#77756F]

                shadow-[0_3px_12px_rgba(30,30,30,0.035)]
              "
            >
              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-[#B89A6A]
                "
              />

              Keep exploring
            </motion.div>


            {/* =================================================
                HEADING
            ================================================== */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-6

                text-3xl
                sm:text-4xl
                lg:text-[42px]

                font-bold

                tracking-[-0.045em]

                leading-[1.05]

                text-[#252525]
              "
            >
              There's more to discover.
            </motion.h2>


            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.22,
              }}
              className="
                mt-5

                max-w-xl

                text-sm
                sm:text-base

                leading-relaxed

                text-[#77756F]
              "
            >
              Explore more prompts, ideas, and workflows from the
              PromptHub community.
            </motion.p>

          </div>
        </motion.div>
      </div>



    </section>
  );
}