
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Plus, ChevronDown, User, LogOut, Settings } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";
import { useState, useRef, useEffect } from "react";
import blackCat from "../../assets/pic12.png";

export default function Navbar() {
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navLinks = [
    { name: "Discover", path: "/discover" },
    { name: "Trending", path: "/trending" },
    { name: "Collections", path: "/collections" },
  ];

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setProfileOpen(false);
    await signOut();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        className="
          relative
    overflow-visible
          mx-auto
          max-w-5xl
          h-[68px]
          flex
          items-center
          justify-between
          gap-6
          px-4
          sm:px-5
          lg:px-6
          rounded-[22px]
          border
          border-black/[0.07]
          bg-white/90
          backdrop-blur-xl
          shadow-[0_8px_30px_rgba(30,30,30,0.08)]
        "
      >
        {/* -------------------------------------------------
            LEFT — LOGO + NAVIGATION
        -------------------------------------------------- */}
        <div className="flex items-center gap-7 min-w-0">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div
              className="
                flex
                items-center
                justify-center
                w-9
                h-9
                rounded-[12px]
                bg-[#252525]
                text-white
                transition-all
                duration-300
                group-hover:rotate-[-4deg]
                group-hover:scale-105
              "
            >
              <Sparkles className="w-[17px] h-[17px]" />
            </div>

            <span
              className="
                hidden
                sm:block
                text-[17px]
                font-semibold
                tracking-[-0.03em]
                text-[#252525]
              "
            >
              PromptHub
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    px-3.5
                    py-2
                    rounded-xl
                    text-[13px]
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-[#F0EFEA] text-[#252525]"
                        : "text-[#77756F] hover:bg-[#F5F4F0] hover:text-[#252525]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* -------------------------------------------------
            RIGHT — AUTH + ACTIONS
        -------------------------------------------------- */}
        {/* -------------------------------------------------
    RIGHT — AUTH + ACTIONS
-------------------------------------------------- */}
<div className="flex items-center gap-2 relative">

  {/* -------------------------------------------------
      DECORATIVE CAT
      Body stays inside navbar.
      Tail extends below navbar.
  -------------------------------------------------- */}
  <div
    className="
      pointer-events-none
      absolute
      z-30

      right-[612px]
      top-[6px]

      w-[120px]
     

      hidden
      sm:block
    "
  >
    <img
      src={blackCat}
      alt=""
      aria-hidden="true"
      className="
        block
        w-full
        h-auto
        rotate-[3deg]
        object-contain
        select-none

        drop-shadow-[0_7px_8px_rgba(20,20,20,0.18)]
      "
    />
  </div>


  {/* Signed Out */}
  <SignedOut>
    <div className="hidden sm:flex items-center gap-1">
      <SignInButton mode="modal">
        <button
          className="
            h-10
            px-3.5
            rounded-xl
            text-[13px]
            font-medium
            text-[#55534E]
            hover:bg-[#F3F2EE]
            hover:text-[#252525]
            transition-all
            duration-200
          "
        >
          Sign In
        </button>
      </SignInButton>

      <SignUpButton mode="modal">
        <button
          className="
            h-10
            px-4
            rounded-xl
            bg-[#252525]
            text-white
            text-[13px]
            font-medium
            shadow-[0_4px_12px_rgba(30,30,30,0.15)]
            hover:bg-[#111111]
            hover:-translate-y-[1px]
            transition-all
            duration-200
          "
        >
          Join PromptHub
        </button>
      </SignUpButton>
    </div>
  </SignedOut>


  {/* Signed In */}
  <SignedIn>

    {/* Submit Prompt */}
    <Link
      to="/submit"
      title="Create a prompt"
      aria-label="Create a prompt"
      className="
        group
        relative
        flex
        items-center
        justify-center

        w-10
        h-10

        rounded-xl
        bg-[#252525]
        text-white

        shadow-[0_4px_12px_rgba(30,30,30,0.14)]

        hover:bg-[#111111]
        hover:-translate-y-[1px]

        transition-all
        duration-200

        z-40
      "
    >
      <Plus
        className="
          w-[18px]
          h-[18px]

          transition-transform
          duration-300

          group-hover:rotate-90
        "
      />
    </Link>


    {/* Profile Button */}
    <div
      className="relative z-40"
      ref={profileRef}
    >
      <button
        onClick={() => setProfileOpen((prev) => !prev)}
        aria-label="Open profile menu"
        aria-expanded={profileOpen}
        className="
          flex
          items-center
          gap-1.5

          h-10
          pl-1
          pr-2

          rounded-xl

          hover:bg-[#F3F2EE]

          transition-all
          duration-200
        "
      >

        {/* Avatar */}
        <img
          src={user?.imageUrl}
          alt={user?.fullName || "Profile"}
          className="
            w-8
            h-8

            rounded-[10px]
            object-cover

            border
            border-black/[0.08]

            shadow-sm
          "
        />

        {/* Dropdown indicator */}
        <ChevronDown
          className={`
            w-3.5
            h-3.5

            text-[#8A8881]

            transition-transform
            duration-200

            ${profileOpen ? "rotate-180" : ""}
          `}
        />
      </button>


      {/* Profile Dropdown */}
      {profileOpen && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+10px)]

            w-60

            overflow-hidden

            rounded-2xl

            border
            border-black/[0.07]

            bg-white

            shadow-[0_15px_40px_rgba(30,30,30,0.12)]

            animate-in
            fade-in
            slide-in-from-top-2
            duration-200
          "
        >

          {/* User Info */}
          <div className="px-4 py-3.5 border-b border-black/[0.06]">
            <div className="flex items-center gap-3">

              <img
                src={user?.imageUrl}
                alt={user?.fullName || "Profile"}
                className="
                  w-10
                  h-10
                  rounded-xl
                  object-cover
                "
              />

              <div className="min-w-0">

                <p className="
                  text-sm
                  font-semibold
                  text-[#252525]
                  truncate
                ">
                  {user?.fullName || "User"}
                </p>

                <p className="
                  text-xs
                  text-[#8A8881]
                  truncate
                ">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>

              </div>
            </div>
          </div>


          {/* Menu Items */}
          <div className="p-1.5">

            <Link
              to="/profile"
              onClick={() => setProfileOpen(false)}
              className="
                flex
                items-center
                gap-3
                w-full

                px-3
                py-2.5

                rounded-xl

                text-sm
                text-[#55534E]

                hover:bg-[#F5F4F0]
                hover:text-[#252525]

                transition-colors
              "
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </Link>


          

            <div className="
              my-1.5
              border-t
              border-black/[0.06]
            " />


            <button
              onClick={handleSignOut}
              className="
                flex
                items-center
                gap-3
                w-full

                px-3
                py-2.5

                rounded-xl

                text-sm
                text-[#B14A4A]

                hover:bg-[#FFF3F2]

                transition-colors
              "
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

          </div>
        </div>
      )}

    </div>

  </SignedIn>

</div>
      </div>
    </header>
  );
}

