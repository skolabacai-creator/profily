import { useRef, useState, useEffect, RefObject } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, ArrowLeft, Heart, Sparkles, MessageSquare, Compass, ShieldAlert, Instagram, Sun, Moon } from 'lucide-react';

// Import components
import Hero from './components/Hero';
import About from './components/About';
import Transform from './components/Transform';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import FloatingTouch from './components/FloatingTouch';
import AdminPanel from './components/AdminPanel';
import { db } from './data/db';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    const fetchSocials = async () => {
      const data = await db.getSocials();
      setSocials(data);
    };

    fetchSocials();

    const handleUpdate = async () => {
      const data = await db.getSocials();
      setSocials(data);
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('portfolio_db_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const whatsappLink = socials.find(s => s.type === 'whatsapp')?.link || 'https://wa.me/963935122304';
  const instagramLink = socials.find(s => s.type === 'instagram')?.link || 'https://instagram.com/ibrahim_al_abadi';
  const behanceLink = socials.find(s => s.type === 'behance')?.link || 'https://behance.net/dbd59f78';

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showLostModal, setShowLostModal] = useState<boolean>(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // References for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    setMobileMenuOpen(false);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuItems = [
    { name: 'من أنا', ref: aboutRef },
    { name: 'ماذا ستتعلم', ref: transformRef },
    { name: 'مشاريعي', ref: projectsRef },
    { name: 'لحظات فخر', ref: achievementsRef },
    { name: 'تواصل معي', ref: contactRef },
  ];

  if (currentPath === '/admin') {
    return <AdminPanel onBackToSite={() => handleNavigate('/')} />;
  }

  return (
    <div className="min-h-screen bg-warmblack text-mainhtml font-sans antialiased selection:bg-brand selection:text-warmblack relative">
      
      {/* Dynamic Background Noise/Texture */}
      <div className="fixed inset-0 sparkle-grid opacity-15 pointer-events-none z-0" />
      
      {/* Base ambient backdrop light */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Modern Fixed Header */}
      <header className="sticky top-0 z-50 bg-warmblack/85 backdrop-blur-md border-b border-border-dim select-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand / Personal Title */}
          <div className="flex items-center gap-3">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-black text-xl sm:text-2xl tracking-tight text-mainhtml hover:text-brand cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <span>إبراهيم العبادي</span>
              <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.ref)}
                className="cursor-pointer text-sm font-semibold text-subtext hover:text-brand transition-all duration-300 relative group py-1"
              >
                <span>{item.name}</span>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Header Action Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2 rounded-xl bg-cardbg hover:bg-cardhover border border-border-dim text-brand transition-all flex items-center justify-center h-9 w-9"
              title={theme === 'light' ? 'الوضع الداكن' : 'الوضع النهاري'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="cursor-pointer bg-brand/10 border border-brand/25 text-brand hover:bg-brand hover:text-warmblack font-bold text-xs px-4 py-2 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(170,255,0,0.05)]"
            >
              ابدأ تشخيص فكرتك
            </button>
          </div>

          {/* Mobile Theme Toggle & Hamburguer button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2 rounded-xl bg-cardbg hover:bg-cardhover border border-border-dim text-brand transition-all flex items-center justify-center h-9 w-9"
              title={theme === 'light' ? 'الوضع الداكن' : 'الوضع النهاري'}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer text-subtext hover:text-brand p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-cardbg border-b border-border-dim overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.ref)}
                    className="cursor-pointer w-full text-right block px-4 py-3 rounded-xl hover:bg-border-dim text-base font-semibold text-subtext hover:text-brand transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="pt-2 px-4">
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="cursor-pointer w-full bg-brand text-warmblack font-bold text-center py-3.5 rounded-xl block shadow-[0_4px_15px_rgba(170,255,0,0.15)]"
                  >
                    تشخيص الفكرة مجاناً
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Core View Area */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <Hero onStartClick={() => scrollToSection(contactRef)} />

        {/* ABOUT ME SECTION */}
        <div ref={aboutRef}>
          <About />
        </div>

        {/* TRANSFORMATIONS SECTION */}
        <div ref={transformRef}>
          <Transform />
        </div>

        {/* PROJECTS SHOWCASE SECTION */}
        <div ref={projectsRef}>
          <Projects />
        </div>

        {/* ACHIEVEMENTS / PRIDE MOMENTS SECTION */}
        <div ref={achievementsRef}>
          <Achievements />
        </div>

        {/* INTERACTIVE CONTACT AND DIAGNOSTIC SECTION */}
        <div ref={contactRef}>
          <Contact />
        </div>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-cardbg border-t border-border-dim/80 py-16 px-4 md:px-8 select-none relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          
          {/* Logo & Slogan */}
          <div className="space-y-3 text-center md:text-right">
            <h4 className="font-extrabold text-2xl text-mainhtml">إبراهيم العبادي</h4>
            <p className="text-xs text-subtext/75 italic">بُني بأدوات وبصيرة اليوم — لتأهيل قادة ومطوري الغد</p>
          </div>

          {/* Social Links shortcuts */}
          <div className="flex gap-4 items-center">
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-cardbg hover:bg-brand/10 border border-border-dim p-3 rounded-xl text-subtext hover:text-brand transition-all"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            
            <a 
              href={instagramLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-cardbg hover:bg-brand/10 border border-border-dim p-3 rounded-xl text-subtext hover:text-brand transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a 
              href={behanceLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-cardbg hover:bg-brand/10 border border-border-dim p-3 rounded-xl text-subtext hover:text-brand transition-all"
              aria-label="Behance"
            >
              <Compass className="w-5 h-5" />
            </a>
          </div>

          {/* Custom 404 / Lost Visitor Easter Egg */}
          <div className="text-center md:text-left">
            <button
              onClick={() => setShowLostModal(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cardbg hover:bg-cardhover text-xs text-subtext hover:text-brand border border-border-dim transition-all duration-300 font-mono"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-brand" />
              <span>هل شردت أو ضعت بالموقع؟ ضغط هنا</span>
            </button>
          </div>

        </div>

        {/* Small Legal text */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border-dim/30 flex flex-col sm:flex-row justify-between items-center text-xs text-subtext/40 gap-4">
          <p>© {new Date().getFullYear()} إبراهيم العبادي. جميع الحقوق والجهود محفوظة.</p>
          <p className="font-mono text-[10px] tracking-widest">// Coded with Passion in Syria & Dedicated to every dreamer</p>
        </div>
      </footer>

      {/* Floating corner phrases & Back-To-Top trigger */}
      <FloatingTouch />

      {/* Dynamic Lost Visitor Humor Easter Egg Modal */}
      <AnimatePresence>
        {showLostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmblack/90 backdrop-blur-md"
            onClick={() => setShowLostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-cardbg border border-brand/35 rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button X */}
              <button
                onClick={() => setShowLostModal(false)}
                className="cursor-pointer absolute top-4 left-4 p-2 text-subtext hover:text-brand transition-colors rounded-lg bg-cardhover border border-border-dim"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative mx-auto w-16 h-16 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center text-brand">
                <ShieldAlert className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-mainhtml">تبحث عن التوجيه؟</h3>
                <p className="text-subtext text-sm md:text-base leading-relaxed leading-7">
                  "الشعور بالتشتت في البداية طبيعي ومتوقع، والخطوة الصحيحة دائماً هي العودة إلى التأسيس المتين والتركيز على بناء فكرة واحدة بخطوات ثابتة وموجهة."
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setShowLostModal(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer w-full bg-brand text-warmblack font-extrabold py-3.5 rounded-xl block shadow-[0_4px_20px_rgba(170,255,0,0.2)] hover:shadow-[0_4px_30px_rgba(170,255,0,0.4)] transition-all duration-300 text-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ارجع للرئيسية فوراً ونفض رأسك</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
