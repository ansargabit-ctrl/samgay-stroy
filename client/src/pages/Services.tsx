import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LicenseModal from '@/components/LicenseModal';
import FleetShowcase from '@/components/FleetShowcase';
import { SSG_LICENSE_MAIN, SSG_LICENSE_APP1, SSG_LICENSE_APP2 } from '@/data/presentationContent';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLang();

  const licenseFacts = [
    { label: t.services.facts.license, value: '15-GSL №001485-1' },
    { label: t.services.facts.category, value: 'II' },
    { label: t.services.facts.primaryIssue, value: '13.10.2009' },
    { label: t.services.facts.issued, value: '26.03.2024' },
    { label: t.services.facts.bin, value: '090340019007' },
    { label: t.services.facts.regOffice, value: t.services.facts.regOfficeVal },
  ];

  const docs = [
    { src: SSG_LICENSE_MAIN, alt: 'License, page 1' },
    { src: SSG_LICENSE_APP1, alt: 'License appendix, page 1' },
    { src: SSG_LICENSE_APP2, alt: 'License appendix, page 2' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Header />

      {/* ═══ HEADING ═══ */}
      <section style={{ paddingTop: 'var(--header-h)' }}>
        <div className="shell pt-14 pb-12 md:pt-20 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7">
            <p className="kicker">{t.services.licensed}</p>
            <h1 className="text-5xl md:text-7xl">{t.services.hero}</h1>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{t.services.heroDesc}</p>
        </div>
      </section>

      {/* ═══ SCOPE ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="shell">
          <h2 className="sr-only">{t.services.what}</h2>
          <ul className="ruled">
            {t.services.scopes.map((svc) => (
              <li
                key={svc.title}
                id={`service-${svc.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl">{svc.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{svc.summary}</p>
                </div>
                <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {svc.items.map((item) => (
                    <li key={item} className="pl-4 relative leading-snug">
                      <span className="absolute left-0 top-[0.65em] w-1.5 h-[2px]" style={{ background: 'var(--rust)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ LICENSE ═══ */}
      <section className="py-20 md:py-24" style={{ background: 'var(--concrete)' }}>
        <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="kicker">{t.services.verified}</p>
            <h2 className="text-4xl md:text-5xl">{t.services.licensePanel}</h2>
            <dl className="mt-8" style={{ borderTop: '1px solid var(--line)' }}>
              {licenseFacts.map((f) => (
                <div key={f.label} className="grid grid-cols-[9rem_1fr] gap-4 py-3.5" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ color: 'var(--muted-ink)' }}>{f.label}</dt>
                  <dd className="font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
            <LicenseModal>
              <button className="mt-8 inline-flex items-center gap-2 font-semibold link-underline">
                {t.services.licenseDocs.charAt(0) + t.services.licenseDocs.slice(1).toLowerCase()} <ArrowRight size={16} />
              </button>
            </LicenseModal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-3 gap-3 md:gap-5 self-start">
            {docs.map((doc) => (
              <LicenseModal key={doc.src}>
                <button className="block bg-white p-2 md:p-3 transition-transform hover:-translate-y-1" style={{ boxShadow: '0 1px 0 var(--line), 0 12px 30px rgba(23,32,51,0.08)' }} aria-label={doc.alt}>
                  <img src={doc.src} alt={doc.alt} className="w-full aspect-[3/4] object-contain object-top" />
                </button>
              </LicenseModal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLEET ═══ */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <FleetShowcase />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pb-20 md:pb-28">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-12" style={{ borderTop: '4px solid var(--rust)' }}>
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-6xl">{t.sections.readyToBuild}</h2>
              <p className="mt-5 text-lg md:text-xl leading-relaxed max-w-[52ch]" style={{ color: 'var(--muted-ink)' }}>{t.sections.readyDesc}</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link asChild href="/contact">
                <a className="btn btn-primary" style={{ minHeight: '3.5rem', padding: '1rem 2rem', fontSize: '1.05rem' }}>
                  {t.sections.getInTouch} <ArrowRight size={18} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
