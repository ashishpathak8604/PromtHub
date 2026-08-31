import { Link } from 'react-router-dom';
import {
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#F7F6F2]">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#252525]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#252525] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>

              <span className="text-lg font-semibold tracking-[-0.03em]">
                PromptHub
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#77756F]">
              Discover, create, and share high-quality AI prompts.
              Build better workflows and get more out of the AI tools
              you use every day.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  w-9 h-9 rounded-lg
                  bg-white border border-black/[0.06]
                  flex items-center justify-center
                  text-[#77756F]
                  hover:text-[#252525]
                  hover:border-black/[0.12]
                  transition-all duration-200
                "
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="
                  w-9 h-9 rounded-lg
                  bg-white border border-black/[0.06]
                  flex items-center justify-center
                  text-[#77756F]
                  hover:text-[#252525]
                  hover:border-black/[0.12]
                  transition-all duration-200
                "
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  w-9 h-9 rounded-lg
                  bg-white border border-black/[0.06]
                  flex items-center justify-center
                  text-[#77756F]
                  hover:text-[#252525]
                  hover:border-black/[0.12]
                  transition-all duration-200
                "
              >
                <Linkedin className="w-4 h-4" />
              </a>

            </div>
          </div>


          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-[#252525] mb-5">
              Explore
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/discover"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Discover Prompts
              </Link>

              <Link
                to="/categories"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Categories
              </Link>

              <Link
                to="/trending"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Trending
              </Link>

              <Link
                to="/create"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Submit a Prompt
              </Link>

            </div>
          </div>


          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#252525] mb-5">
              Community
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/about"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                About PromptHub
              </Link>

              <Link
                to="/community"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Community
              </Link>

              <Link
                to="/guidelines"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Community Guidelines
              </Link>

              <Link
                to="/contact"
                className="text-sm text-[#77756F] hover:text-[#252525] transition-colors"
              >
                Contact
              </Link>

            </div>
          </div>

        </div>


        {/* Newsletter / CTA strip */}
        <div className="mt-14 rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-7">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h3 className="text-[15px] font-semibold text-[#252525]">
                Discover better ways to use AI.
              </h3>

              <p className="text-sm text-[#8A8881] mt-1">
                Explore new prompts and ideas from the community.
              </p>
            </div>

            <Link
              to="/discover"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-[#252525]
                text-white
                text-sm
                font-medium
                hover:bg-[#111]
                transition-colors
                whitespace-nowrap
              "
            >
              Explore Prompts
              <ArrowUpRight className="w-4 h-4" />
            </Link>

          </div>

        </div>


        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-xs text-[#9A9891]">
            © {new Date().getFullYear()} PromptHub. All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              to="/privacy"
              className="text-xs text-[#9A9891] hover:text-[#55534E] transition-colors"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-[#9A9891] hover:text-[#55534E] transition-colors"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}