import { motion } from 'motion/react';
import { Sparkles, Terminal, ArrowDown } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 md:px-8 py-16 overflow-hidden sparkle-grid select-none">
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-[#AAFF00]/5 blur-[80px] md:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[150px] md:w-[250px] h-[150px] md:h-[250px] rounded-full bg-[#AAFF00]/3 blur-[60px] md:blur-[100px] pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Simple Human Indicator Label */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/20 bg-cardbg/75 text-brand text-xs md:text-sm font-mono tracking-tight mb-8 shadow-[0_0_15px_rgba(170,255,0,0.05)]"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>مساحة عملية وموجهة لتأسيس فكرتك برمجياً</span>
        </motion.div>

        {/* The Mighty Hero Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="text-[26px] leading-[40.4px] sm:text-5xl md:text-7xl lg:text-8xl font-black text-mainhtml sm:leading-[1.15] md:leading-[1.12] tracking-tight text-center"
        >
          لا تحتاج لخبرة مسبقة{" "}
          <br className="hidden sm:inline" />
          <span className="text-brand filter drop-shadow-[0_0_10px_rgba(170,255,0,0.2)]">
            لتبني فكرة تعمل على أرض الواقع.
          </span>
        </motion.h1>

        {/* Encouraging Under-title text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-subtext font-light max-w-2xl px-2 leading-relaxed"
        >
          مساحة عملية تختصر وقتك. نعمل معاً خطوة بخطوة لنحول فكرتك إلى موقع أو تطبيق حقيقي يخدم الناس، بعيداً عن التلقين النظري الجاف.
        </motion.p>

        {/* Action Button CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 w-full max-w-sm px-4"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartClick}
            className="w-full relative group overflow-hidden bg-brand text-warmblack font-extrabold text-lg md:text-xl px-8 py-5 rounded-xl shadow-[0_4px_30px_rgba(170,255,0,0.25)] hover:shadow-[0_8px_40px_rgba(170,255,0,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-brand"
          >
            {/* Glossy hover slide effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            
            <span style={{ fontSize: '16px' }}>ابدأ بتشخيص فكرتك فوراً</span>
            <span className="text-xl group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
          </motion.button>
        </motion.div>

        {/* Small subtle tech hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-6 flex items-center gap-1.5 text-xs text-subtext/70 font-mono"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>تطبيق فوري • بدون تعقيد • من أول جلسة</span>
        </motion.div>
      </div>

      {/* Floating Animated scroll prompt */}
      <motion.div 
        initial={{ opacity: 0, y:-10 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, delay: 1 }}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 cursor-pointer text-xs font-mono text-brand/80"
        onClick={onStartClick}
      >
        <span>اسحب للأسفل</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
