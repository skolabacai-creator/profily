import React, { useState, useEffect } from 'react';
import { db, SocialChannel } from '../data/db';
import { isDemoMode } from '../data/supabaseClient';
import { Project } from '../types';
import { 
  ArrowRight, Plus, Edit2, Trash2, Save, RotateCcw, 
  MessageSquare, Instagram, Compass, Twitter, Search, 
  Code, Palette, Check, AlertTriangle, Eye, ShieldCheck, 
  Link2, Info, Sparkles
} from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export default function AdminPanel({ onBackToSite }: AdminPanelProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [socials, setSocials] = useState<SocialChannel[]>([]);
  
  // App-wide data reload trigger
  const [reloadKey, setReloadKey] = useState(0);

  // Custom deleting confirmation state
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Forms state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<{
    title: string;
    category: 'code' | 'design';
    problem: string;
    solution: string;
    result: string;
    description: string;
    technologies: string;
    imageUrl: string;
  }>({
    title: '',
    category: 'code',
    problem: '',
    solution: '',
    result: '',
    description: '',
    technologies: '',
    imageUrl: ''
  });

  // Search/Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'code' | 'design'>('all');

  // Info notification
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load data initially
  useEffect(() => {
    const loadData = async () => {
      try {
        const projs = await db.getProjects();
        const socs = await db.getSocials();
        setProjects(projs);
        setSocials(socs);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [reloadKey]);

  // Show notification helpers
  const triggerNotification = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Reset formulation
  const handleResetForm = () => {
    setProjectForm({
      title: '',
      category: 'code',
      problem: '',
      solution: '',
      result: '',
      description: '',
      technologies: '',
      imageUrl: ''
    });
    setEditingProject(null);
    setIsAddingProject(false);
  };

  // Submit Add or Edit Project
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      triggerNotification('الرجاء إدخال عنوان المشروع', 'info');
      return;
    }

    const techArray = projectForm.technologies
      ? projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    if (editingProject) {
      // Edit mode
      await db.updateProject(editingProject.id, {
        title: projectForm.title,
        category: projectForm.category,
        problem: projectForm.category === 'code' ? projectForm.problem : undefined,
        solution: projectForm.category === 'code' ? projectForm.solution : undefined,
        result: projectForm.category === 'code' ? projectForm.result : undefined,
        description: projectForm.category === 'design' ? projectForm.description : undefined,
        technologies: techArray,
        imageUrl: projectForm.imageUrl || undefined
      });
      triggerNotification('تم تحديث المشروع بنجاح!');
    } else {
      // Add mode
      await db.addProject({
        title: projectForm.title,
        category: projectForm.category,
        problem: projectForm.category === 'code' ? projectForm.problem : undefined,
        solution: projectForm.category === 'code' ? projectForm.solution : undefined,
        result: projectForm.category === 'code' ? projectForm.result : undefined,
        description: projectForm.category === 'design' ? projectForm.description : undefined,
        technologies: techArray,
        imageUrl: projectForm.imageUrl || undefined
      });
      triggerNotification('تمت إضافة المشروع بنجاح!');
    }

    setReloadKey(prev => prev + 1);
    handleResetForm();
  };

  // Start Edit Project
  const handleStartEdit = (project: Project) => {
    setEditingProject(project);
    setIsAddingProject(true);
    setProjectForm({
      title: project.title,
      category: project.category,
      problem: project.problem || '',
      solution: project.solution || '',
      result: project.result || '',
      description: project.description || '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      imageUrl: project.imageUrl || ''
    });
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    setDeletingProjectId(id);
  };

  // Social update handler
  const handleSocialChange = async (id: string, field: 'username' | 'link', val: string) => {
    await db.updateSocial(id, { [field]: val });
    setReloadKey(prev => prev + 1);
  };

  // Fast reset all database
  const handleResetToDefaults = async () => {
    if (window.confirm('🚨 تحذير: سيتم إلغاء كافة التعديلات واستعادة البيانات الافتراضية الأصلية للموقع. هل ترغب بالمتابعة؟')) {
      await db.resetToDefaults();
      triggerNotification('تمت استعادة البيانات الافتراضية للموقع بالكامل!', 'info');
      setReloadKey(prev => prev + 1);
      handleResetForm();
    }
  };

  // Filter projects list for visual admin grid
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.problem && p.problem.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (categoryFilter === 'all') return matchesSearch;
    return matchesSearch && p.category === categoryFilter;
  });

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare className="w-5 h-5 text-green-400" />;
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'behance': return <Compass className="w-5 h-5 text-blue-400" />;
      case 'twitter': return <Twitter className="w-5 h-5 text-sky-400" />;
      default: return <Link2 className="w-5 h-5 text-brand" />;
    }
  };

  return (
    <div className="min-h-screen bg-warmblack text-mainhtml font-sans antialiased selection:bg-brand selection:text-warmblack pb-24 relative overflow-hidden" dir="rtl">
      
      {/* Visual background accents */}
      <div className="fixed inset-0 sparkle-grid opacity-10 pointer-events-none z-0" />
      <div className="fixed -bottom-40 left-10 w-[500px] h-[500px] bg-brand/3 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed -top-40 right-10 w-[500px] h-[500px] bg-blue-500/3 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Admin Panel Header */}
      <header className="sticky top-0 z-40 bg-warmblack/90 backdrop-blur-md border-b border-border-dim py-5 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black text-mainhtml flex items-center gap-2">
                <span>لوحة التحكم الإدارية</span>
                <span className="text-[10px] bg-brand/20 border border-brand/25 text-brand font-mono px-2 py-0.5 rounded-full">v1.1</span>
              </h1>
              <p className="text-xs text-subtext/70 mt-0.5">تحكّم ببيانات الموقع، قنوات التواصل، وأضف واعرض أعمالك.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleResetToDefaults}
              className="px-3.5 py-2 text-xs font-semibold text-subtext/80 hover:text-red-400 bg-cardbg hover:bg-red-950/20 border border-border-dim hover:border-red-500/30 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              title="إعادة تهيئة الموقع"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تهيئة المصنع</span>
            </button>
            
            <button
              onClick={onBackToSite}
              className="px-4 py-2.5 bg-brand text-warmblack font-bold text-xs rounded-xl hover:shadow-[0_4px_15px_rgba(170,255,0,0.25)] transition-all cursor-pointer flex items-center gap-1.5 border border-brand"
            >
              <span>معاينة الموقع حياً</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10 space-y-10">
        
        {/* Warning banner for Demo Mode */}
        {isDemoMode && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-5 rounded-2xl text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_20px_rgba(245,158,11,0.05)]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5 animate-pulse text-amber-400" />
              </div>
              <div className="space-y-0.5 text-right">
                <h4 className="font-black text-mainhtml">وضع المعاينة النشط (Demo Mode)</h4>
                <p className="text-xs text-subtext/80 leading-relaxed">
                  مفاتيح الاتصال بـ Supabase غير معرّفة حالياً في إعدادات البناء لدى Cloudflare. الموقع يعمل ببيانات افتراضية محلية ولا يمكن تعديلها.
                </p>
              </div>
            </div>
            <div className="text-xs bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg font-mono text-center sm:text-left self-stretch sm:self-auto flex items-center justify-center">
              Supabase Keys Missing
            </div>
          </div>
        )}
        
        {/* Toast notifications */}
        {notification && (
          <div className="fixed bottom-6 left-6 z-50 animate-bounce">
            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-sm font-bold ${
              notification.type === 'success' 
                ? 'bg-brand/15 border-brand text-brand' 
                : notification.type === 'error'
                  ? 'bg-red-500/15 border-red-500 text-red-400'
                  : 'bg-blue-500/10 border-blue-500/40 text-blue-400'
            }`}>
              {notification.type === 'error' ? (
                <AlertTriangle className="w-4 h-4 shrink-0" />
              ) : (
                <Check className="w-4 h-4 shrink-0" />
              )}
              <span>{notification.text}</span>
            </div>
          </div>
        )}

        {/* Custom Confirmation Modal for Deletion */}
        {deletingProjectId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warmblack/85 backdrop-blur-sm animate-fade-in">
            <div className="bg-cardbg border border-red-500/30 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative">
              <div className="flex items-center gap-3 text-red-400">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-base font-black">حذف مشروع من المعرض</h3>
              </div>
              <p className="text-xs text-subtext/75 leading-relaxed">
                هل أنت متأكد من رغبتك بحذف هذا المشروع بشكل نهائي؟ سيزول هذا العمل تماماً من معرض أعمال الموقع ولن تتمكن من استعادته.
              </p>
              <div className="flex gap-2.5 justify-end pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    const deleted = await db.deleteProject(deletingProjectId);
                    if (deleted) {
                      triggerNotification('تم حذف المشروع بنجاح!', 'info');
                      setReloadKey(prev => prev + 1);
                      if (editingProject?.id === deletingProjectId) {
                        handleResetForm();
                      }
                    } else {
                      triggerNotification('عذراً، فشل حذف المشروع', 'info');
                    }
                    setDeletingProjectId(null);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
                >
                  نعم، احذف المشروع
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingProjectId(null)}
                  className="px-4 py-2 bg-cardbg hover:bg-cardhover border border-border-dim text-subtext hover:text-mainhtml text-xs rounded-xl cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. SECTION: ADMIN CONTACT METODS */}
        <section className="bg-cardbg border border-border-dim rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-border-dim/60 pb-4 flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-base font-black text-mainhtml flex items-center gap-2">
                <span>1. إدارة قنوات التواصل الإجتماعي</span>
                <span className="w-1.5 h-1.5 bg-brand rounded-full" />
              </h2>
              <p className="text-xs text-subtext/60">تعديل أسماء حساباتك والروابط الحيوية المُحالة للزوار.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {socials.map((soc) => (
              <div key={soc.id} className="p-4 rounded-xl border border-border-dim bg-warmblack/20 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  {getSocialIcon(soc.type)}
                  <span className="text-xs font-bold font-mono tracking-wider text-mainhtml">{soc.name}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-subtext/60 block">اسم الحساب أو الرقم:</label>
                    <input 
                      type="text" 
                      value={soc.username}
                      onChange={(e) => handleSocialChange(soc.id, 'username', e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml focus:border-brand/40 outline-none transition-colors"
                      placeholder="مثال: ibrahim_al_abadi@"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-subtext/60 block">الرابط المباشر (Link):</label>
                    <input 
                      type="text" 
                      value={soc.link}
                      onChange={(e) => handleSocialChange(soc.id, 'link', e.target.value)}
                      className="w-full text-xs font-mono px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml block text-left focus:border-brand/40 outline-none transition-colors"
                      dir="ltr"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-brand/5 border border-brand/10 p-3 rounded-lg text-xs text-brand flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>سيتم حفظ أي تعديل في الحقول أعلاه تلقائياً وتنعكس فوراً على كامل أزرار وروابط تواصل المعاينة.</span>
          </div>
        </section>

        {/* 2. SECTION: PROJECTS MODULE */}
        <section className="bg-cardbg border border-border-dim rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-border-dim/60 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h2 className="text-base font-black text-mainhtml flex items-center gap-2">
                <span>2. إدارة معرض الأعمال والمشاريع</span>
                <span className="w-1.5 h-1.5 bg-brand rounded-full" />
              </h2>
              <p className="text-xs text-subtext/60">تحكّم بقائمة المشاريع البرمجية وتصاميم الواجهات.</p>
            </div>
            
            {!isAddingProject && (
              <button
                onClick={() => {
                  handleResetForm();
                  setIsAddingProject(true);
                }}
                className="px-4 py-2 bg-brand/15 hover:bg-brand border border-brand/35 text-brand hover:text-warmblack text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة مشروع جديد</span>
              </button>
            )}
          </div>

          {/* ADD / EDIT FORM BOX */}
          {isAddingProject && (
            <form onSubmit={handleProjectSubmit} className="p-5 rounded-xl border border-dashed border-brand/25 bg-brand-dim/5 space-y-5 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-brand flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>{editingProject ? `تعديل المشروع: ${editingProject.title}` : 'بناء مشروع جديد للمستودع'}</span>
                </span>
                
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-2.5 py-1 text-[11px] text-subtext hover:text-mainhtml bg-cardbg rounded-lg border border-border-dim transition-colors cursor-pointer"
                >
                  إلغاء التعديل
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-subtext/70 block font-bold">اسم وعنوان المشروع:</label>
                  <input 
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full text-xs font-bold px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40"
                    placeholder="مثال: 🎓 منصة سكولا"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-subtext/70 block font-bold">التصنيف الرئيسي للعمل:</label>
                  <select 
                    value={projectForm.category}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value as 'code' | 'design' }))}
                    className="w-full text-xs font-semibold px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40"
                  >
                    <option value="code">مشروع برمجي مفعّل (Code)</option>
                    <option value="design">مخطط وتصميم واجهة (Design Case-study)</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC RENDER BY CATEGORY */}
              {projectForm.category === 'code' ? (
                <div className="space-y-4 pt-2 border-t border-border-dim/40">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-amber-500 block font-bold">⚠️ المشكلة المحددة (Problem):</label>
                      <textarea 
                        value={projectForm.problem}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, problem: e.target.value }))}
                        className="w-full text-xs px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40 h-20 resize-none font-medium"
                        placeholder="المشكلة التي يحلها المشروع..."
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-brand block font-bold font-bold">💡 الحل الذكي والمنجز (Solution):</label>
                      <textarea 
                        value={projectForm.solution}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, solution: e.target.value }))}
                        className="w-full text-xs px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40 h-20 resize-none font-medium"
                        placeholder="كيف تم حل المشكلة تقنياً وببساطة..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-blue-400 block font-bold font-bold">✓ الأثر والنتيجة (Result):</label>
                      <textarea 
                        value={projectForm.result}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, result: e.target.value }))}
                        className="w-full text-xs px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40 h-20 resize-none font-medium"
                        placeholder="الأثر النهائي، التمويل، تفعيل أو رضا الزوار..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 pt-2 border-t border-border-dim/40 animate-fade-in">
                  <label className="text-[11px] font-mono text-subtext/70 block font-bold">وصف دراسة وتنسيق الواجهة:</label>
                  <textarea 
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40 h-20 resize-none font-medium"
                    placeholder="مقدمة تعريفية عن دراسة واجهة المستخدم، نظام الألوان وتوزيع الهيكلية لمصلحة العملاء..."
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 pt-2 border-t border-border-dim/40">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-subtext/70 block font-bold">التقنيات والمكونات المستخدمة (فواصل ',' لتعددها):</label>
                  <input 
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                    className="w-full text-xs px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40 font-mono text-left"
                    placeholder="React, Tailwind, Local Database, Figma"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Cover Image Upload (2:3 Aspect ratio) */}
              <div className="pt-4 border-t border-border-dim/40 space-y-2">
                <label className="text-[11px] font-mono text-subtext/70 block font-bold">صورة الغلاف (Cover Image - نسبة أبعاد 2:3 عمودية):</label>
                
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {/* File reader input trigger zone */}
                  <div className="w-full sm:w-48 aspect-[2/3] rounded-xl border border-dashed border-border-dim/80 bg-warmblack/30 hover:border-brand/40 transition-colors relative overflow-hidden flex flex-col items-center justify-center p-3 select-none text-center">
                    {projectForm.imageUrl ? (
                      <div className="absolute inset-0 w-full h-full group">
                        <img 
                          src={projectForm.imageUrl} 
                          alt="Cover preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // in case of broken URLs
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-warmblack/85 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, imageUrl: '' }))}
                            className="p-1.5 bg-red-500/25 border border-red-500 hover:bg-red-500 hover:text-white rounded-lg text-xs font-bold transition-all text-red-400 cursor-pointer"
                          >
                            إزالة الصورة
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 flex flex-col items-center justify-center pointer-events-none">
                        <div className="p-3 bg-cardbg rounded-full border border-border-dim text-subtext/40">
                          <Plus className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-mainhtml block">اختر صورة</span>
                          <span className="text-[10px] text-subtext/50 block mt-1">انقر أو اسحب لرفع كفر (JPG/PNG/WEBP)</span>
                        </div>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 800 * 1024) { // 800 KB limit
                            triggerNotification('حجم الصورة كبير جداً! يرجى اختيار صورة أقل من 800 كيلوبايت لضمان حفظها.', 'error');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            if (uploadEvent.target?.result) {
                              setProjectForm(prev => ({ ...prev, imageUrl: uploadEvent.target!.result as string }));
                              triggerNotification('تم رفع ومعالجة صورة الغلاف بنجاح!', 'success');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="flex-1 space-y-3.5 pt-1">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-mainhtml">رفع صورة غلاف مخصصة (2:3 Aspect ratio)</h4>
                      <p className="text-[11px] text-subtext/60 leading-relaxed max-w-md">
                        لأفضل جودة وجمال في واجهة معرض الأعمال، نوصي برفع صورة ذات أبعاد عمودية بنسبة <span className="text-brand font-mono">2:3</span> (مثل 600×900 أو 800×1200 بكسل). سيقوم النظام بقص وحصر الصورة تلقائياً لتبدو مذهلة ومفعمة ببريق الحداثة.
                      </p>
                    </div>

                    {/* Or enter url */}
                    <div className="space-y-1.5 max-w-md">
                      <label className="text-[11px] font-mono text-subtext/50 block">أو أدخل رابط الصورة المباشر من الإنترنت (URL):</label>
                      <input 
                        type="text"
                        value={projectForm.imageUrl}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        className="w-full text-xs px-3 py-2 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40 font-mono text-left"
                        placeholder="https://example.com/image.jpg"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand text-warmblack font-black text-xs rounded-xl hover:shadow-[0_4px_15px_rgba(170,255,0,0.2)] cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingProject ? 'حفظ التعديلات' : 'إدراج المشروع للمحفظة'}</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2.5 text-xs text-subtext hover:text-mainhtml bg-cardbg rounded-xl border border-border-dim transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {/* GRID FILTERS AND SEARCH */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-warmblack/20 border border-border-dim p-4 rounded-xl">
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-subtext/40" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 pr-9 bg-cardbg border border-border-dim rounded-lg text-mainhtml outline-none focus:border-brand/40"
                placeholder="ابحث بالعنوان أو المشكلة..."
              />
            </div>

            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto justify-end">
              {[
                { key: 'all', label: 'الكل' },
                { key: 'code', label: 'المشاريع البرمجية' },
                { key: 'design', label: 'الواجهات والتصميم' },
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setCategoryFilter(filter.key as any)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg border font-bold transition-all cursor-pointer whitespace-nowrap ${
                    categoryFilter === filter.key
                      ? 'bg-brand/10 border-brand/50 text-brand'
                      : 'bg-cardbg border-border-dim text-subtext hover:border-brand/20'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* PROJECTS LIST TABULAR DISPLAY */}
          <div className="overflow-x-auto border border-border-dim rounded-xl">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#121212] border-b border-border-dim text-subtext/60">
                <tr>
                  <th className="p-4 font-bold">اسم العمل</th>
                  <th className="p-4 font-bold">التصنيف</th>
                  <th className="p-4 font-bold hidden md:table-cell">التقنيات</th>
                  <th className="p-4 font-bold hidden lg:table-cell">ملخص عن المشروع</th>
                  <th className="p-4 font-bold text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dim/40">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-subtext/40 font-mono">
                      لا تتوفر نتائج في معرض المجلد لمحدد البحث.
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-cardhover/25 transition-colors">
                      <td className="p-4 font-bold text-mainhtml flex items-center gap-2">
                        <span>{p.title}</span>
                      </td>
                      
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                          p.category === 'code' 
                            ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' 
                            : 'bg-purple-500/5 text-purple-400 border-purple-500/20'
                        }`}>
                          {p.category === 'code' ? 'برمجة' : 'تصميم'}
                        </span>
                      </td>

                      <td className="p-4 font-mono text-[10px] text-subtext/70 hidden md:table-cell gap-1">
                        {p.technologies?.slice(0, 3).join(', ') || 'بلا تقنيات'}
                      </td>

                      <td className="p-4 text-subtext/75 font-light max-w-xs truncate hidden lg:table-cell">
                        {p.category === 'code' ? p.solution : p.description}
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-1 px-2 hover:bg-brand/10 border border-transparent hover:border-brand/35 rounded-lg text-brand transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                            title="تعديل هذا المشروع"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>
                          
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1 px-2 hover:bg-red-500/10 border border-transparent hover:border-red-500/35 rounded-lg text-red-400 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-bold"
                            title="حذف هذا المشروع"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}
