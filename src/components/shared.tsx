import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { IG_URL } from '../lib/data';

export default function Background() {
  return (
    <>
      <div className="bg-scene" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 shrink-0" aria-label="Pixelteenz home">
      <span className="logo-mark">P</span>
      <span className="text-[17px] font-extrabold tracking-tight">
        pixel<span className="text-grad">teenz</span>
      </span>
    </Link>
  );
}

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services', end: false },
  { to: '/work', label: 'Work', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div
          className={`glass rounded-2xl px-4 sm:px-5 py-2.5 flex items-center justify-between transition-shadow duration-300 ${
            scrolled ? 'shadow-2xl' : ''
          }`}
        >
          <Logo />

          <nav className="hidden sm:flex items-center gap-1" aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-white/12 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/7'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              className="ml-1.5 mr-1 p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/7 transition-colors"
              aria-label="Pixelteenz on Instagram"
            >
              <Instagram size={17} />
            </a>
          </nav>

          <button
            className="sm:hidden p-2.5 rounded-xl text-slate-200 hover:bg-white/7 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav
            className="sm:hidden glass-deep rounded-2xl mt-2 p-3 space-y-1"
            aria-label="Mobile"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                    isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:text-white hover:bg-white/7'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/7 transition-colors"
            >
              <Instagram size={17} /> Instagram
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

export function WhatsAppFab({ label = 'Chat on WhatsApp' }: { label?: string }) {
  return (
    <a
      href="https://wa.me/919057281341"
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="btn-pill btn-wa fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 h-14 w-14 sm:w-auto sm:px-5"
    >
      <span className="flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2a10 10 0 0 0-8.64 14.96L2 22l5.1-1.34A10 10 0 1 0 12 2Zm5.4 13.6c-.24.67-1.4 1.26-1.93 1.3-.5.04-1.13.1-1.9-.05-1.47-.23-3.07-.92-3.5-2-1.15-3.28-.15-5.83 1.54-6.6.23-.1.74-.22 1.02.17.28-.39.37-.75.44-.84.48.1 2.03 1.43 1.9 3.15 0 .05.04.84-.4 1.32l-.23.27c-.2.2-.28.3-.13.53.15.2.4.53.73.85-.3.3-.4.51-.23.7.15.18.5.9 1.14 1.5.28.5.56.66.72.64.2-.07.68-.63.8-1.07l.03-.19c-.47-.21-.82-.62-.88-1.13-.05-.5.42-.72.51-.93.1-.21 0-.64-.25-.87l-.18-.2.17-.12c-.93.88-.93 2.4-.32 3.13.6.73 1.4 1 2.16 1.24.24.08.5.03.68-.09.17-.13.53-.33.63-.5.1-.18.1-.33.03-.43l-.1-.13-.2-.14c-.2-.14-.4-.2-.7-.2z"
            fill="currentColor"
          />
        </svg>
        <span className="hidden sm:inline text-[14.5px]">{label}</span>
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-4 pb-28 sm:pb-12 pt-4">
      <div className="glass rounded-3xl p-7 sm:p-9">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
              A teen-run creative studio giving brands web design, logos and intro
              videos that are modern, affordable, and delivered fast.
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="text-[12px] font-semibold tracking-widest uppercase text-slate-500 mb-3">Pages</p>
              <ul className="space-y-2 text-[14px]">
                <li><Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/services" className="text-slate-300 hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/work" className="text-slate-300 hover:text-white transition-colors">Work</Link></li>
                <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[12px] font-semibold tracking-widest uppercase text-slate-500 mb-3">Reach out</p>
              <ul className="space-y-3 text-[14px]">
                <li>
                  <a href={IG_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                    <Instagram size={15} /> pixel.teenz
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919057281341" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.64 14.96L2 22l5.1-1.34A10 10 0 1 0 12 2Z"/></svg>
                    +91 90578 1341
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-7 pt-5 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[12.5px] text-slate-500">© {new Date().getFullYear()} Pixelteenz studio. Built by teens, with love.</p>
          <p className="text-[12.5px] text-slate-500">Glass UI · Fast · Affordable</p>
        </div>
      </div>
    </footer>
  );
}
