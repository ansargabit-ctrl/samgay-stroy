import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import type { Lang } from '@/data/translations';

const SSG_LOGO = '/pptx-media/image4.png';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center text-sm" role="group" aria-label="Language">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="px-1.5" style={{ color: 'var(--line)' }}>/</span>}
          <button
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className="font-semibold transition-colors"
            style={{ color: lang === l.code ? 'var(--asphalt)' : 'var(--muted-ink)' }}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLang();

  const navItems = [
    { label: t.nav.services, href: '/services' },
    { label: t.nav.projects, href: '/projects' },
    { label: t.nav.about,    href: '/about' },
    { label: t.nav.team,     href: '/team' },
    { label: t.nav.contact,  href: '/contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(245,245,242,0.94)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="shell flex items-center justify-between" style={{ height: 'var(--header-h)' }}>
        <Link asChild href="/">
          <a id="header-logo" className="flex items-center shrink-0" aria-label="Samgau Stroy Group home">
            <img src={SSG_LOGO} alt="Samgau Stroy Group" style={{ height: 34, width: 'auto', mixBlendMode: 'multiply' }} />
          </a>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location === item.href || location.startsWith(item.href + '/');
            return (
              <Link asChild key={item.href} href={item.href}>
                <a
                  id={`nav-${item.href.replace('/', '')}`}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative py-1 text-[0.95rem] font-medium transition-colors hover:text-[var(--rust)]"
                  style={{ color: isActive ? 'var(--rust)' : 'var(--asphalt)' }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px]" style={{ background: 'var(--rust)' }} />
                  )}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <LangSwitch />
          <Link asChild href="/contact">
            <a id="header-cta" className="btn btn-primary" style={{ minHeight: '2.5rem', padding: '0.5rem 1.1rem' }}>
              {t.nav.getQuote}
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LangSwitch />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10"
            style={{ color: 'var(--asphalt)' }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            id="mobile-menu-toggle"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
            style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}
          >
            <ul className="shell py-3">
              {navItems.map((item) => {
                const isActive = location === item.href;
                return (
                  <li key={item.href} style={{ borderBottom: '1px solid var(--line)' }}>
                    <Link asChild href={item.href}>
                      <a
                        onClick={() => setIsOpen(false)}
                        className="block py-3.5 text-lg font-semibold"
                        style={{ color: isActive ? 'var(--rust)' : 'var(--asphalt)' }}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
              <li className="pt-4 pb-2">
                <Link asChild href="/contact">
                  <a onClick={() => setIsOpen(false)} className="btn btn-primary w-full">{t.nav.getQuote}</a>
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
