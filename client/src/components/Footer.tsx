import { Link } from 'wouter';
import { useLang } from '@/context/LanguageContext';
import { COMPANY_CONTACT_EMAIL } from '@/data/presentationContent';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  const footerLinks = [
    {
      heading: t.footer.services,
      links: [
        { label: t.footer.engNetworks, href: '/services' },
        { label: t.footer.roadsRailways, href: '/services' },
        { label: t.footer.groundFoundation, href: '/services' },
        { label: t.footer.loadBearing, href: '/services' },
        { label: t.footer.linearFacilities, href: '/services' },
      ],
    },
    {
      heading: t.footer.company,
      links: [
        { label: t.footer.aboutUs, href: '/about' },
        { label: t.nav.projects, href: '/projects' },
        { label: t.footer.leadership, href: '/team' },
        { label: t.nav.contact, href: '/contact' },
      ],
    },
  ];

  const dim = 'rgba(255,255,255,0.6)';

  return (
    <footer style={{ background: 'var(--navy-deep)', color: '#fff' }}>
      <div className="shell pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 pb-12">
          <div className="lg:col-span-6">
            <div className="text-2xl font-bold tracking-tight">Samgau Stroy-Group</div>
            <p className="mt-3 max-w-[42ch] leading-relaxed" style={{ color: dim }}>
              {t.footer.description}
            </p>

            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[0.95rem]">
              <div>
                <dt style={{ color: dim }}>{t.footer.regOffice}</dt>
                <dd className="mt-1">{t.contact.regOfficeValue}</dd>
              </div>
              <div>
                <dt style={{ color: dim }}>{t.footer.prodBase}</dt>
                <dd className="mt-1">Temirlan hwy 18/6, Turan dist., Shymkent</dd>
              </div>
              <div>
                <dt style={{ color: dim }}>Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${COMPANY_CONTACT_EMAIL}`} className="link-underline hover:text-white">{COMPANY_CONTACT_EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt style={{ color: dim }}>{t.footer.licenseNum}</dt>
                <dd className="mt-1">15-GSL №001485-1</dd>
              </div>
            </dl>
          </div>

          {footerLinks.map((col) => (
            <div key={col.heading} className="lg:col-span-3">
              <div className="font-semibold mb-4">{col.heading}</div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link asChild href={link.href}>
                      <a className="transition-colors hover:text-white" style={{ color: dim }}>{link.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-6 text-sm"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
        >
          <p>© {year} ТОО «Samgau Stroy-Group» · BIN 090340019007</p>
          <p>{t.footer.cities.split(' · ').map((c) => c.charAt(0) + c.slice(1).toLowerCase()).join(' · ')}</p>
        </div>
      </div>
    </footer>
  );
}
