import { motion } from 'motion/react';
import { achievementsData } from '../data/portfolioData';
import { Award, Trophy, Users, DollarSign } from 'lucide-react';

export default function Achievements() {
  const getBadgeIcon = (id: string) => {
    switch (id) {
      case 'ach1':
        return <Trophy className="w-6 h-6 text-brand" />;
      case 'ach2':
        return <DollarSign className="w-6 h-6 text-brand" />;
      case 'ach3':
        return <Award className="w-6 h-6 text-brand" />;
      case 'ach4':
        return <Users className="w-6 h-6 text-brand" />;
      default:
        return <Award className="w-6 h-6 text-brand" />;
    }
  };

  return (
    <section id="achievements" className="py-24 px-4 md:px-8 bg-cardhover/10 border-t border-border-dim relative overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-brand/2 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-brand font-mono text-xs tracking-widest block font-medium">// محطات التميز (Milestones)</span>
          <h2 className="text-3xl md:text-5xl font-black text-mainhtml tracking-tight leading-tight">
            لحظات فخر.. وتعب مستحق
          </h2>
          <p className="text-subtext font-light text-base md:text-lg">
            أرقام وإشادات تلخص سهر الليالي الطويلة، والشغف الذي تحوّل إلى حلول برمجية حقيقية يلمس المستخدم فائدتها كل يوم.
          </p>
        </div>

        {/* Bento Grid or Staggered Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {achievementsData.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ scale: 1.015 }}
              className="bg-cardbg border border-border-dim rounded-2xl p-6 md:p-8 flex gap-5 items-start relative overflow-hidden group hover:border-brand/40 transition-all duration-300"
            >
              {/* Background index label */}
              <span className="absolute bottom-2 left-6 text-8xl font-black font-mono text-white/[0.02] select-none uppercase pointer-events-none group-hover:text-brand/[0.04] transition-colors">
                M{idx + 1}
              </span>

              {/* Icon widget */}
              <div className="p-4 bg-border-dim rounded-2xl group-hover:bg-brand/10 transition-colors shrink-0">
                {getBadgeIcon(ach.id)}
              </div>

              {/* Text metadata */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                  <h3 className="text-xl md:text-2xl font-bold text-mainhtml leading-snug group-hover:text-brand transition-colors">
                    {ach.title}
                  </h3>
                  
                  {ach.metric && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand/10 text-brand self-start sm:self-auto border border-brand/10">
                      {ach.metric}
                    </span>
                  )}
                </div>

                <p className="text-subtext text-sm md:text-base leading-relaxed font-light">
                  {ach.description}
                </p>
                
                <div className="flex items-center gap-1 text-[11px] font-mono text-brand/60 pt-2">
                  <span>✓ إنجاز فعلي موثق</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
