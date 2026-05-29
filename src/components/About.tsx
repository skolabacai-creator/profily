import { motion } from 'motion/react';
import { statsData } from '../data/portfolioData';
import { ShieldCheck, Flame, Medal, Award } from 'lucide-react';

export default function About() {
  // Map icons dynamically to support numbers visually
  const getIcon = (id: string) => {
    switch (id) {
      case 'stat1':
        return <ShieldCheck className="w-5 h-5 text-brand" />;
      case 'stat2':
        return <Flame className="w-5 h-5 text-brand" />;
      case 'stat3':
        return <Award className="w-5 h-5 text-brand" />;
      case 'stat4':
        return <Medal className="w-5 h-5 text-brand" />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-24 px-4 md:px-8 border-t border-border-dim relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand/3 blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand font-mono text-sm tracking-widest block mb-2">// من الفكرة إلى التطبيق العملي</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-mainhtml tracking-tight leading-tight">
                مشاركة الخبرة وبناء المشاريع
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-subtext text-base md:text-lg font-light leading-relaxed space-y-4"
            >
              <p>
                طالب هندسة برمجيات أعمل على تطوير المواقع والحلول البرمجية. أركز على تقديم القيمة والمنفعة المباشرة من خلال ربط المفاهيم النظرية بالتطبيق العملي لبناء مشاريع تخدم المستخدمين.
              </p>
              <p className="text-mainhtml font-medium border-r-2 border-brand pr-4">
                مسار يختصر الجهد والانتقال الفوري إلى حيز التنفيذ.
              </p>
              <p>
                ساهمت في تطوير 6 مشاريع برمجية حية، من ضمنها مشروع "سكولا" التعليمي الحائز على تمويل بقيمة 8,000 دولار كأحد الحلول التقنية المبتكرة الموجهة لخدمة الطلاب وتجربتهم.
              </p>
              <p>
                الهدف هو مرافقتك لتخطي العقبات التقنية الأولى وبناء موقعك الأول وفق أفضل الأساليب وبمرونة كاملة تتناسب مع وقتك وهدفك بوضوح تام وبأقصر الطرق.
              </p>
            </motion.div>
          </div>

          {/* Stats Display Block */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statsData.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: '#AAFF00' }}
                className="bg-cardbg border border-border-dim p-6 rounded-2xl flex flex-col justify-between transition-colors duration-300 min-h-[170px]"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-brand font-mono text-xs text-subtext/60">0{idx + 1}</span>
                  <div className="p-2 rounded-lg bg-border-dim">
                    {getIcon(stat.id)}
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl md:text-5xl font-black text-brand tracking-tighter mb-2 font-mono">
                    {stat.value}
                  </h3>
                  <p className="text-sm md:text-base text-mainhtml font-normal leading-snug">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
