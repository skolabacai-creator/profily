import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function FloatingTouch() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 select-none"
        >
          {/* Glowing motto banner */}
          <div className="bg-cardbg/95 border border-brand/20 backdrop-blur-md py-2 px-4 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand animate-spin [animation-duration:8s]" />
            <span className="text-[11px] font-semibold text-mainhtml tracking-tight">
              كل موقع بدأ بفكرة مجنونة
            </span>
          </div>

          {/* Minimal Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="cursor-pointer bg-brand hover:opacity-90 text-warmblack p-2.5 rounded-xl shadow-[0_4px_15px_rgba(170,255,0,0.2)] transition-all duration-300 border border-brand"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
