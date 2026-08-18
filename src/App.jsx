import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { AppContextProvider } from './context/AppContext';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Discover from './pages/Discover';
import Trending from './pages/Trending';
import Collections from './pages/Collections';
import Profile from './pages/Profile';
import PromptDetails from './pages/PromptDetails';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Ym9sZC1raXRlLTYuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContextProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col selection:bg-purple-500/30">
            <Navbar />
            <main className="flex-grow w-full mx-auto pb-16">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/prompt/:id" element={<PromptDetails />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AppContextProvider>
    </ClerkProvider>
  );
}

export default App;
