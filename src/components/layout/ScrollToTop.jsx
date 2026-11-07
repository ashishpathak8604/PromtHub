import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenisInstance } from '../../utils/lenis';

/**
 * ScrollToTop Component
 * Automatically scrolls the window to the top whenever the route changes.
 * This is placed inside the Router so it has access to useLocation.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenisInstance();

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
