import { useState } from 'react';
import { ChevronDown, Sparkles, Wand2, Zap, RotateCcw } from 'lucide-react';
import { WA_URL } from '../lib/data';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  price: number;
  unit: string;
  time: string;
  details: { heading: string; body: string }[];
  deliverables: string[];
}

const services: Service[] = [
  {
    id: 'web',
    icon: <Sparkles size={22} />,
    title: 'Web Design',
    tagline: 'Landing pages & small-business sites',
    price: 4000,
    unit: '₹4,000+',
    time: '5–8 days',
    details: [
      {
        heading: 'Landing pages',
        body: 'Single-page sites built to convert: a strong headline, a clear call to action, and sections that tell your story in about 400 pixels of scroll. Mobile-first on every page — 8 out of 10 visitors are on their phones.',
      },
      {
        heading: 'Small business sites',
        body: 'A 2–3 page site for shops, salons, clinics, and studios: menu or product listings, a contact form that actually works, and opening hours that don\'t have to be remembered. Speed-optimized so Google can find you.',
      },
    ],
    deliverables: ['Responsive design', 'Working contact form', 'Google Business info', '1–2 revision rounds'],
  },
  {
    id: 'brand',
    icon: <Wand2 size={22} />,
    title: 'Brand Identity',
    tagline: 'Logos & brand kits',
    price: 1500,
    unit: '₹1,500+',
    time: '3–5 days',
    details: [
      {
        heading: 'Logos',
        body: 'We  sketch forty ideas in service of one strong silhouette, then refine with you on two rounds until it feels like yours. Every logo ships in solid, outline, mono, and an avatar-safe version that survives a 32px favicon.',
      },
      {
        heading: 'Brand kits',
        body: 'Palette, type pairing, and social avatars — a one-page kit PDF you can keep forever, plus consistent templates so even future designs by other hands still feel on-brand.',
      },
    ],
    deliverables: ['Logo suite (4 versions)', 'Color palette', 'Type pairing', 'Brand kit PDF'],
  },
  {
    id: 'video',
    icon: <Zap size={22} />,
    title: 'Opening Videos',
    tagline: 'Intro animations & idents',
    price: 2000,
    unit: '₹2,000+',
    time: '4–7 days',
    details: [
      {
        heading: 'Opening animations',
        body: 'Motion-graphics idents for YouTube channels, Instagram accounts, and brand launches. We storyboard in your brand\'s type and palette, then animate it into something that stops the scroll.',
      },
      {
        heading: 'Launch videos',
        body: '15-second horizontal and vertical cuts for Reels and Shorts, plus a YouTube splash frame. Every cut is captioned and exported at platform-ready resolution.',
      },
    ],
    deliverables: ['3s or 15s animated intro', 'Vertical cut', 'Captions & alt text', 'YouTube splash'],
  },
];

function AccordionService({ s }: { s: Service }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${open ? 'ring-1 ring-indigo-400/40' : ''}`}>
      <button
        className="w-full p-5 sm:p-6 flex items-center gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="w-11 h-11 shrink-0 rounded-xl grid place-items-center bg-indigo-400/15 text-indigo-300">
          {s.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[17px] sm:text-[19px] font-extrabold tracking-tight">{s.title}</h2>
          <p className="text-[13px] text-slate-400 truncate">{s.tagline}</p>
        </div>
        <div className="text-right shrink-0 mr-1 hidden xs:block sm:block">
          <p className="text-[15px] font-bold text-grad">{s.unit}</p>
          <p className="text-[12px] text-slate-500">{s.time}</p>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-6 pb-6 pt-1 space-y-5 border-t border-white/8">
            {s.details.map((d) => (
              <div key={d.heading} className="pt-4">
                <h3 className="text-[14px] font-bold text-indigo-200">{d.heading}</h3>
                <p className="text-[13.5px] text-slate-300 leading-relaxed mt-1.5">{d.body}</p>
              </div>
            ))}
            <ul className="flex flex-wrap gap-2">
              {s.deliverables.map((d) => (
                <li key={d} className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-white/7 border border-white/10 text-slate-200">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [selected, setSelected] = useState<string[]>(['brand']);
  const picked = services.filter((s) => selected.includes(s.id));
  const subtotal = picked.reduce((a, s) => a + s.price, 0);
  const bundleSave = picked.length >= 2 ? Math.round(subtotal * 0.12) : 0;
  const estimate = Math.max(0, subtotal - bundleSave);
  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 sm:pt-32">
      <h1 className="text-[34px] sm:text-[46px] font-black tracking-tight">
        Services <span className="text-grad">&amp; pricing</span>
      </h1>
      <p className="text-slate-400 text-[15px] mt-3 max-w-lg leading-relaxed">
        Three things we do well. Pick one or more to build a package — the estimate
        updates live, and every project includes files you keep forever.
      </p>

      <div className="mt-8 space-y-3.5">
        {services.map((s) => (
          <AccordionService key={s.id} s={s} />
        ))}
      </div>

      {/* ---------- PACKAGE BUILDER ---------- */}
      <section className="glass rounded-3xl p-6 sm:p-8 mt-10" aria-labelledby="builder">
        <h2 id="builder" className="text-[22px] sm:text-[26px] font-extrabold tracking-tight">
          Build your package
        </h2>
        <p className="text-[13.5px] text-slate-400 mt-1.5">
          Select services to see a live estimate. Bundling 2+ services saves 12%.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mt-6">
          {services.map((s) => {
            const on = selected.includes(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                aria-pressed={on}
                className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                  on
                    ? 'bg-indigo-400/18 border-indigo-400/50 shadow-[0_0_24px_-6px_rgba(129,140,248,.5)]'
                    : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-8 h-8 rounded-lg grid place-items-center ${on ? 'bg-indigo-400/25 text-indigo-200' : 'bg-white/8 text-slate-300'}`}>
                    {s.icon}
                  </span>
                  <span
                    className={`w-[18px] h-[18px] rounded-full border-2 grid place-items-center transition-all ${
                      on ? 'bg-indigo-400 border-indigo-400' : 'border-slate-500'
                    }`}
                    aria-hidden="true"
                  >
                    {on && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </div>
                <p className="font-bold text-[14.5px] mt-3">{s.title}</p>
                <p className="text-[12.5px] text-slate-400">{s.unit} · {s.time}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="text-[14px]">
            {picked.length === 0 ? (
              <p className="text-slate-400">Nothing selected yet — tap a service above.</p>
            ) : (
              <div className="space-y-1.5">
                {picked.map((s) => (
                  <div key={s.id} className="flex justify-between gap-8 text-slate-300">
                    <span>{s.title}</span>
                    <span>{fmt(s.price)}</span>
                  </div>
                ))}
                {bundleSave > 0 && (
                  <div className="flex justify-between gap-8 text-emerald-300">
                    <span>Bundle discount (12%)</span>
                    <span>−{fmt(bundleSave)}</span>
                  </div>
                )}
                <div className="flex justify-between gap-8 text-white font-extrabold text-[17px] pt-1.5">
                  <span>Estimated total</span>
                  <span className="text-grad">{fmt(estimate)}</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelected([])}
              className="btn-pill btn-ghost px-4 py-2.5 text-[13.5px]"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className={`btn-pill btn-primary px-6 py-2.5 text-[14px] ${picked.length === 0 ? 'opacity-40 pointer-events-none' : ''}`}
            >
              Book this on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="h-12" />
    </main>
  );
}
