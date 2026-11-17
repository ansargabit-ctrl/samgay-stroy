import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LicenseModal from '@/components/LicenseModal';
import { SSG_PHOTO_DRILLING_DAY, SSG_LICENSE_MAIN, keyClients } from '@/data/presentationContent';
import { useLang } from '@/context/LanguageContext';

export default function About() {
  const { t } = useLang();

  const facts = [
    { title: t.about.cat2, desc: t.about.cat2Desc },
    { title: t.about.threeLocations, desc: t.about.threeLocationsDesc },
    { title: t.about.local, desc: t.about.localDesc },
  ];

  const values = [
    { title: t.about.precision, desc: t.about.precisionDesc },
    { title: t.about.responsiveness, desc: t.about.responsivenessDesc },
    { title: t.about.accountability, desc: t.about.accountabilityDesc },
  ];

  const timelineData = t.about.timelineData;
  const timeline = ['2009', '2021', '2022', '2024'].map((year, i) => ({ year, ...timelineData[i] })).filter((e) => e.label);

  const licenseFacts = [
    { label: t.services.facts.license, value: '15-GSL №001485-1' },
    { label: t.services.facts.category, value: 'II' },
    { label: t.services.facts.primaryIssue, value: '13.10.2009' },
    { label: t.services.facts.issued, value: '26.03.2024' },
    { label: t.services.facts.bin, value: '090340019007' },
    { label: t.services.facts.regOffice, value: t.services.facts.regOfficeVal },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Header />

      {/* ═══ HEADING ═══ */}
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="shell pt-14 pb-12 md:pt-20 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="kicker">{t.about.ourStory}</p>
            <h1 className="text-5xl md:text-7xl">{t.about.title}</h1>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{t.about.desc}</p>
        </div>
      </section>

      {/* ═══ FACTS ═══ */}
      <section className="pb-20 md:pb-24">
        <div className="shell grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {facts.map((f) => (
            <div key={f.title} className="pt-5" style={{ borderTop: '3px solid var(--asphalt)' }}>
              <h2 className="text-2xl">{f.title}</h2>
              <p className="mt-3 leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PHOTO + VALUES ═══ */}
      <section style={{ background: 'var(--navy)', color: '#fff' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px]">
            <img src={SSG_PHOTO_DRILLING_DAY} alt="Samgau crew at a drilling site" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="px-[clamp(1rem,4vw,2.5rem)] py-20 md:py-24 lg:pl-16 lg:pr-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
            <p className="kicker" style={{ color: '#e8a48f' }}>{t.about.values}</p>
            <h2 className="text-4xl md:text-5xl">{t.about.whatDrives}</h2>
            <ul className="ruled-dark mt-10">
              {values.map((v) => (
                <li key={v.title} className="py-5">
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-1.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-20 md:py-28">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="kicker">{t.about.history}</p>
            <h2 className="text-4xl md:text-5xl">{t.about.timeline}</h2>
          </div>
          <ol className="lg:col-span-8 ruled">
            {timeline.map((e) => (
              <li key={e.year} className="py-7 grid grid-cols-[5rem_1fr] md:grid-cols-[7rem_1fr] gap-4">
                <span className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--rust)' }}>{e.year}</span>
                <div>
                  <h3 className="text-xl md:text-2xl">{e.label}</h3>
                  <p className="mt-2 leading-relaxed max-w-[62ch]" style={{ color: 'var(--muted-ink)' }}>{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ LICENSE ═══ */}
      <section className="py-20 md:py-24" style={{ background: 'var(--concrete)' }}>
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="kicker">{t.about.officialDoc}</p>
            <h2 className="text-4xl md:text-5xl">{t.about.licenseRecord}</h2>
            <dl className="mt-8" style={{ borderTop: '1px solid var(--line)' }}>
              {licenseFacts.map((f) => (
                <div key={f.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3.5" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ color: 'var(--muted-ink)' }}>{f.label}</dt>
                  <dd className="font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <LicenseModal>
              <button className="block w-full max-w-[380px] mx-auto bg-white p-3 transition-transform hover:-translate-y-1" style={{ boxShadow: '0 1px 0 var(--line), 0 16px 40px rgba(23,32,51,0.1)' }} aria-label={t.about.licenseRecord}>
                <img src={SSG_LICENSE_MAIN} alt="State construction license 15-GSL №001485-1" className="w-full aspect-[3/4] object-contain object-top" />
              </button>
            </LicenseModal>
          </div>
        </div>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section className="py-20 md:py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="kicker">{t.about.clients}</p>
            <h2 className="text-4xl md:text-5xl">{t.about.clientsTitle}</h2>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {keyClients.map((client) => (
              <li key={client} className="py-3.5 text-lg font-medium" style={{ borderTop: '1px solid var(--line)' }}>{client}</li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
