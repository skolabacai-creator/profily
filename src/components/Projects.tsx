import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../data/db';
import { Project } from '../types';
import { projectsData } from '../data/portfolioData';
import { Terminal, Code, Palette, Cpu, Heart, AlertCircle, Sparkles } from 'lucide-react';

const renderProjectThumbnail = (id: string, projects: Project[]) => {
  switch (id) {
    case 'p1': // سكولا
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-brand/5 via-transparent to-transparent">
          <div className="flex justify-between items-center text-[10px] font-mono text-brand/80">
            <span>🎓 لوحة سكولا التعليمية</span>
            <span>78% مكتمل</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-1">
            <div className="bg-cardbg/85 border border-border-dim rounded p-1.5 flex flex-col gap-1">
              <span className="text-[9px] text-subtext/60">الذكاء الاصطناعي</span>
              <div className="w-full h-1 bg-border-dim rounded-full overflow-hidden">
                <div className="bg-brand h-full w-[85%]" />
              </div>
            </div>
            <div className="bg-cardbg/85 border border-border-dim rounded p-1.5 flex flex-col gap-1">
              <span className="text-[9px] text-subtext/60">الامتحانات الدراسية</span>
              <div className="w-full h-1 bg-border-dim rounded-full overflow-hidden">
                <div className="bg-[#00FFFF] h-full w-[60%]" />
              </div>
            </div>
          </div>
          <div className="text-[9px] text-subtext/40 font-mono text-left">skola_core_v2.api</div>
        </div>
      );
    case 'p2': // لبستي
      return (
        <div className="w-full h-full p-3 flex items-center justify-center gap-4 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent">
          <div className="h-20 w-14 bg-cardbg border border-border-dim rounded-lg p-1.5 flex flex-col justify-between">
            <div className="h-10 w-full bg-border-dim/50 rounded-md flex items-center justify-center text-sm text-subtext/40">👗</div>
            <div className="space-y-1">
              <div className="w-full h-1.5 bg-brand/30 rounded" />
              <div className="w-2/3 h-1.5 bg-border-dim rounded" />
            </div>
          </div>
          <div className="space-y-1.5 flex-1 max-w-[120px]">
            <span className="text-[10px] font-mono text-subtext/60 block">المعاينة الافتراضية</span>
            <div className="flex gap-1">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <span key={size} className={`text-[8px] font-mono px-1 py-0.5 rounded border ${size === 'M' ? 'border-brand text-brand bg-brand/5' : 'border-border-dim text-subtext/50'}`}>
                  {size}
                </span>
              ))}
            </div>
            <div className="w-full h-1 bg-border-dim rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full w-[90%]" />
            </div>
          </div>
        </div>
      );
    case 'p3': // ميزان
      return (
        <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-bl from-green-500/5 via-transparent to-transparent">
          <div className="flex justify-between items-center text-[10px] font-mono text-green-400">
            <span>⚖️ المصروفات الشهرية</span>
            <span className="bg-green-400/10 px-1 rounded text-[8px]">نشط</span>
          </div>
          <div className="flex items-end justify-around gap-2 h-12 pt-1">
            {[40, 75, 55, 90, 30, 65].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-2 rounded-t bg-border-dim h-10 relative overflow-hidden flex items-end">
                  <div className={`w-full rounded-t ${i === 3 ? 'bg-brand' : 'bg-subtext/40'}`} style={{ height: `${val}%` }} />
                </div>
                <span className="text-[8px] font-mono text-subtext/40">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'p4': // حجز مستوصف
      return (
        <div className="w-full h-full p-3 flex flex-col justify-between bg-gradient-to-br from-blue-500/5 via-transparent to-transparent">
          <div className="flex justify-between items-center text-[10px] font-mono text-blue-400">
            <span>🏥 مستوصف حلب</span>
            <span>بانتظار دورك</span>
          </div>
          <div className="flex gap-2 items-center justify-center my-1">
            <div className="bg-cardbg border border-border-dim rounded px-3 py-1 flex flex-col items-center">
              <span className="text-[8px] text-subtext/50">رقم الدور</span>
              <span className="text-sm font-bold text-brand font-mono">12</span>
            </div>
            <div className="bg-cardbg border border-border-dim rounded px-3 py-1 flex flex-col items-center">
              <span className="text-[8px] text-subtext/50">الوقت العقدي</span>
              <span className="text-sm font-bold text-mainhtml font-mono">10 د</span>
            </div>
          </div>
          <div className="w-full h-1 bg-border-dim rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full w-[45%]" />
          </div>
        </div>
      );
    case 'p5': // صلاتي
      return (
        <div className="w-full h-full p-3.5 flex flex-col justify-between bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent">
          <div className="flex justify-between items-center text-[10px] font-mono text-amber-500">
            <span>🤲 أذكاري وصلواتي</span>
            <span>أوفلاين 100%</span>
          </div>
          <div className="grid grid-cols-5 gap-1 my-1">
            {['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'].map((p, idx) => (
              <div key={p} className="bg-cardbg border border-border-dim rounded p-1 flex flex-col items-center gap-1">
                <span className="text-[8px] text-subtext/70">{p}</span>
                <div className={`w-2.5 h-2.5 rounded-full border ${idx < 3 ? 'bg-brand/20 border-brand' : 'border-border-dim'}`} />
              </div>
            ))}
          </div>
          <div className="text-[8px] text-subtext/40 text-center font-mono">بساطة وتركيز • بدون إعلانات</div>
        </div>
      );
    case 'p6': // سنمار كوفي
      return (
        <div className="w-full h-full p-3.5 flex items-center justify-between gap-4 bg-gradient-to-bl from-amber-800/5 via-transparent to-transparent">
          <div className="flex flex-col justify-between h-full">
            <span className="text-[10px] font-mono text-brand">☕ سنمار كافيه</span>
            <div className="space-y-1">
              <div className="text-[9px] text-subtext/80">كبوتشينو دبل</div>
              <div className="w-16 h-1 bg-border-dim rounded-full overflow-hidden">
                <div className="bg-[#AAFF00] h-full w-full" />
              </div>
            </div>
          </div>
          <div className="h-16 w-16 bg-cardbg border border-border-dim rounded-lg p-1.5 flex flex-col items-center justify-center relative">
            <div className="grid grid-cols-4 gap-0.5 w-10 h-10 opacity-60">
              {[...Array(16)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 ${i % 3 === 0 || i % 5 === 1 ? 'bg-mainhtml' : 'bg-transparent'}`} />
              ))}
            </div>
            <span className="text-[7px] font-mono text-subtext/40 mt-1">مسح QR</span>
          </div>
        </div>
      );
    // Design Cases
    case 'd1': // TaxiLookMate
      return (
        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-tr from-yellow-500/5 to-transparent">
          <div className="w-[180px] h-[80px] bg-cardbg border border-border-dim rounded-xl p-2.5 shadow-md flex items-center justify-between relative overflow-hidden">
            <div className="flex flex-col justify-between h-full text-right">
              <span className="text-[9px] text-subtext/50">مستشار رقمي للمظهر</span>
              <span className="text-[11px] font-bold text-mainhtml">TaxiLookMate</span>
              <div className="w-12 h-1 bg-brand rounded-full" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-border-dim flex items-center justify-center text-xl">
              🚕
            </div>
          </div>
        </div>
      );
    case 'd2': // Silaa
      return (
        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-bl from-brand/5 to-transparent">
          <div className="w-[180px] h-[80px] bg-cardbg border border-border-dim rounded-xl p-2.5 shadow-md flex items-center justify-between relative overflow-hidden">
            <div className="flex flex-col justify-between h-full text-right">
              <span className="text-[9px] text-subtext/50">دراجات نارية في سوريا</span>
              <span className="text-[11px] font-bold text-mainhtml">صلة (Silaa)</span>
              <div className="w-14 h-1 bg-brand/35 rounded-full" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-border-dim flex items-center justify-center text-xl">
              🏍️
            </div>
          </div>
        </div>
      );
    case 'd3': // WomanIx Coder
      return (
        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-pink-500/5 to-transparent">
          <div className="w-[180px] h-[80px] bg-cardbg border border-border-dim rounded-xl p-2.5 shadow-md flex items-center justify-between relative overflow-hidden">
            <div className="flex flex-col justify-between h-full text-right">
              <span className="text-[9px] text-subtext/50">بوابة المبرمجات</span>
              <span className="text-[11px] font-bold text-mainhtml">WomanIx Coder</span>
              <div className="w-10 h-1 bg-pink-400 rounded-full" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-border-dim flex items-center justify-center text-xl">
              💻
            </div>
          </div>
        </div>
      );
    case 'd4': // BasketballFasterEDU
      return (
        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-tr from-amber-600/5 to-transparent">
          <div className="w-[180px] h-[80px] bg-cardbg border border-border-dim rounded-xl p-2.5 shadow-md flex items-center justify-between relative overflow-hidden">
            <div className="flex flex-col justify-between h-full text-right">
              <span className="text-[9px] text-subtext/50">تدريب كرة السلة</span>
              <span className="text-[11px] font-bold text-mainhtml">FasterEDU</span>
              <div className="w-16 h-1 bg-amber-500/80 rounded-full" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-border-dim flex items-center justify-center text-xl">
              🏀
            </div>
          </div>
        </div>
      );
    case 'd5': // Abdullah Saoud
      return (
        <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-bl from-teal-500/5 to-transparent">
          <div className="w-[180px] h-[80px] bg-cardbg border border-border-dim rounded-xl p-2.5 shadow-md flex items-center justify-between relative overflow-hidden">
            <div className="flex flex-col justify-between h-full text-right">
              <span className="text-[9px] text-subtext/50">ملف تعريفي شخصي</span>
              <span className="text-[11px] font-bold text-mainhtml">عبد الله سعود</span>
              <div className="w-8 h-1 bg-teal-400 rounded-full" />
            </div>
            <div className="w-12 h-12 rounded-lg bg-border-dim flex items-center justify-center text-xl">
              🧑‍💼
            </div>
          </div>
        </div>
      );
    default: {
      const project = projects.find(p => p.id === id);
      const isCodeCategory = project ? project.category === 'code' : true;
      if (isCodeCategory) {
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-brand/5 via-transparent to-transparent">
            <div className="flex justify-between items-center text-[10px] font-mono text-brand/80">
              <span>🚀 {project?.title || 'برنامج تفاعلي'}</span>
              <span>نشط وجاهز</span>
            </div>
            <div className="text-[11px] text-subtext/60 line-clamp-2 leading-relaxed text-right font-medium" dir="rtl">
              {project?.solution || 'حل ومخرجات ذكية تفاعلية متكاملة.'}
            </div>
            <div className="text-[9px] text-brand/40 font-mono text-left">custom_code_stream.api</div>
          </div>
        );
      } else {
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent">
            <div className="flex justify-between items-center text-[10px] font-mono text-purple-400">
              <span>🎨 {project?.title || 'واجهة تفاعلية'}</span>
              <span>مكتمل</span>
            </div>
            <div className="text-[11px] text-subtext/60 line-clamp-2 leading-relaxed text-right font-light" dir="rtl">
              {project?.description || 'دراسة واجهة وتجربة مستخدم مخصصة لمتطلبات العملاء.'}
            </div>
            <div className="text-[9px] text-purple-400/40 font-mono text-left">concept_ui_case.fig</div>
          </div>
        );
      }
    }
  }
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [activeTab, setActiveTab] = useState<'all' | 'code' | 'design'>('code');
  const [projectTabs, setProjectTabs] = useState<Record<string, 'problem' | 'solution' | 'result'>>({});

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await db.getProjects();
      setProjects(data);
    };

    fetchProjects();

    const handleUpdate = async () => {
      const data = await db.getProjects();
      setProjects(data);
    };
    window.addEventListener('portfolio_db_update', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('portfolio_db_update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const getProjectTab = (id: string) => projectTabs[id] || 'solution';
  
  const setProjectTab = (id: string, tab: 'problem' | 'solution' | 'result') => {
    setProjectTabs(prev => ({ ...prev, [id]: tab }));
  };

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  return (
    <section id="projects" className="py-24 px-4 md:px-8 border-t border-border-dim relative">
      {/* Background glow lamp */}
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-brand/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center md:text-right max-w-3xl mx-auto md:mx-0 mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 rounded-full text-brand text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>كل هذا بُني من نفس الصفر الذي أنت فيه الآن</span>
          </div>

          <h2 className="text-[30px] leading-[43px] md:text-5xl font-extrabold text-mainhtml tracking-tight md:leading-none mt-1">
            مشاريع حقيقية.. <span className="text-brand filter drop-shadow-[0_0_10px_rgba(170,255,0,0.15)]">وليست مجرد تمارين</span> فصول
          </h2>
          <p className="text-subtext text-base md:text-lg font-light leading-relaxed">
            كل فكرة وُلدت من احتياج حقيقي في مجتمعنا، بنيتها بشغف لتدر قيمة وتحل مشاكل يومية ملموسة.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center md:justify-start gap-3 mb-10 border-b border-border-dim/50 pb-6">
          <button
            onClick={() => setActiveTab('code')}
            className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'code'
                ? 'bg-brand text-warmblack border-brand font-bold shadow-[0_4px_15px_rgba(170,255,0,0.15)]'
                : 'bg-cardbg text-subtext border-border-dim hover:border-brand/40'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>مشاريع برمجية مفعّلة</span>
          </button>
          
          <button
            onClick={() => setActiveTab('design')}
            className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 border ${
              activeTab === 'design'
                ? 'bg-brand text-warmblack border-brand font-bold shadow-[0_4px_15px_rgba(170,255,0,0.15)]'
                : 'bg-cardbg text-subtext border-border-dim hover:border-brand/40'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>مخططات ومشاريع تصميم</span>
          </button>
        </div>

        {/* Projects Grid Container */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-cardbg border border-border-dim rounded-2xl overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Fake Window OS Header */}
                <div className="px-5 py-3.5 bg-border-dim/50 border-b border-border-dim/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs font-mono text-subtext/40 select-none">project_ref_{idx + 1}.tsx</span>
                </div>

                {/* Visual Thumbnail */}
                <div className="h-44 border-b border-border-dim bg-warmblack/25 flex items-center justify-center relative overflow-hidden select-none">
                  {project.imageUrl ? (
                    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-black/60">
                      {/* Blurred backdrop background to fill any space beautifully */}
                      <img 
                        src={project.imageUrl} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover blur-lg opacity-40 scale-110 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Accurate 2:3 Aspect Ratio vertical cover */}
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="relative h-full aspect-[2/3] object-cover shadow-2xl border-x border-border-dim/20"
                        referrerPolicy="no-referrer"
                        style={{ width: '333px' }}
                      />
                    </div>
                  ) : (
                    renderProjectThumbnail(project.id, projects)
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-7 flex-grow space-y-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-mainhtml leading-tight group-hover:text-brand transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-1 px-2.5 rounded-full text-[10px] font-mono tracking-tight bg-border-dim text-brand uppercase border border-brand/15">
                      {project.category === 'code' ? 'Code Integration' : 'UI Case Study'}
                    </div>
                  </div>

                  {project.category === 'code' ? (
                    /* Software Storytelling with Interactive Compact Segments */
                    <div className="space-y-4">
                      {/* Interactive Segment Buttons */}
                      <div className="flex bg-cardhover p-1 rounded-xl border border-border-dim text-[11px] font-semibold">
                        {[
                          { key: 'problem', label: '⚠️ المشكلة', activeBg: 'text-amber-500' },
                          { key: 'solution', label: '💡 الحلّ', activeBg: 'text-brand' },
                          { key: 'result', label: '✓ الأثر', activeBg: 'text-accent' }
                        ].map(tab => (
                          <button
                            key={tab.key}
                            onClick={() => setProjectTab(project.id, tab.key as any)}
                            className={`flex-1 py-2 px-1 rounded-lg transition-all text-center cursor-pointer font-bold ${
                              getProjectTab(project.id) === tab.key
                                ? `bg-cardbg ${tab.activeBg} shadow-[0_1px_5px_rgba(0,0,0,0.15)] border border-border-dim/40`
                                : 'text-subtext/50 hover:text-subtext'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Expanded Dynamic Details Element */}
                      <div className="min-h-[85px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                          {getProjectTab(project.id) === 'problem' && (
                            <motion.div
                              key="problem"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs md:text-sm text-subtext leading-relaxed bg-cardhover/30 p-2.5 rounded-lg border border-border-dim"
                            >
                              {project.problem}
                            </motion.div>
                          )}
                          {getProjectTab(project.id) === 'solution' && (
                            <motion.div
                              key="solution"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs md:text-sm text-subtext leading-relaxed bg-cardhover/30 p-2.5 rounded-lg border border-border-dim"
                            >
                              {project.solution}
                            </motion.div>
                          )}
                          {getProjectTab(project.id) === 'result' && (
                            <motion.div
                              key="result"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs md:text-sm text-mainhtml leading-relaxed font-normal bg-brand-dim p-2.5 rounded-lg border border-brand/10"
                            >
                              {project.result}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    /* UI Designs */
                    <div className="space-y-4">
                      <p className="text-subtext text-sm leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tech Badges Footer */}
                <div className="px-6 py-4 bg-border-dim/30 border-t border-border-dim/40 flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech, tid) => (
                    <span 
                      key={tid} 
                      className="text-[10px] font-mono text-subtext px-2 py-0.5 rounded bg-border-dim border border-border-dim select-none"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>



      </div>
    </section>
  );
}
