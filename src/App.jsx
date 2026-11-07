import { lazy, Suspense, useEffect } from 'react';
import Lenis from 'lenis';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { MotionConfig } from 'framer-motion';
import { AppContextProvider } from './context/AppContext';

import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import PageLoader from './components/layout/PageLoader';
import Landing from './pages/Landing';
import Footer from './components/layout/Footer';
import { setLenisInstance } from './utils/lenis';

// Route-level code splitting: every secondary page is loaded on demand.
const Discover = lazy(() => import('./pages/Discover'));
const Trending = lazy(() => import('./pages/Trending'));
const Collections = lazy(() => import('./pages/Collections'));
const CollectionDetails = lazy(() => import('./pages/CollectionDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const PromptDetails = lazy(() => import('./pages/PromptDetails'));
const SubmitPrompt = lazy(() => import('./pages/SubmitPrompt'));


const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_Ym9sZC1raXRlLTYuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}


// ============================================================
// APP LAYOUT
// ============================================================

function AppLayout() {
  const location = useLocation();

  const hideFooter = 
  location.pathname.startsWith('/collections/') ||
  location.pathname.startsWith("/prompt")||
  location.pathname === '/submit' ||
  location.pathname.endsWith('/edit')||
  location.pathname === '/profile';

  const hideNavbar =
    location.pathname === '/submit' ||
    location.pathname.endsWith('/edit');

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-500/30">

      {!hideNavbar && <Navbar />}

      <ScrollToTop />

      <main className="grow w-full mx-auto pb-0">
        <Suspense fallback={<PageLoader />}>
          <Routes>

            <Route path="/" element={<Landing />} />

            <Route path="/discover" element={<Discover />} />

            <Route path="/trending" element={<Trending />} />

            <Route path="/collections" element={<Collections />} />

            <Route path="/collections/:id" element={<CollectionDetails />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/submit" element={<SubmitPrompt />} />

            <Route
              path="/prompt/:id/edit"
              element={<SubmitPrompt />}
            />

            <Route
              path="/prompt/:id"
              element={<PromptDetails />}
            />

          </Routes>
        </Suspense>
           {!hideFooter && <Footer />}
      </main>

    </div>
  );
}


// ============================================================
// APP
// ============================================================

function App() {

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Native scrolling is cheaper and more predictable when the user
    // explicitly asks for reduced motion.
    if (prefersReducedMotion) {
      return undefined;
    }

    // A single Lenis instance for the whole app. Route changes call
    // scrollTo on this instance through ScrollToTop.
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
    });

    setLenisInstance(lenis);

    let animationFrame;

    function raf(time) {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    }

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);


  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <AppContextProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </MotionConfig>
      </AppContextProvider>
    </ClerkProvider>
  );
}


export default App;
