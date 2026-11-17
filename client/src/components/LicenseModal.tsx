import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, FileCheck2 } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { SSG_LICENSE_MAIN } from '@/data/presentationContent';

interface LicenseModalProps {
  children?: React.ReactNode;
}

const copy = {
  en: {
    open: 'View license 15-GSL №001485-1',
    title: 'State construction license',
    desc: 'Category II, all construction and installation works.',
    number: 'License number',
    company: 'Company',
    bin: 'BIN',
    issued: 'Issued',
    issuedValue: '26 March 2024',
    first: 'First issued',
    download: 'Download full license (PDF)',
  },
  ru: {
    open: 'Открыть лицензию 15-GSL №001485-1',
    title: 'Государственная лицензия',
    desc: 'II категория, все строительно-монтажные работы.',
    number: 'Номер лицензии',
    company: 'Организация',
    bin: 'БИН',
    issued: 'Выдана',
    issuedValue: '26 марта 2024 года',
    first: 'Первичная выдача',
    download: 'Скачать лицензию (PDF)',
  },
};

export default function LicenseModal({ children }: LicenseModalProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const c = lang === 'ru' ? copy.ru : copy.en;

  const rows = [
    [c.number, '15-GSL №001485-1'],
    [c.company, 'ТОО «Samgau Stroy Group»'],
    [c.bin, '090340019007'],
    [c.issued, c.issuedValue],
    [c.first, '13.10.2009'],
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button className="inline-flex items-center gap-2 font-semibold link-underline">
            <FileCheck2 size={18} style={{ color: 'var(--rust)' }} />
            <span>{c.open}</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent
        className="max-w-[calc(100%-2rem)] sm:max-w-4xl p-0 overflow-hidden rounded-none border-0 max-h-[92svh] overflow-y-auto"
        style={{ background: 'var(--paper)', color: 'var(--asphalt)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <a href={SSG_LICENSE_MAIN} target="_blank" rel="noopener noreferrer" className="block p-5 md:p-8" style={{ background: 'var(--concrete)' }}>
            <img src={SSG_LICENSE_MAIN} alt="State construction license 15-GSL №001485-1" className="w-full bg-white p-2 object-contain" />
          </a>

          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader className="text-left">
              <DialogTitle className="text-3xl font-bold leading-tight">{c.title}</DialogTitle>
              <DialogDescription className="text-base" style={{ color: 'var(--muted-ink)' }}>{c.desc}</DialogDescription>
            </DialogHeader>

            <dl className="mt-6" style={{ borderTop: '1px solid var(--line)' }}>
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                  <dt style={{ color: 'var(--muted-ink)' }}>{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <a href="/samgau-license.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 self-start">
              <Download size={17} /> {c.download}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
