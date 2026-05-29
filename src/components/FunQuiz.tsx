import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Sparkles, MessageSquare, RotateCcw } from 'lucide-react';
import { db } from '../data/db';

interface Question {
  id: number;
  text: string;
  options: {
    key: string;
    text: string;
    description: string;
  }[];
}

export default function FunQuiz() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [whatsappLinkBase, setWhatsappLinkBase] = useState('https://wa.me/963935122304');

  useEffect(() => {
    const fetchWhatsapp = async () => {
      try {
        const socials = await db.getSocials();
        const whatsappLink = socials.find(s => s.type === 'whatsapp')?.link || '';
        if (whatsappLink) {
          let baseLink = whatsappLink;
          if (baseLink.includes('?')) {
            baseLink = baseLink.split('?')[0];
          }
          setWhatsappLinkBase(baseLink);
        }
      } catch (err) {
        console.error('Error loading WhatsApp number for Quiz:', err);
      }
    };
    fetchWhatsapp();
  }, []);

  const questions: Question[] = [
    {
      id: 1,
      text: "هل سبق لك التعامل مع الحواسيب أو تجربة البرمجة؟",
      options: [
        { key: "never", text: "لا، لم يسبق لي كتابة أي كود برمجى من قبل.", description: "💡 رد النظام الفوري: وهذه هي البداية الطبيعية تماماً لمعظم من بدؤوا معي وحققوا نجاحاً ملموساً." },
        { key: "basic", text: "لدي أساسيات وتجارب بسيطة لكني أشعر بالتشتت.", description: "💡 رد النظام الفوري: ممتاز! سنربط هذه الأساسيات المتفرقة معاً لنخرج بمنتج فعلي ملموس." },
        { key: "tried", text: "حاولت الدراسة سابقاً لكني توقفت في منتصف الطريق.", description: "💡 رد النظام الفوري: المشكلة لم تكن يوماً في قدرتك، بل في المناهج النظرية الخالية من التطبيق المباشر." }
      ]
    },
    {
      id: 2,
      text: "ما هو الهدف الأساسي الذي تسعى لتحقيقه في نهاية دورتنا؟",
      options: [
        { key: "idea", text: "لدي فكرة مشروع حقيقية وأريد تحويلها لموقع يعمل بكفاءة.", description: "سنسلك أقصر الطرق لتحويل فكرتك إلى منتج باستخدام أدوات العصر." },
        { key: "income", text: "أريد بناء معرض أعمال مميز يؤهلني لتلقي طلبات العمل.", description: "سنركز على بناء وتأسيس مشاريع تبرز مهارتك وتثبت قدرتك للمستخدمين." },
        { key: "contest", text: "أريد التميز في مسابقات الابتكار والحصول على دعم لمشروعي.", description: "مسار مشابه جداً للخطوات التي مررت بها مع المنظمات المانحة." }
      ]
    },
    {
      id: 3,
      text: "ما هو العائق أو التخوف الأكبر الذي يمنعك من البدء الفعلي حالياً؟",
      options: [
        { key: "myth", text: "أخشى ألا أمتلك الموهبة الكافية أو أن تكون الرياضيات عائقاً.", description: "هذا وهم شائع؛ البرمجة مهارة مكتسبة تُصنع بالاستمرارية والتطبيق." },
        { key: "distracted", text: "أعاني من التشتت وكثرة المصادر واللغات ولا أعرف نقطة البداية.", description: "جلسة واحدة كفيلة بوضع خريطتك وتوفير شهور من البحث العشوائي." },
        { key: "time", text: "ضيق الوقت بسبب التزاماتي الدراسية في المرحلة الثانوية.", description: "سننسق سوياً أوقاتاً مرنة وجلسات ذكية لا تؤثر على دراستك." }
      ]
    }
  ];

  const handleOptionSelect = (key: string) => {
    const updatedAnswers = { ...answers, [currentStep]: key };
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  // Generate customized message to prefill WhatsApp
  const generateWhatsAppUrl = () => {
    const q1Ans = questions[0].options.find(o => o.key === answers[0])?.text || '';
    const q2Ans = questions[1].options.find(o => o.key === answers[1])?.text || '';
    const q3Ans = questions[2].options.find(o => o.key === answers[2])?.text || '';

    const textPayload = `أهلاً إبراهيم، قمت بتجربة اختبار تشخيص الفكرة عبر موقعك وهذه هي النتيجة:
- تجربتي البرمجية: ${q1Ans}
- هدفي الأساسي: ${q2Ans}
- العائق الأكبر لدي: ${q3Ans}

أود التحدث معك لعدة دقائق لمناقشة هذه النقاط وتحديد موعد للبدء!`;

    return `${whatsappLinkBase}?text=${encodeURIComponent(textPayload)}`;
  };

  const getEncouragementMessage = () => {
    if (answers[0] === 'never') {
      return "البدء من الصفر تماماً ميزة رائعة لأنك لم تتأثر بالطرق التعليمية الجافة والمملة. سنعمل معاً على بناء صفحاتك وموقعك الأول خطوة بخطوة بكل وضوح.";
    }
    if (answers[1] === 'basic') {
      return "تجاربك السابقة أساس ممتاز يحتاج فقط للتنظيم والتوجيه نحو مشروع كامل. سنضع معرفتك موضع التنفيذ دون تكرار للشروح الطويلة.";
    }
    return "التوقف في نصف الطريق غالباً ما يكون سببه المناهج النظرية المملة. سنعتمد هنا أسلوب البناء والتعامل المباشر لتشعر بقيمة كل سطر تكتبه.";
  };

  return (
    <div className="bg-cardbg border border-brand/20 rounded-3xl p-6 md:p-8 max-w-xl mx-auto shadow-[0_4px_30px_rgba(170,255,0,0.03)] selection:bg-brand selection:text-warmblack">
      <div className="flex items-center gap-2 mb-6 border-b border-border-dim pb-4">
        <div className="p-2 bg-brand/10 rounded-lg">
          <HelpCircle className="w-5 h-5 text-brand" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-mainhtml">خطوتك الأولى لتحديد فكرتك</h3>
          <p className="text-xs text-subtext font-light">أجب على 3 أسئلة سريعة لنرسم خطتك المقترحة فوراً</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Progress indicator */}
            <div className="flex justify-between items-center text-xs font-mono text-subtext/60">
              <span>السؤال {currentStep + 1} من {questions.length}</span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <span
                    key={i}
                    className={`w-6 h-1 rounded-full transition-colors duration-300 ${
                      i <= currentStep ? 'bg-brand' : 'bg-border-dim'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question title */}
            <h4 className="text-base md:text-lg font-bold text-mainhtml leading-snug">
              {questions[currentStep].text}
            </h4>

            {/* Options list */}
            <div className="space-y-3">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => handleOptionSelect(opt.key)}
                  className="cursor-pointer w-full text-right p-4 rounded-xl bg-cardhover/50 hover:bg-cardhover border border-border-dim hover:border-brand/40 transition-all duration-300 group flex flex-col gap-1"
                >
                  <span className="text-sm font-semibold text-mainhtml group-hover:text-brand transition-colors">
                    {opt.text}
                  </span>
                  <span className="text-xs text-subtext/80 font-light leading-relaxed">
                    {opt.description}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Success Heading */}
            <div className="text-center space-y-2 py-4">
              <div className="w-12 h-12 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center mx-auto text-brand animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-lg md:text-xl font-extrabold text-mainhtml">تم تشخيص حالتك بنجاح!</h4>
              <p className="text-xs text-subtext">إليك التوجيه المقترح المناسب لوضعك الحالي</p>
            </div>

            {/* Custom Encouraging Message */}
            <div className="p-5 rounded-2xl bg-brand/5 border border-brand/20 text-sm space-y-3 leading-relaxed">
              <span className="text-[10px] font-mono text-brand font-bold uppercase block tracking-wider">// التوصية المقترحة:</span>
              <p className="text-mainhtml font-medium">
                "{getEncouragementMessage()}"
              </p>
              <p className="text-subtext font-light text-xs pt-2 border-t border-brand/10">
                الحل لا يكمن في مراكمة الدروس النظرية، بل في البدء العملي المباشر وبناء مشروع حقيقي خطوة بخطوة.
              </p>
            </div>

            {/* CTA action buttons */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand text-warmblack font-extrabold p-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(170,255,0,0.25)] transition-all duration-300 text-base"
              >
                <MessageSquare className="w-5 h-5" />
                <span>شارك النتيجة لمناقشة خطتك مجاناً</span>
              </a>

              <button
                onClick={handleReset}
                className="cursor-pointer w-full bg-transparent hover:bg-border-dim py-3 text-xs font-mono text-subtext flex items-center justify-center gap-1.5 rounded-lg transition-colors border border-transparent hover:border-border-dim/50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة تشخيص الفكرة من جديد</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
