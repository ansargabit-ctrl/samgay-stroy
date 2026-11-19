import { useEffect, useState, type SyntheticEvent } from 'react';
import { useRoute, Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { presentationProjects, ProjectData, getLocalizedProject } from '@/data/presentationContent';
import { useLang } from '@/context/LanguageContext';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Only one site video plays at a time
const pauseOtherVideos = (e: SyntheticEvent<HTMLVideoElement>) => {
  document.querySelectorAll<HTMLVideoElement>('video[data-site-video]').forEach((v) => {
    if (v !== e.currentTarget) v.pause();
  });
};

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:id');
  const { t, lang } = useLang();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const currentIndex = Math.max(0, presentationProjects.findIndex((p) => p.id === params?.id));
  const rawProject: ProjectData = presentationProjects[currentIndex];
  const project = getLocalizedProject(rawProject, lang);
  const n = presentationProjects.length;
  const prevProject = getLocalizedProject(presentationProjects[(currentIndex - 1 + n) % n], lang);
  const nextProject = getLocalizedProject(presentationProjects[(currentIndex + 1) % n], lang);
  const categoryLabel = t.projects.categories[project.category as keyof typeof t.projects.categories] || project.category;
  const gallery = project.gallery;
  const videos = rawProject.videos ?? [];

  // Reset the viewer when moving between projects
  useEffect(() => {
    setActive(0);
    setLightbox(false);
    window.scrollTo(0, 0);
  }, [project.id]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % gallery.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, gallery.length]);

  const step = (d: number) => setActive((i) => (i + d + gallery.length) % gallery.length);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Header />

      {/* ═══ HEADING ═══ */}
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="shell pt-10 md:pt-14 pb-10">
          <Link asChild href="/projects">
            <a className="inline-flex items-center gap-2 text-[0.95rem] font-medium hover:text-[var(--rust)] transition-colors" style={{ color: 'var(--muted-ink)' }}>
              <ArrowLeft size={16} /> {t.projects.backToProjects}
            </a>
          </Link>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="kicker">{categoryLabel} · {project.year}</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl">{project.title}</h1>
              <p className="mt-5 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--muted-ink)' }}>
                {project.details}
              </p>
            </div>
            <dl className="lg:col-span-4 text-[0.95rem]" style={{ borderTop: '1px solid var(--line)' }}>
              {[
                [t.projects.client, project.client],
                [t.projects.location, project.location],
                [t.projects.year, String(project.year)],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ color: 'var(--muted-ink)' }}>{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ═══ PHOTOS ═══ */}
      <section className="pb-16 md:pb-20">
        <div className="shell">
          <div className="relative overflow-hidden" style={{ background: 'var(--navy-deep)' }}>
            <button className="block w-full" onClick={() => setLightbox(true)} aria-label={`${t.projects.photoGalleryTitle}: ${active + 1} / ${gallery.length}`}>
              <img
                src={gallery[active]}
                alt={`${project.title}, ${active + 1} / ${gallery.length}`}
                className="w-full object-contain"
                style={{ height: 'clamp(280px, 62vh, 680px)' }}
              />
            </button>
            {gallery.length > 1 && (
              <>
                <button onClick={() => step(-1)} aria-label={t.projects.prevProject}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white" style={{ color: 'var(--asphalt)' }}>
                  <ChevronLeft size={22} />
                </button>
                <button onClick={() => step(1)} aria-label={t.projects.nextProject}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/90 hover:bg-white" style={{ color: 'var(--asphalt)' }}>
                  <ChevronRight size={22} />
                </button>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 text-sm font-medium bg-white/90" style={{ color: 'var(--asphalt)' }}>
                  {active + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  aria-label={`${i + 1} / ${gallery.length}`}
                  aria-current={i === active}
                  className="shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden transition-opacity"
                  style={{ outline: i === active ? '3px solid var(--rust)' : 'none', outlineOffset: -3, opacity: i === active ? 1 : 0.65 }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ VIDEOS ═══ */}
      {videos.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p className="kicker">{videos.length} · {t.projects.videosTitle}</p>
                <h2 className="text-3xl md:text-4xl">{t.projects.videosTitle}</h2>
              </div>
              <p className="text-[1.05rem]" style={{ color: 'var(--muted-ink)' }}>{t.projects.videosSubtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((v, i) => (
                <div key={v.src} className="relative overflow-hidden aspect-[9/16]" style={{ background: 'var(--navy-deep)' }}>
                  <video
                    data-site-video
                    src={v.src}
                    poster={v.poster}
                    controls
                    playsInline
                    preload="none"
                    onPlay={pauseOtherVideos}
                    className="w-full h-full object-contain"
                    aria-label={`${project.title}: ${t.projects.videosTitle} ${i + 1} / ${videos.length}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SCOPE & SPECS ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl mb-6">{t.projects.scopeTitle}</h2>
            <ul className="ruled">
              {project.scope.map((item) => (
                <li key={item} className="py-4 pl-6 relative text-[1.05rem] leading-relaxed">
                  <span className="absolute left-0 top-[1.55rem] w-2.5 h-[2px]" style={{ background: 'var(--rust)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl mb-6">{t.projects.techSpecsTitle}</h2>
            <dl style={{ borderTop: '1px solid var(--line)' }}>
              {project.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-6 py-4" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ color: 'var(--muted-ink)' }}>{spec.label}</dt>
                  <dd className="font-semibold text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 p-7" style={{ background: 'var(--navy)', color: '#fff' }}>
              <h3 className="text-2xl">{t.projects.inquireSimilar}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{t.projects.yourNextDesc}</p>
              <Link asChild href="/contact">
                <a className="btn btn-primary mt-6">{t.projects.startConvo} <ArrowRight size={17} /></a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PREV / NEXT ═══ */}
      <nav className="shell pb-20 grid grid-cols-1 md:grid-cols-2 gap-6" aria-label={t.nav.projects}>
        {[
          { p: prevProject, label: t.projects.prevProject, align: 'left' as const },
          { p: nextProject, label: t.projects.nextProject, align: 'right' as const },
        ].map(({ p, label, align }) => (
          <Link asChild key={label} href={`/projects/${p.id}`}>
            <a className={`group flex items-center gap-5 pt-5 ${align === 'right' ? 'md:flex-row-reverse md:text-right' : ''}`} style={{ borderTop: '1px solid var(--asphalt)' }}>
              <img src={p.image} alt="" className="w-24 h-16 md:w-32 md:h-20 object-cover shrink-0" />
              <div>
                <div className="text-sm" style={{ color: 'var(--muted-ink)' }}>{label}</div>
                <div className="text-lg font-semibold leading-snug group-hover:text-[var(--rust)] transition-colors">{p.title}</div>
              </div>
            </a>
          </Link>
        ))}
      </nav>

      <Footer />

      {lightbox && (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: 'rgba(18,28,48,0.96)' }}
          role="dialog" aria-modal="true" aria-label={project.title} onClick={() => setLightbox(false)}>
          <div className="flex justify-between items-center px-4 md:px-8 py-4 text-white/70 text-sm">
            <span>{active + 1} / {gallery.length}</span>
            <button onClick={() => setLightbox(false)} className="p-2 text-white" aria-label={t.projects.closeModal}><X size={24} /></button>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 px-2 md:px-6 min-h-0 pb-8" onClick={(e) => e.stopPropagation()}>
            {gallery.length > 1 && <button onClick={() => step(-1)} className="p-3 text-white/80 hover:text-white shrink-0" aria-label={t.projects.prevProject}><ChevronLeft size={32} /></button>}
            <img src={gallery[active]} alt={project.title} className="max-w-full object-contain min-w-0" style={{ maxHeight: 'calc(100svh - 7rem)' }} />
            {gallery.length > 1 && <button onClick={() => step(1)} className="p-3 text-white/80 hover:text-white shrink-0" aria-label={t.projects.nextProject}><ChevronRight size={32} /></button>}
          </div>
        </div>
      )}
    </div>
  );
}
