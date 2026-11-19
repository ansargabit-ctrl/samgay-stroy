import { useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { presentationProjects, getLocalizedProject } from '@/data/presentationContent';
import { KZ_GRATICULE, KZ_OUTLINE, KZ_POINTS, KZ_VIEWBOX } from '@/data/kzMap';

type SiteKey = keyof typeof KZ_POINTS;

/* Where the work actually is: project ids per location, plus the company's own bases */
const SITES: { key: SiteKey; en: string; ru: string; ids: string[]; officeEn?: string; officeRu?: string; labelSide: 'left' | 'right' }[] = [
  {
    key: 'aktobe', en: 'Aktobe region', ru: 'Актюбинская область', labelSide: 'right',
    ids: ['SSG.2023-WDC', 'SSG.2024-TPP', 'SSG.2022-KTGA', 'SSG.2022-AKIMAT', 'SSG.2022-RADZHA', 'SSG.2022-KMK', 'SSG.2021-BOZOY'],
    officeEn: 'Registered office', officeRu: 'Юридический адрес',
  },
  { key: 'pavlodar', en: 'Pavlodar', ru: 'Павлодар', labelSide: 'left', ids: ['SSG.2023-HPU', 'SSG.2024-EHMK'] },
  { key: 'astana', en: 'Astana', ru: 'Астана', labelSide: 'left', ids: [], officeEn: 'Operations office', officeRu: 'Операционный офис' },
  { key: 'shymkent', en: 'Shymkent', ru: 'Шымкент', labelSide: 'right', ids: [], officeEn: 'Production base', officeRu: 'Производственная база' },
];

const copy = {
  en: {
    kicker: 'Geography',
    title: 'Where we have built',
    lead: 'Projects across Kazakhstan, from the Aktobe oil and gas region to the Pavlodar industrial sites. Select a location to see the work there.',
    projects: (n: number) => (n === 1 ? '1 project' : `${n} projects`),
    noProjects: 'Company base. Crews and equipment are dispatched to sites from here.',
  },
  ru: {
    kicker: 'География',
    title: 'Где мы строили',
    lead: 'Объекты по всему Казахстану: от нефтегазового Актюбинского региона до промышленных площадок Павлодара. Выберите точку, чтобы увидеть проекты.',
    projects: (n: number) => `${n} ${n === 1 ? 'проект' : n < 5 ? 'проекта' : 'проектов'}`,
    noProjects: 'База компании. Отсюда бригады и техника направляются на объекты.',
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectMap() {
  const { lang } = useLang();
  const c = lang === 'ru' ? copy.ru : copy.en;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState<SiteKey>('aktobe');

  const show = inView || reduce;
  const t = reduce ? 0 : 1;
  const site = SITES.find((s) => s.key === active)!;
  const projects = site.ids
    .map((id) => presentationProjects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => getLocalizedProject(p, lang))
    .sort((a, b) => b.year - a.year);
  const name = (s: (typeof SITES)[number]) => (lang === 'ru' ? s.ru : s.en);
  const office = (s: (typeof SITES)[number]) => (lang === 'ru' ? s.officeRu : s.officeEn);

  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ background: 'var(--navy-deep)', color: '#fff' }}>
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 md:mb-14">
          <div className="lg:col-span-7">
            <p className="kicker" style={{ color: '#e8a48f' }}>{c.kicker}</p>
            <h2 className="text-4xl md:text-6xl">{c.title}</h2>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{c.lead}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── Map ── */}
          <div ref={ref} className="lg:col-span-8 relative" style={{ aspectRatio: `${KZ_VIEWBOX.w} / ${KZ_VIEWBOX.h}` }}>
            <svg viewBox={`0 0 ${KZ_VIEWBOX.w} ${KZ_VIEWBOX.h}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
              <motion.path
                d={KZ_GRATICULE}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
                strokeDasharray="2 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
                transition={{ duration: 0.8 * t }}
              />
              <motion.path
                d={KZ_OUTLINE}
                fill="rgba(255,255,255,0.035)"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth={1.6}
                strokeLinejoin="round"
                initial={{ pathLength: reduce ? 1 : 0, fillOpacity: reduce ? 1 : 0 }}
                animate={show ? { pathLength: 1, fillOpacity: 1 } : {}}
                transition={{ pathLength: { duration: 2.4 * t, ease: 'easeInOut' }, fillOpacity: { duration: 0.8 * t, delay: 2 * t } }}
              />
            </svg>

            {SITES.map((s, i) => {
              const [x, y] = KZ_POINTS[s.key];
              const isActive = s.key === active;
              const count = s.ids.length;
              const size = count ? 18 + Math.min(count, 7) * 3.2 : 14;
              return (
                <motion.button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  aria-pressed={isActive}
                  aria-label={`${name(s)}${count ? `, ${c.projects(count)}` : ''}${office(s) ? `, ${office(s)}` : ''}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${(x / KZ_VIEWBOX.w) * 100}%`, top: `${(y / KZ_VIEWBOX.h) * 100}%` }}
                  initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.3 }}
                  animate={show ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5 * t, delay: (1.8 + i * 0.12) * t, ease }}
                >
                  {isActive && count > 0 && <span className="map-pulse" style={{ width: size, height: size }} />}
                  <span
                    className="relative flex items-center justify-center font-bold text-[0.8rem] transition-colors"
                    style={{
                      width: size,
                      height: size,
                      borderRadius: count ? '50%' : 0,
                      background: count ? (isActive ? 'var(--rust)' : '#fff') : isActive ? '#fff' : 'transparent',
                      color: count ? (isActive ? '#fff' : 'var(--navy-deep)') : 'var(--navy-deep)',
                      border: count ? 'none' : '2px solid #fff',
                      transform: count ? undefined : 'rotate(45deg)',
                    }}
                  >
                    {count > 0 && count}
                  </span>
                  <span
                    className={`hidden sm:block absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium transition-colors ${s.labelSide === 'right' ? 'left-full ml-3' : 'right-full mr-3'}`}
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
                  >
                    {name(s)}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* ── Location tabs (small screens) + detail panel ── */}
          <div className="lg:col-span-4">
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6 lg:hidden" role="group">
              {SITES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  aria-pressed={s.key === active}
                  className="shrink-0 px-3.5 py-2 text-sm font-medium"
                  style={{
                    background: s.key === active ? '#fff' : 'transparent',
                    color: s.key === active ? 'var(--navy-deep)' : 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }}
                >
                  {name(s)}
                </button>
              ))}
            </div>

            <motion.div key={active} initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 * t }}>
              <div className="pt-5" style={{ borderTop: '3px solid var(--rust)' }}>
                <h3 className="text-3xl">{name(site)}</h3>
                <p className="mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {[site.ids.length ? c.projects(site.ids.length) : null, office(site)].filter(Boolean).join(' · ')}
                </p>
              </div>

              {projects.length ? (
                <ul className="mt-5">
                  {projects.map((p) => (
                    <li key={p.id} style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                      <Link asChild href={`/projects/${p.id}`}>
                        <a className="group flex items-center gap-4 py-3.5">
                          <img src={p.image} alt="" className="w-16 h-12 object-cover shrink-0" loading="lazy" />
                          <span className="flex-1 min-w-0">
                            <span className="block font-semibold leading-snug group-hover:text-[#e8a48f] transition-colors">{p.title}</span>
                            <span className="block text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{p.year}</span>
                          </span>
                          <ArrowRight size={16} className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{c.noProjects}</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
