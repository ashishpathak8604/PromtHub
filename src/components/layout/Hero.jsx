import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pic6 from '../../assets/pic6-transparent.png';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative overflow-hidden min-h-[680px] lg:min-h-[720px] flex items-center"
      style={{ background: '#F7F6F2' }}
    >
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-8 lg:gap-2">

          {/* LEFT — Content */}
          <div className="relative z-20 text-center lg:text-left pt-16 lg:pt-0">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.07] text-sm text-[#55534E] mb-7 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89A6A]" />
              <span>Discover the best AI prompts</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.055em] text-[#252525] leading-[0.98]"
            >
              Elevate Your AI
              <br />

              <span className="text-[#77756F]">
                with Premium Prompts
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: 'easeOut' }}
              className="mt-7 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-[#77756F] leading-relaxed"
            >
              Explore, share, and collaborate on high-quality prompts
              for ChatGPT, Midjourney, Claude, and more.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: 'easeOut' }}
              className="mt-9 flex justify-center lg:justify-start"
            >
              <button
                onClick={() => navigate('/discover')}
                className="
                  group
                  inline-flex items-center justify-center gap-2
                  px-7 py-3.5
                  rounded-xl
                  bg-[#252525]
                  text-white
                  text-sm font-medium
                  shadow-[0_8px_25px_rgba(30,30,30,0.14)]
                  hover:bg-[#111111]
                  hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                Explore Prompts

                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </motion.div>

            {/* Small credibility line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#9A9891]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89A6A]" />
              Curated prompts for modern AI workflows
            </motion.div>
          </div>


          {/* RIGHT — Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
           className="
  relative
  flex
  items-end
  justify-center
  lg:justify-end
  h-[480px]
  sm:h-[560px]
  lg:h-[680px]
  -mt-4
  lg:mt-0
  overflow-visible
"
          >

            {/* Very subtle glow behind illustration */}
            <div
              className="
                absolute
                w-[360px]
                h-[360px]
                lg:w-[500px]
                lg:h-[500px]
                rounded-full
                bg-[#E9E2D4]
                blur-3xl
                opacity-45
              "
            />

            {/* Character */}
            <motion.img
  src={pic6}
  alt="AI creator illustration"
  className="
    relative
    z-10
    h-full
    w-auto
    max-w-none
    object-contain
    object-bottom
    drop-shadow-[0_25px_35px_rgba(30,30,30,0.12)]
  "
  animate={{
    y: [32, 22, 32],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>

          </motion.div>
        </div>
      </div>

      {/* Very subtle bottom transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #F7F6F2, transparent)',
        }}
      />
    </section>
  );
}