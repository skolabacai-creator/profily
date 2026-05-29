import { Project, Transformation, Stat, Achievement } from '../types';

export const statsData: Stat[] = [
  {
    id: 'stat1',
    value: '+2',
    label: 'سنة في تطوير الويب'
  },
  {
    id: 'stat2',
    value: '6',
    label: 'مشاريع حقيقية منشورة'
  },
  {
    id: 'stat3',
    value: '$8,000',
    label: 'تمويل لمشروع "سكولا"'
  },
  {
    id: 'stat4',
    value: 'المركز 1',
    label: 'في ريادة الأعمال'
  }
];

export const transformationsData: Transformation[] = [
  {
    id: 'tr1',
    number: '1',
    before: 'التشتت بين اللغات البرمجية الكثيرة',
    after: 'بناء موقع حقيقي يحمل فكرتك',
    details: 'الانتقال فوراً من التعلم النظري إلى التنفيذ والبرمجة العملية لبناء منتج حقيقي.'
  },
  {
    id: 'tr2',
    number: '2',
    before: 'الحيرة في تنسيق وحيرة اختيار الألوان',
    after: 'واجهات واضحة وقابلة للتصفح السهل',
    details: 'تعلم أهم أسس توزيع المساحات وتصميم تجربة تصفح مريحة ومنسقة لجمهورك.'
  },
  {
    id: 'tr3',
    number: '3',
    before: 'صعوبة استمرار التعلم البرمجي الطويل',
    after: 'تسريع العمل والإنتاج بالذكاء الاصطناعي',
    details: 'توظيف أفضل الأدوات التوليدية كشريك برمجي يختصر عنك مئات الخطوات البرمجية.'
  },
  {
    id: 'tr4',
    number: '4',
    before: 'الاعتقاد بأن الإنتاج مؤجل للتخرج',
    after: 'دخول سوق العمل وبناء معرض أعمالك',
    details: 'بناء مشاريع حية حقيقية تثبت جدارتك أمام الشركات والجهات المانحة من البداية.'
  }
];

export const projectsData: Project[] = [
  {
    id: 'p1',
    title: '🎓 منصة سكولا',
    category: 'code',
    problem: 'تشتت الطلاب وصعوبة تنظيم الخطة الدراسية بما يناسب ظروفهم ومستواهم.',
    solution: 'منصة ذكية تضع خططاً دراسية مخصصة بمرونة تامة لراحة الطالب.',
    result: 'حاز المشروع على تمويل بقيمة 8,000$ كأحد الحلول التقنية المبتكرة الموجهة لخدمة الطلاب.',
    technologies: ['React', 'Tailwind', 'Vite', 'Gemini AI', 'Node.js']
  },
  {
    id: 'p2',
    title: '👗 تطبيق لبستي',
    category: 'code',
    problem: 'صعوبة تخيل المقاسات والمظهر الحقيقي للملابس عند الشراء عبر الإنترنت.',
    solution: 'غرفة قياس افتراضية ذكية لمعاينة الملابس رقمياً بدقة قبل اتخاذ قرار الشراء.',
    result: 'تجربة تسوق تفاعلية تزيد مبيعات المتاجر وتقلل من نسبة استرجاع البضائع.',
    technologies: ['React Native', 'Python', 'AI fitting', 'Tailwind']
  },
  {
    id: 'p3',
    title: '⚖️ تطبيق ميزان',
    category: 'code',
    problem: 'تعقيد تطبيقات إدارة المال التقليدية التي تطلب مدخلات كثيرة وتسبب تشتت المستخدم العادي.',
    solution: 'تطبيق مالي هجين ومبسط لتسجيل الإيرادات والمصاريف اليومية بمرونة تامة.',
    result: 'إدارة مالية شخصية رشيقة تتم ببضع نقرات وبدون أي تعقيد تقني.',
    technologies: ['React', 'Recharts', 'PWA', 'Local Database']
  },
  {
    id: 'p4',
    title: '🏥 مستوصف حلب',
    category: 'code',
    problem: 'الازدحام، الطوابير، وضياع المواعيد الطبية في العيادات والمراكز الصحية.',
    solution: 'بوابة حجز وإدارة مواعيد للمرضى والعيادات فورياً وبدقة عالية.',
    result: 'تنظيم رقمي كامل يضمن راحة المريض وتوفير وقت الانتظار.',
    technologies: ['React', 'Node.js', 'Express', 'SQLite']
  },
  {
    id: 'p5',
    title: '🤲 تطبيق صلاتي',
    category: 'code',
    problem: 'كثرة الإعلانات والمشتتات البصرية في تطبيقات الأذكار والعبادات الحالية.',
    solution: 'مذكرة أذكار وصلوات هادئة تماماً، تعمل بالكامل (أوفلاين) بلا مشتتات.',
    result: 'مساحة روحية نقية 100% تساعد على التركيز بدون إعلانات مزعجة.',
    technologies: ['React', 'Tailwind CSS', 'Offline Store']
  },
  {
    id: 'p6',
    title: '☕ سنمار كوفي',
    category: 'code',
    problem: 'تأخر تلبية طلبات الزبائن والازدحام عند الكاونتر في أوقات الذروة.',
    solution: 'نظام إرسال الطلبات للمطبخ ذاتياً وسريعاً عبر مسح كود QR مثبت على كل طاولة.',
    result: 'تسريع عملية الخدمة، تقليل نسبة الخطأ في المطبخ، ورفع كفاءة إدارة المقهى.',
    technologies: ['Vite', 'React', 'WebSockets', 'Tailwind']
  },
  // Design projects
  {
    id: 'd1',
    title: 'TaxiLookMate 🚕',
    category: 'design',
    description: 'واجهة تطبيق أزياء واستشارات مظهر ذكية للمستخدمين وتنسيق ملابسهم بصرياً.',
    technologies: ['Figma', 'UI Design', 'Design System']
  },
  {
    id: 'd2',
    title: 'صلة (Silaa) 🏍️',
    category: 'design',
    description: 'بوابة لطلب قطع غيار وحجز صيانة الدراجات بالاعتماد على البساطة لضمان تصفح سهل.',
    technologies: ['Figma', 'Dark Mode', 'User Flows']
  },
  {
    id: 'd3',
    title: 'WomanIx Coder 💻',
    category: 'design',
    description: 'واجهة منصة متناسقة لتمكين المبرمجات وتعليمهم بأسلوب تفاعلي ومريح بصرياً.',
    technologies: ['Figma', 'Web Design', 'Typography Suite']
  },
  {
    id: 'd4',
    title: 'BasketballFaster 🏀',
    category: 'design',
    description: 'تطبيق تتبع أداء كرة السلة للناشئين بأسلوب ألعاب وتفاعلية تجذب الانتباه.',
    technologies: ['Figma', 'Gamified UI', 'Fluid Layouts']
  },
  {
    id: 'd5',
    title: 'Abdullah Saoud 🧑‍💼',
    category: 'design',
    description: 'معرض أعمال تعريفي لشخصية هندسية، يعتمد التصميم النظيف ذو التباين العالي للقراءة المباشرة.',
    technologies: ['Figma', 'Minimalist Grid', 'High Contrast']
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'ach1',
    title: 'المركز الأول في ريادة الأعمال',
    description: 'نيل التقييم الأعلى بمنافسة المشاريع والشركات الناشئة في حاضنات الأعمال.',
    metric: '1'
  },
  {
    id: 'ach2',
    title: 'تمويل بقيمة 8,000$ لمشروع "سكولا"',
    description: 'تلقي دعم مالي مستحق من منظمة بنفسج لتطوير وضمان استدامة الخدمة الطلابية.',
    metric: '8,000$'
  },
  {
    id: 'ach3',
    title: 'المركز الثالث بتصميم الواجهات',
    description: 'تقدير متقدم لمهارات تبسيط تجربة واجهة الاستخدام (UX) وبناء الهويات البصرية المتكاملة.',
    metric: '3'
  },
  {
    id: 'ach4',
    title: '6 مشاريع مفعّلة ومنشورة',
    description: 'حلول ومستودعات برمجية متوفرة تهدف لحل مشكلات يومية حقيقية للمستخدمين.',
    metric: '+6'
  }
];
