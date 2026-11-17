import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';

/* Each option is written in its own language, so visitors recognise theirs at a glance */
const CHOICES: { code: Lang; greeting: string; language: string }[] = [
  { code: 'en', greeting: 'Welcome', language: 'English' },
  { code: 'ru', greeting: 'Добро пожаловать', language: 'Русский' },
];

/* The logo's three nested triangles, traced like a survey line before they settle */
const TRIANGLES = [
  'M8 6 L114 60 L8 114 Z',
  'M24 34 L80 60 L24 86 Z',
];
const CORE = 'M36 48 L60 60 L36 72 Z';

const ease = [0.22, 1, 0.36, 1] as const;

export default function LanguageSplash() {
  const { setLang, splashDone, confirmSplash } = useLang();
  const [leaving, setLeaving] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (splashDone) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [splashDone]);

  if (splashDone) return null;

  const choose = (code: Lang) => {
    setLang(code);
    setLeaving(true);
  };

  const t0 = reduce ? 0 : 1;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language · Выберите язык"
      className="fixed inset-0 z-[9999] flex flex-col overflow-y-auto"
      style={{ background: 'var(--navy-deep)', color: '#fff' }}
      initial={false}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: reduce ? 0 : 0.85, ease }}
      onAnimationComplete={() => { if (leaving) confirmSplash(); }}
    >
      <div className="shell flex-1 flex flex-col justify-center py-14">
        <div className="flex items-center gap-5">
          <svg viewBox="0 0 120 120" className="w-16 h-16 md:w-20 md:h-20 shrink-0" aria-hidden="true">
            {TRIANGLES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={5}
                strokeLinejoin="miter"
                initial={{ pathLength: reduce ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1 * t0, delay: (0.15 + i * 0.35) * t0, ease: 'easeInOut' }}
              />
            ))}
            <motion.path
              d={CORE}
              fill="var(--rust)"
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformOrigin: '44px 60px' }}
              transition={{ duration: 0.45 * t0, delay: 1.3 * t0, ease }}
            />
          </svg>
          <motion.div
            className="pl-5 leading-tight"
            style={{ borderLeft: '2px solid var(--rust)' }}
            initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 * t0, delay: 1.45 * t0, ease }}
          >
            <div className="text-xl md:text-2xl font-bold tracking-tight">Samgau</div>
            <div className="text-xl md:text-2xl font-bold tracking-tight">Stroy Group</div>
          </motion.div>
        </div>

        <motion.p
          className="mt-14 md:mt-20 text-base md:text-lg"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 * t0, delay: 1.75 * t0 }}
        >
          Choose your language · Выберите язык
        </motion.p>

        <ul className="mt-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.16)' }}>
          {CHOICES.map((c, i) => (
            <motion.li
              key={c.code}
              style={{ borderTop: '1px solid rgba(255,255,255,0.16)' }}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 * t0, delay: (1.9 + i * 0.12) * t0, ease }}
            >
              <button
                lang={c.code}
                onClick={() => choose(c.code)}
                disabled={leaving}
                className="group w-full flex items-center justify-between gap-6 py-5 md:py-7 text-left"
              >
                <span className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                  <span
                    className="font-bold tracking-tight leading-none transition-colors group-hover:text-[#e8a48f] group-focus-visible:text-[#e8a48f]"
                    style={{ fontSize: 'clamp(2.25rem, 6.5vw, 5.25rem)', letterSpacing: '-0.035em' }}
                  >
                    {c.greeting}
                  </span>
                  <span className="mt-2 md:mt-0 text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.language}</span>
                </span>
                <span
                  className="shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ background: 'var(--rust)' }}
                >
                  <ArrowRight size={26} />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="shell pb-6 flex flex-wrap justify-between gap-2 text-sm"
        style={{ color: 'rgba(255,255,255,0.45)' }}
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 * t0, delay: 2.2 * t0 }}
      >
        <span>15-GSL №001485-1 · Category II</span>
        <span>Astana · Aktobe · Shymkent</span>
      </motion.div>
    </motion.div>
  );
}
