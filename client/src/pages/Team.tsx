import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SSG_PHOTO_TEAM_SITE } from '@/data/presentationContent';
import { useLang } from '@/context/LanguageContext';

const HEADCOUNTS = ['5+', '60+', '30+'];

export default function Team() {
  const { t } = useLang();

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Header />

      {/* ═══ HEADING ═══ */}
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="shell pt-14 pb-12 md:pt-20 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="kicker">{t.team.ourPeople}</p>
            <h1 className="text-5xl md:text-7xl">{t.team.title}</h1>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{t.team.desc}</p>
        </div>
      </section>

      {/* ═══ LEADERSHIP ═══ */}
      <section className="pb-20 md:pb-28">
        <ul className="shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {t.team.members.map((m) => (
            <li key={m.name} className="pt-5" style={{ borderTop: '3px solid var(--asphalt)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--rust)' }}>{m.role}</p>
              <h2 className="mt-1 text-2xl">{m.name}</h2>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{m.expertise}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ ORGANISATION ═══ */}
      <section style={{ background: 'var(--navy)', color: '#fff' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-[clamp(1rem,4vw,2.5rem)] py-20 md:py-24 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
            <p className="kicker" style={{ color: '#e8a48f' }}>{t.team.org}</p>
            <h2 className="text-4xl md:text-5xl">{t.team.orgTitle}</h2>
            <dl className="ruled-dark mt-10">
              {t.team.departments.map((d, i) => (
                <div key={d.name} className="flex items-baseline justify-between gap-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                  <dt className="text-lg" style={{ color: 'rgba(255,255,255,0.85)' }}>{d.name}</dt>
                  <dd className="text-3xl font-bold">{HEADCOUNTS[i]}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[320px]">
            <img src={SSG_PHOTO_TEAM_SITE} alt="Samgau engineers on site" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
