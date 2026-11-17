import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLang } from '@/context/LanguageContext';
import { presentationProjects, ssgSitePhotos, getLocalizedProject } from '@/data/presentationContent';

type CatKey = 'PIPELINES' | 'MECHANICAL' | 'DRILLING' | 'GAS' | 'WELDING' | 'INDUSTRIAL';
const CATS: CatKey[] = ['INDUSTRIAL', 'GAS', 'MECHANICAL', 'PIPELINES', 'DRILLING', 'WELDING'];

export default function Projects() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState<'ALL' | CatKey>('ALL');
  const [photoIdx, setPhotoIdx] = useState<number | null>(null);

  const projects = presentationProjects
    .map((p) => getLocalizedProject(p, lang))
    .filter((p) => cat === 'ALL' || p.category === cat);
  const counts = Object.fromEntries(CATS.map((c) => [c, presentationProjects.filter((p) => p.category === c).length]));

  const photos = ssgSitePhotos.map((p) => ({ src: p.src, caption: lang === 'ru' ? p.titleRu : p.titleEn }));

  useEffect(() => {
    if (photoIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhotoIdx(null);
      if (e.key === 'ArrowRight') setPhotoIdx((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === 'ArrowLeft') setPhotoIdx((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [photoIdx, photos.length]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Header />

      {/* ═══ PAGE HEADING ═══ */}
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="shell pt-14 pb-10 md:pt-20 md:pb-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="kicker">{t.projects.chronicle} · {presentationProjects.length} {t.projects.stories.toLowerCase()}</p>
            <h1 className="text-5xl md:text-7xl">{t.projects.hero}</h1>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>
            {t.projects.heroSub}
          </p>
        </div>
      </section>

      {/* ═══ FILTER ═══ */}
      <div className="sticky z-30" style={{ top: 'var(--header-h)', background: 'rgba(245,245,242,0.96)', backdropFilter: 'blur(8px)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="shell flex gap-6 overflow-x-auto" role="tablist" aria-label={t.projects.category}>
          {(['ALL', ...CATS] as const).map((key) => {
            const active = cat === key;
            const label = key === 'ALL' ? t.projects.filterAll : t.projects.categories[key];
            const n = key === 'ALL' ? presentationProjects.length : counts[key];
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(key)}
                className="relative shrink-0 py-4 text-[0.95rem] font-medium whitespace-nowrap transition-colors hover:text-[var(--rust)]"
                style={{ color: active ? 'var(--asphalt)' : 'var(--muted-ink)' }}
              >
                {label} <span style={{ color: 'var(--ink-40)' }}>{n}</span>
                {active && <span className="absolute left-0 right-0 bottom-0 h-[3px]" style={{ background: 'var(--rust)' }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ PROJECT INDEX ═══ */}
      <section className="py-14 md:py-20">
        <div className="shell grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {projects.map((p) => (
            <Link asChild key={p.id} href={`/projects/${p.id}`}>
              <a className="group block">
                <div className="overflow-hidden aspect-[3/2]" style={{ background: 'var(--concrete)' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 text-sm" style={{ color: 'var(--muted-ink)' }}>
                  <span>{t.projects.categories[p.category as CatKey]} · {p.location}</span>
                  <span className="font-semibold" style={{ color: 'var(--asphalt)' }}>{p.year}</span>
                </div>
                <h2 className="mt-1.5 text-2xl md:text-[1.7rem] transition-colors group-hover:text-[var(--rust)]">{p.title}</h2>
                <p className="mt-2 leading-relaxed max-w-[60ch]" style={{ color: 'var(--muted-ink)' }}>{p.details}</p>
                <p className="mt-3 text-sm font-medium">{p.client}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FIELD PHOTOS ═══ */}
      <section className="py-20 md:py-24" style={{ background: 'var(--concrete)' }}>
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
            <div className="lg:col-span-7">
              <p className="kicker">{t.projects.photoCount}</p>
              <h2 className="text-4xl md:text-5xl">{t.projects.galleryTitle}</h2>
            </div>
            <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{t.projects.gallerySubtitle}</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {photos.map((ph, i) => (
              <figure key={ph.src} className="mb-6 break-inside-avoid">
                <button onClick={() => setPhotoIdx(i)} className="block w-full overflow-hidden group" aria-label={ph.caption}>
                  <img src={ph.src} alt={ph.caption} loading="lazy" className="w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                </button>
                <figcaption className="mt-2 text-sm leading-snug" style={{ color: 'var(--muted-ink)' }}>{ph.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12" style={{ borderTop: '4px solid var(--rust)' }}>
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-6xl">{t.projects.yourNext}</h2>
              <p className="mt-5 text-lg md:text-xl leading-relaxed max-w-[52ch]" style={{ color: 'var(--muted-ink)' }}>{t.projects.yourNextDesc}</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link asChild href="/contact">
                <a className="btn btn-primary" style={{ minHeight: '3.5rem', padding: '1rem 2rem', fontSize: '1.05rem' }}>
                  {t.projects.startConvo} <ArrowRight size={18} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ═══ LIGHTBOX ═══ */}
      {photoIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(18,28,48,0.96)' }}
          role="dialog"
          aria-modal="true"
          aria-label={photos[photoIdx].caption}
          onClick={() => setPhotoIdx(null)}
        >
          <div className="flex justify-between items-center px-4 md:px-8 py-4 text-white/70 text-sm">
            <span>{photoIdx + 1} / {photos.length}</span>
            <button onClick={() => setPhotoIdx(null)} className="p-2 text-white" aria-label={t.projects.closeModal}><X size={24} /></button>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 px-2 md:px-6 min-h-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPhotoIdx((photoIdx - 1 + photos.length) % photos.length)}
              className="p-3 text-white/80 hover:text-white shrink-0" aria-label={t.projects.prevProject}
            ><ChevronLeft size={32} /></button>
            <img src={photos[photoIdx].src} alt={photos[photoIdx].caption} className="max-h-full max-w-full object-contain min-w-0" style={{ maxHeight: 'calc(100svh - 9rem)' }} />
            <button
              onClick={() => setPhotoIdx((photoIdx + 1) % photos.length)}
              className="p-3 text-white/80 hover:text-white shrink-0" aria-label={t.projects.nextProject}
            ><ChevronRight size={32} /></button>
          </div>
          <p className="px-4 md:px-8 py-5 text-center text-white/85">{photos[photoIdx].caption}</p>
        </div>
      )}
    </div>
  );
}
