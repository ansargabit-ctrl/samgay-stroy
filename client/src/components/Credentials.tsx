import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowUpRight, BadgeCheck, Download, FileCheck2 } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import LicenseModal from '@/components/LicenseModal';
import { SSG_LICENSE_MAIN } from '@/data/presentationContent';

const ISO_PAGES = ['/assets/ssg/iso-9001-page-1.jpg', '/assets/ssg/iso-9001-page-2.jpg'];
const ISO_PDF = '/samgau-iso-9001.pdf';
const ISO_NUMBER = 'KZ.Q.02.E0792.С25.19605';

const copy = {
  en: {
    kicker: 'Credentials',
    title: 'Licensed and certified',
    lead: 'Every project is backed by a state construction license and a quality management system certified to ISO 9001.',
    license: {
      badge: 'Category II',
      title: 'State construction license',
      rows: [['Number', '15-GSL №001485-1'], ['Issued', '26 March 2024'], ['Covers', 'All construction and installation works']],
      cta: 'View license',
    },
    iso: {
      badge: 'ISO 9001:2015',
      title: 'Quality management system',
      rows: [['Certificate', ISO_NUMBER], ['Issued by', 'Orda Cert LLP'], ['Valid', '12.05.2026 – 12.05.2029']],
      cta: 'View certificate',
    },
    modal: {
      title: 'ISO 9001 certificate of conformity',
      desc: 'The quality management system of Samgau Stroy-Group complies with ST RK ISO 9001:2016 (ISO 9001:2015).',
      rows: [
        ['Certificate', ISO_NUMBER],
        ['Standard', 'ST RK ISO 9001:2016 (ISO 9001:2015)'],
        ['Issued by', 'Orda Cert LLP, Almaty'],
        ['Registered', '12 May 2026'],
        ['Valid until', '12 May 2029'],
      ],
      scopeTitle: 'Scope of certification',
      scope: ['Construction and installation works', 'Wholesale of machinery and equipment', 'Other retail trade outside stores'],
      download: 'Download certificate (PDF)',
      page: 'Page',
    },
  },
  ru: {
    kicker: 'Документы',
    title: 'Лицензия и сертификаты',
    lead: 'Каждый проект опирается на государственную лицензию на СМР и систему менеджмента качества, сертифицированную по ISO 9001.',
    license: {
      badge: 'II категория',
      title: 'Государственная лицензия',
      rows: [['Номер', '15-GSL №001485-1'], ['Выдана', '26 марта 2024 года'], ['Охватывает', 'Все строительно-монтажные работы']],
      cta: 'Открыть лицензию',
    },
    iso: {
      badge: 'ISO 9001:2015',
      title: 'Система менеджмента качества',
      rows: [['Сертификат', ISO_NUMBER], ['Выдал', 'ТОО «Orda Cert»'], ['Действует', '12.05.2026 – 12.05.2029']],
      cta: 'Открыть сертификат',
    },
    modal: {
      title: 'Сертификат соответствия ISO 9001',
      desc: 'Система менеджмента качества ТОО «Samgau Stroy-Group» соответствует СТ РК ISO 9001:2016 (ISO 9001:2015).',
      rows: [
        ['Сертификат', ISO_NUMBER],
        ['Стандарт', 'СТ РК ISO 9001:2016 (ISO 9001:2015)'],
        ['Выдал', 'ТОО «Orda Cert», Алматы'],
        ['Зарегистрирован', '12 мая 2026 года'],
        ['Действует до', '12 мая 2029 года'],
      ],
      scopeTitle: 'Область сертификации',
      scope: ['Строительно-монтажные работы', 'Оптовая торговля машинами и оборудованием', 'Прочая розничная торговля вне магазинов'],
      download: 'Скачать сертификат (PDF)',
      page: 'Страница',
    },
  },
};

/* A document shown as a sheet of paper, with a second sheet peeking out behind it */
function Sheets({ front, back, alt }: { front: string; back?: string; alt: string }) {
  return (
    <div className="relative mx-auto w-[min(78%,15rem)] aspect-[1/1.414] transition-transform duration-500 group-hover:-translate-y-1.5">
      {back && (
        <img
          src={back}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover bg-white"
          style={{ transform: 'rotate(5deg) translate(10%, 2%)', boxShadow: '0 10px 24px -14px rgba(10,20,30,0.45)' }}
        />
      )}
      <img
        src={front}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover bg-white transition-transform duration-500 group-hover:-rotate-1"
        style={{ transform: 'rotate(-2deg)', boxShadow: '0 22px 40px -18px rgba(10,20,30,0.55), 0 0 0 1px rgba(10,20,30,0.06)' }}
      />
    </div>
  );
}

function Card({
  badge, title, rows, front, back, alt, action,
}: { badge: string; title: string; rows: string[][]; front: string; back?: string; alt: string; action: React.ReactNode }) {
  return (
    <div className="group relative h-full grid grid-cols-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] text-left" style={{ background: 'var(--paper)', border: '1px solid var(--line)' }}>
      <div className="flex items-center justify-center py-10 px-6 overflow-hidden" style={{ background: 'var(--concrete)' }}>
        <Sheets front={front} back={back} alt={alt} />
      </div>
      <div className="p-6 md:p-8 flex flex-col min-w-0">
        <span className="self-start inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-2.5 py-1" style={{ color: 'var(--rust)', border: '1.5px solid var(--rust)' }}>
          <BadgeCheck size={14} /> {badge}
        </span>
        <h3 className="mt-4 text-2xl md:text-[1.7rem] leading-tight">{title}</h3>
        <dl className="mt-5 text-[0.95rem]" style={{ borderTop: '1px solid var(--line)' }}>
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-2.5" style={{ borderBottom: '1px solid var(--line)' }}>
              <dt style={{ color: 'var(--muted-ink)' }}>{k}</dt>
              <dd className="font-semibold break-words">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-6">{action}</div>
      </div>
    </div>
  );
}

/* The card's only control; its ::after stretches over the whole card so any click opens the document */
const OpenButton = ({ label, ...props }: { label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...props}
    className="inline-flex items-center gap-2 font-semibold link-underline group-hover:text-[var(--rust)] after:content-[''] after:absolute after:inset-0"
  >
    <FileCheck2 size={18} style={{ color: 'var(--rust)' }} /> {label} <ArrowUpRight size={16} />
  </button>
);

function IsoModal({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const m = (lang === 'ru' ? copy.ru : copy.en).modal;
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-[calc(100%-2rem)] sm:max-w-5xl p-0 overflow-hidden rounded-none border-0 max-h-[92svh] overflow-y-auto"
        style={{ background: 'var(--paper)', color: 'var(--asphalt)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-5 md:p-8 flex flex-col gap-4" style={{ background: 'var(--concrete)' }}>
            <a href={ISO_PAGES[page]} target="_blank" rel="noopener noreferrer" className="block">
              <img src={ISO_PAGES[page]} alt={`${m.title}, ${m.page} ${page + 1}`} className="w-full bg-white p-2 object-contain shadow-sm" />
            </a>
            <div className="flex gap-2">
              {ISO_PAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-pressed={page === i}
                  className="px-3 py-1.5 text-sm font-semibold"
                  style={{ border: '1.5px solid var(--asphalt)', background: page === i ? 'var(--asphalt)' : 'transparent', color: page === i ? '#fff' : 'var(--asphalt)' }}
                >
                  {m.page} {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-left">
              <DialogTitle className="text-3xl font-bold leading-tight">{m.title}</DialogTitle>
              <DialogDescription className="text-base" style={{ color: 'var(--muted-ink)' }}>{m.desc}</DialogDescription>
            </DialogHeader>

            <dl className="mt-6" style={{ borderTop: '1px solid var(--line)' }}>
              {m.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ color: 'var(--muted-ink)' }}>{k}</dt>
                  <dd className="font-semibold break-words">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-ink)' }}>{m.scopeTitle}</p>
            <ul className="mt-2 space-y-1.5">
              {m.scope.map((s) => (
                <li key={s} className="pl-4 relative">
                  <span className="absolute left-0 top-[0.7em] w-1.5 h-[2px]" style={{ background: 'var(--rust)' }} />
                  {s}
                </li>
              ))}
            </ul>

            <a href={ISO_PDF} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 self-start">
              <Download size={17} /> {m.download}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Credentials() {
  const { lang } = useLang();
  const c = lang === 'ru' ? copy.ru : copy.en;

  return (
    <section id="credentials" className="py-20 md:py-28" style={{ background: 'var(--concrete)' }}>
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 md:mb-14">
          <div className="lg:col-span-7">
            <p className="kicker">{c.kicker}</p>
            <h2 className="text-4xl md:text-5xl">{c.title}</h2>
          </div>
          <p className="lg:col-span-5 text-lg leading-relaxed" style={{ color: 'var(--muted-ink)' }}>{c.lead}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card
            {...c.license}
            front={SSG_LICENSE_MAIN}
            back="/assets/ssg/license-page-2.jpg"
            alt="State construction license 15-GSL №001485-1"
            action={<LicenseModal><OpenButton label={c.license.cta} /></LicenseModal>}
          />
          <Card
            {...c.iso}
            front={ISO_PAGES[0]}
            back={ISO_PAGES[1]}
            alt={`ISO 9001 certificate ${ISO_NUMBER}`}
            action={<IsoModal><OpenButton label={c.iso.cta} /></IsoModal>}
          />
        </div>
      </div>
    </section>
  );
}
