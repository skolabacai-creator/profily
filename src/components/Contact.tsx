import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Instagram, Compass, Twitter, CornerDownLeft } from 'lucide-react';
import FunQuiz from './FunQuiz';
import { db } from '../data/db';

export default function Contact() {
  const [socialsData, setSocialsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSocials = async () => {
      const data = await db.getSocials();
      setSocialsData(data);
    };

    fetchSocials();

    const handleUpdate = async () => {
      const data = await db.getSocials();
      setSocialsData(data);
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('portfolio_db_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getSocialStyle = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return {
          icon: <MessageSquare className="w-5 h-5" />,
          color: 'hover:text-green-400 hover:border-green-400/30'
        };
      case 'instagram':
        return {
          icon: <Instagram className="w-5 h-5" />,
          color: 'hover:text-pink-400 hover:border-pink-400/30'
        };
      case 'behance':
        return {
          icon: <Compass className="w-5 h-5" />,
          color: 'hover:text-blue-400 hover:border-blue-400/30'
        };
      case 'twitter':
        return {
          icon: <Twitter className="w-5 h-5" />,
          color: 'hover:text-sky-400 hover:border-sky-400/30'
        };
      default:
        return {
          icon: <Compass className="w-5 h-5" />,
          color: 'hover:text-brand hover:border-brand/30'
        };
    }
  };

  const socials = socialsData.map(soc => {
    const style = getSocialStyle(soc.type);
    return {
      ...soc,
      icon: style.icon,
      color: style.color
    };
  });

  const whatsappSocial = socialsData.find(s => s.type === 'whatsapp');
  const whatsappLink = whatsappSocial ? whatsappSocial.link : 'https://wa.me/963935122304';

  return (
    <section id="contact" className="py-24 px-4 md:px-8 border-t border-border-dim relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text and Actions panel */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                className="text-brand font-mono text-sm tracking-widest block"
              >
                // الإغلاق وقنوات التواصل (Final Call to Action)
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-black text-mainhtml leading-tight space-y-2"
              >
                <div>هل نبدأ الآن؟</div>
                <div className="text-xl md:text-2xl text-subtext font-light">حتى لو لم تتضح ملامح فكرتك بعد..</div>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-subtext text-base md:text-lg font-light leading-relaxed max-w-lg"
              >
                راسلني لنقضي 10 دقائق في نقاش هادئ، بصدر رحب وبدون أي قيود أو تكلف، لنضع معاً أول حجر أساس لطريقك المناسب.
              </motion.p>
            </div>

            {/* Giant WhatsApp CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group inline-block w-full max-w-md"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full relative z-10 bg-brand text-warmblack font-black text-xl py-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_8px_35px_rgba(170,255,0,0.3)] hover:shadow-[0_12px_45px_rgba(170,255,0,0.45)] border border-brand hover:-translate-y-1 block text-center"
              >
                <span style={{ fontSize: '16px', lineHeight: '26px', fontWeight: 'bold' }}>💬 ابدأ محادثة الـ 10 دقائق عبر واتسآب</span>
                <span className="text-2xl group-hover:-translate-x-1.5 transition-transform duration-300">←</span>
              </a>
            </motion.div>

            {/* Social channels listing */}
            <div className="space-y-4 pt-4 border-t border-border-dim/50 max-w-md">
              <span className="text-xs font-mono text-subtext/65 block flex items-center gap-1.5">
                <CornerDownLeft className="w-3.5 h-3.5" />
                تتبع أعمالي ويومياتي في الميدان البرمجي:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-xl bg-cardbg border border-border-dim ${soc.color} transition-all duration-300 flex items-center gap-3 group`}
                  >
                    <div className="p-2.5 rounded-lg bg-cardhover group-hover:bg-brand/10 transition-colors">
                      {soc.icon}
                    </div>
                    <div>
                      <p className="text-xs text-subtext font-mono tracking-tight">{soc.name}</p>
                      <p className="text-sm font-semibold text-mainhtml mt-0.5 tracking-tight group-hover:text-brand transition-colors">
                        {soc.username}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Diagnostic Quiz container */}
          <div className="lg:col-span-6 w-full">
            <FunQuiz />
          </div>

        </div>
      </div>
    </section>
  );
}
