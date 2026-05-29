import { motion } from 'motion/react';
import { Home, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Transform() {
  const points = [
    {
      title: "التجربة العملية",
      emoji: "🎯",
      description: "التطبيق الفوري على مشروع يمثل فكرتك من اليوم الأول، بعيداً عن التمارين الافتراضية."
    },
    {
      title: "الذكاء الاصطناعي كساعد أيمن",
      emoji: "🤖",
      description: "توظيف أقوى الأدوات التوليدية كرفيق برمجي يختصر عليك أشهر من الجهد والبحث عن الأخطاء."
    },
    {
      title: "الحلول المستدامة",
      emoji: "🎨",
      description: "فهم كيف تبني واجهة مستخدم مريحة، تفاعلية بتباين ألوان مدروس وجاهزة للمستخدم الفعلي."
    }
  ];

  return (
    <section id="training" className="py-20 px-4 md:px-8 bg-cardhover/15 relative overflow-hidden">
      {/* Dynamic light background elements */}
      <div className="absolute inset-0 sparkle-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Badge Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dim border border-brand/20 text-brand text-xs font-mono mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>المنهج والخبرة العملية (Philosophy & Pillars)</span>
        </motion.div>

        {/* Big Personal Statement Quote */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-black text-mainhtml leading-snug tracking-tight max-w-2xl mx-auto space-y-4"
          >
            <div className="text-brand">كل هذا بُني من نفس الصفر الذي أنت فيه الآن</div>
            <p className="text-subtext font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto pt-4 border-t border-border-dim/20">
              بنيتُ 6 مشاريع حقيقية من غرفتي بالبيت، وأحدها حصل على تمويل من منظمة "بنفسج". اليوم، لست هنا لألقي عليك دروساً أكاديمية، بل لأشاركك كل ما تعلّمته لتبدأ رحلتك العملية فوراً.
            </p>
          </motion.h2>
        </div>

        {/* Bullet points methodology - Single column, extreme details simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cardbg border border-border-dim rounded-2xl p-5 text-right flex flex-col justify-between hover:border-brand/20 hover:shadow-[0_4px_20px_rgba(170,255,0,0.03)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{pt.emoji}</span>
                  <h3 className="text-sm font-bold text-mainhtml">{pt.title}</h3>
                </div>
                <p className="text-xs text-subtext leading-relaxed font-light">
                  {pt.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
