import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LicenseModal from '@/components/LicenseModal';
import ProjectMap from '@/components/ProjectMap';
import {
  SSG_HERO_HELMET,
  COMPANY_CONTACT_EMAIL,
  keyClients, presentationProjects, hsePrinciples,
} from '@/data/presentationContent';
import { ArrowRight, FileCheck2 } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

/* 1280px site photo; the older 516px deck image looked soft at full width */
const HERO_PHOTO = '/photos/WhatsApp Image 2026-07-25 at 09.27.34.jpeg';

/* Copy that only the redesigned home page needs */
const local = {
  en: {
    license: 'State license',
    category: 'II, all construction works',
    since: 'Operating since',
    sinceValue: '2009 · 100+ staff',
    bases: 'Offices and production bases',
    basesValue: 'Astana, Aktobe, Shymkent',
    viewLicense: 'View license',
    scopeNote: 'Full list of licensed works',
    client: 'Client',
    writeTo: 'Or write to',
  },
  ru: {
    license: 'Государственная лицензия',
    category: 'II, все СМР',
    since: 'Работаем с',
    sinceValue: '2009 · 100+ человек',
    bases: 'Офисы и базы',
    basesValue: 'Астана, Актобе, Шымкент',
    viewLicense: 'Открыть лицензию',
    scopeNote: 'Полный перечень лицензированных работ',
    client: 'Заказчик',
    writeTo: 'Или напишите на',
  },
};

/* "WE BUILD" / "WHAT" / "ENDURES" → "We build what endures" */
function sentence(...parts: string[]) {
  const s = parts.join(' ').toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sentenceCase(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}

export default function Home() {
  const { t, lang } = useLang();
  const l = lang === 'ru' ? local.ru : local.en;
  const principles = (t.sections as { hsePrinciples?: string[] }).hsePrinciples ?? hsePrinciples;
  const [lead, ...rest] = presentationProjects.slice(0, 3);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Header />

      {/* ═══════════ HERO: the crew on site, credential pinned underneath ═══════════ */}
      <section style={{ paddingTop: 'var(--header-h)', background: 'var(--navy-deep)' }}>
        <div className="hero-photo relative flex items-end">
          <img
            src={HERO_PHOTO}
            alt="Samgau engineers testing piles on a construction site"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 40%' }}
          />
          <div className="hero-shade absolute inset-0" />
          <div className="relative shell pb-12 md:pb-16 hero-load">
            <p className="text-base md:text-lg font-medium mb-5" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Samgau Stroy-Group · {t.hero.tagline}
            </p>
            <h1 className="font-bold text-white max-w-[14ch]" style={{ fontSize: 'clamp(3rem, 8.4vw, 7.25rem)' }}>
              {sentence(t.hero.title1, t.hero.title2, t.hero.title3)}
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-[46ch]" style={{ color: 'rgba(255,255,255,0.82)' }}>
              {t.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link asChild href="/projects">
                <a id="hero-projects-btn" className="btn btn-primary">{t.hero.projectsBtn} <ArrowRight size={17} /></a>
              </Link>
              <Link asChild href="/services">
                <a id="hero-services-btn" className="btn btn-ghost-light">{t.hero.servicesBtn}</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative shell" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <dl className="permit">
            <div>
              <dt>{l.license}</dt>
              <dd>15-GSL №001485-1</dd>
            </div>
            <div>
              <dt>{t.footer.category}</dt>
              <dd>{l.category}</dd>
            </div>
            <div>
              <dt>{l.since}</dt>
              <dd>{l.sinceValue}</dd>
            </div>
            <div>
              <dt>{l.bases}</dt>
              <dd>{l.basesValue}</dd>
            </div>
            <div className="permit-action flex items-center">
              <LicenseModal>
                <button className="inline-flex items-center gap-2 font-semibold link-underline whitespace-nowrap">
                  <FileCheck2 size={18} style={{ color: 'var(--rust)' }} /> {l.viewLicense}
                </button>
              </LicenseModal>
            </div>
          </dl>
        </div>
      </section>

      {/* ═══════════ SERVICES: the six licensed scopes as a ruled list ═══════════ */}
      <section className="py-20 md:py-28">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky" style={{ top: 'calc(var(--header-h) + 2rem)' }}>
              <p className="kicker">{t.sections.licensedWork}</p>
              <h2 className="text-4xl md:text-5xl">{t.sections.sixCategories}</h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>
                {t.sections.sixCategoriesDesc}
              </p>
              <Link asChild href="/services">
                <a id="home-services-all" className="mt-7 inline-flex items-center gap-2 font-semibold link-underline">
                  {l.scopeNote} <ArrowRight size={16} />
                </a>
              </Link>
            </div>
          </div>

          <ul className="ruled lg:col-span-8">
            {t.services.scopes.map((svc) => (
              <li key={svc.title} className="py-7 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-10">
                <div>
                  <h3 className="text-2xl">{svc.title}</h3>
                  <p className="mt-2" style={{ color: 'var(--muted-ink)' }}>{svc.summary}</p>
                </div>
                <ul className="space-y-1.5 text-[0.95rem]" style={{ color: 'var(--asphalt)' }}>
                  {svc.items.slice(0, 3).map((item) => (
                    <li key={item} className="pl-4 relative">
                      <span className="absolute left-0 top-[0.7em] w-1.5 h-[2px]" style={{ background: 'var(--rust)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectMap />

      {/* ═══════════ PROJECTS ═══════════ */}
      <section className="py-20 md:py-28" style={{ background: 'var(--concrete)' }}>
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-12">
            <div>
              <p className="kicker">{t.sections.portfolio}</p>
              <h2 className="text-4xl md:text-5xl">{t.sections.selectedProjects}</h2>
            </div>
            <Link asChild href="/projects">
              <a id="home-projects-all" className="btn btn-outline shrink-0">{t.sections.allProjects} <ArrowRight size={16} /></a>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {[lead, ...rest].map((proj, i) => (
              <Link asChild key={proj.id} href={`/projects/${proj.id}`}>
                <a className={`group block ${i === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}`}>
                  <div className={`overflow-hidden ${i === 0 ? 'aspect-[4/3] lg:aspect-[5/4]' : 'aspect-[16/9]'}`}>
                    <img
                      src={proj.image}
                      alt={lang === 'ru' ? proj.titleRu : proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 text-sm" style={{ color: 'var(--muted-ink)' }}>
                    <span>{sentenceCase(proj.category)} · {lang === 'ru' ? proj.locationRu : proj.location}</span>
                    <span className="font-semibold" style={{ color: 'var(--asphalt)' }}>{proj.year}</span>
                  </div>
                  <h3 className={`mt-1.5 group-hover:text-[var(--rust)] transition-colors ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                    {lang === 'ru' ? proj.titleRu : proj.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-3 max-w-[60ch] leading-relaxed" style={{ color: 'var(--muted-ink)' }}>
                      {lang === 'ru' ? proj.detailsRu : proj.details}
                    </p>
                  )}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HSE ═══════════ */}
      <section style={{ background: 'var(--navy)', color: '#fff' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[300px] lg:min-h-0">
            <img src={SSG_HERO_HELMET} alt="Hard hat on a construction site" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-[clamp(1rem,4vw,2.5rem)] py-20 md:py-24 lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
            <p className="kicker" style={{ color: '#e8a48f' }}>{t.sections.safetyFirst}</p>
            <h2 className="text-4xl md:text-5xl">{t.sections.hseTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed max-w-[48ch]" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {t.sections.hseDesc}
            </p>
            <ul className="ruled-dark mt-10">
              {principles.map((p) => (
                <li key={p} className="py-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.88)' }}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ CLIENTS ═══════════ */}
      <section className="py-20 md:py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="kicker">{t.sections.clientExp}</p>
            <h2 className="text-4xl md:text-5xl">{t.sections.trustedBy}</h2>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {keyClients.map((client) => (
              <li key={client} className="py-3.5 text-lg font-medium" style={{ borderTop: '1px solid var(--line)' }}>
                {client}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="pb-20 md:pb-28">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12" style={{ borderTop: '4px solid var(--rust)' }}>
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-6xl">{t.sections.readyToBuild}</h2>
              <p className="mt-5 text-lg md:text-xl leading-relaxed max-w-[48ch]" style={{ color: 'var(--muted-ink)' }}>
                {t.sections.readyDesc}
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <Link asChild href="/contact">
                <a id="home-cta-contact" className="btn btn-primary" style={{ minHeight: '3.5rem', padding: '1rem 2rem', fontSize: '1.05rem' }}>
                  {t.sections.getInTouch} <ArrowRight size={18} />
                </a>
              </Link>
              <p className="mt-4" style={{ color: 'var(--muted-ink)' }}>
                {l.writeTo}{' '}
                <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="font-semibold link-underline" style={{ color: 'var(--asphalt)' }}>
                  {COMPANY_CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
