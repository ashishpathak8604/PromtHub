import { useEffect } from 'react';
import Lenis from 'lenis';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { AppContextProvider } from './context/AppContext';

import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/layout/ScrollToTop';
import Landing from './pages/Landing';
import Discover from './pages/Discover';
import Trending from './pages/Trending';
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';
import Profile from './pages/Profile';
import PromptDetails from './pages/PromptDetails';
import SubmitPrompt from './pages/SubmitPrompt';
import Footer from './components/layout/Footer';


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

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });


    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrame = requestAnimationFrame(raf);


    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };

  }, []);


  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <AppContextProvider>

        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>

      </AppContextProvider>
    </ClerkProvider>
  );
}


export default App;