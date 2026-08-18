import { Link, useLocation } from 'react-router-dom';
import { Search, Github, Sparkles } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Discover', path: '/discover' },
    { name: 'Trending', path: '/trending' },
    { name: 'Collections', path: '/collections' },
  ];

  return (
    <header className="glass sticky top-0 z-50 w-full border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-100">
              PromptHub
            </span>
          </Link>
          
          {/* Main Links */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`transition-colors ${location.pathname === link.path ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-100'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-6">
          {/* Search bar */}
          <div className="relative hidden sm:block max-w-md w-full ml-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-xl leading-5 bg-zinc-900/50 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-900 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 sm:text-sm"
              placeholder="Search prompts (e.g., 'React hooks', 'Midjourney landscape')"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-zinc-600 text-xs border border-zinc-800 rounded px-1.5 py-0.5">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-zinc-100 transition-colors mr-2">
              <Github className="w-5 h-5" />
            </button>
            
            {/* Clerk Authentication UI */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 border border-white/5 transition-all">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <Link to="/profile" className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors mr-2">
                Profile
              </Link>
              <Link to="/submit" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-all mr-2">
                Submit Prompt
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-9 h-9 border-2 border-purple-500/30"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
