import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, PiggyBank, Wand2, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, testimonials, WA_URL, IG_URL } from '../lib/data';

/* ---------- animated counter ---------- */
function Counter({ to, suffix = '', duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(to * eased)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, suffix, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ---------- tilt card ---------- */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

const services = [
  {
    icon: <Sparkles size={22} />,
    title: 'Web Design',
    desc: 'Landing pages and small-business sites that load fast, look modern, and convert visitors into customers.',
    from: '₹4,000',
  },
  {
    icon: <Wand2 size={22} />,
    title: 'Brand Identity',
    desc: 'Logos that stick, plus brand kits so every future design decision feels like you.',
    from: '₹1,500',
  },
  {
    icon: <Zap size={22} />,
    title: 'Intro Videos',
    desc: 'Opening animations and audio-visual idents for YouTube, Instagram Reels, and any brand launch.',
    from: '₹2,000',
  },
];

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const featured = [projects[1], projects[3], projects[7], projects[4]];

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % featured.length), 4500);
    return () => clearInterval(t);
  }, [auto, featured.length]);

  const go = (d: number) => {
    setAuto(false);
    setIdx((i) => (i + d + featured.length) % featured.length);
  };

  return (
    <main className="max-w-5xl mx-auto px-4">
      {/* ---------- HERO ---------- */}
      <section className="pt-32 sm:pt-40 pb-10 text-center">
        <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12.5px] font-medium text-indigo-200 floaty">
          <Sparkles size={14} /> Now booking projects for this month
        </div>
        <h1 className="mt-6 text-[42px] leading-[1.04] sm:text-[64px] font-black tracking-tight">
          Built by teens.
          <br />
          <span className="text-grad">Designed to steal attention.</span>
        </h1>
        <p className="mt-5 text-[16px] sm:text-[18px] text-slate-300 max-w-xl mx-auto leading-relaxed">
          Pixelteenz is a teen-run creative studio helping brands own the internet —
          modern web design, brand logos and opening videos for a fraction of the
          usual price.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={WA_URL} target="_blank" rel="noreferrer" className="btn-pill btn-primary w-full sm:w-auto px-7 py-3.5 text-[15px]">
            Chat on WhatsApp
          </a>
          <Link to="/work" className="btn-pill btn-ghost w-full sm:w-auto px-7 py-3.5 text-[15px]">
            See Our Work
          </Link>
        </div>
        <p className="mt-4 text-[13px] text-slate-500">
          Even replies in ~1 hour on weekdays.
        </p>
      </section>

      {/* ---------- WHY ---------- */}
      <section className="py-14" aria-labelledby="why">
        <h2 id="why" className="text-[26px] sm:text-[32px] font-extrabold tracking-tight text-center">
          Why Pixelteenz?
        </h2>
        <p className="text-center text-slate-400 text-[15px] mt-2">
          Teen-run, but professionally run — that balance shows in every deliverable.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-8">
          {[
            { icon: <PiggyBank size={20} />, title: 'Affordable', desc: 'Real-world prices. ₹1,500–8,000 gets you real design.' },
            { icon: <Zap size={20} />, title: 'Fast', desc: 'Days not weeks. Your brand live while the big agencies are still scoping.' },
            { icon: <Sparkles size={20} />, title: 'Modern UI', desc: 'Glass, motion, and type-forward design straight off the best of the current web.' },
            { icon: <Wand2 size={20} />, title: 'Teen-run', desc: 'Built by a student team that gives big brands peer-level service at small prices.' },
          ].map((c) => (
            <TiltCard key={c.title}>
              <div className="glass rounded-2xl p-5 h-full">
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-indigo-400/15 text-indigo-300 mb-3">
                  {c.icon}
                </div>
                <h3 className="font-bold text-[15px]">{c.title}</h3>
                <p className="text-[13px] text-slate-400 mt-1.5 leading-relaxed">{c.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* animated stats band */}
        <div className="glass rounded-3xl mt-6 px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <Stat value={1} text="~1h" label="avg. reply time on weekdays" />
          <Stat value={0} text="₹1,500" label="starting price, logo projects" />
          <Stat value={2} suffix="d" label="fastest logo turnaround" />
          <Stat value={30} suffix="+" label="brands launched to date" />
        </div>
      </section>

      {/* ---------- SERVICES PREVIEW ---------- */}
      <section className="py-14" aria-labelledby="services-preview">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 id="services-preview" className="text-[26px] sm:text-[32px] font-extrabold tracking-tight">
            Services
          </h2>
          <Link to="/services" className="text-[14px] font-medium text-indigo-300 hover:text-indigo-200 transition-colors flex items-center gap-1.5">
            Build your package <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-3.5 mt-8">
          {services.map((s) => (
            <TiltCard key={s.title}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl grid place-items-center bg-sky-400/15 text-sky-300">
                    {s.icon}
                  </div>
                  <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-emerald-400/12 text-emerald-300">
                    from {s.from}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold mt-4">{s.title}</h3>
                <p className="text-[13.5px] text-slate-400 mt-2 leading-relaxed flex-1">{s.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ---------- FEATURED WORK CAROUSEL ---------- */}
      <section className="py-14" aria-labelledby="featured">
        <h2 id="featured" className="text-[26px] sm:text-[32px] font-extrabold tracking-tight">
          Featured work
        </h2>
        <div className="glass rounded-3xl mt-8 overflow-hidden relative">
          <div
            className="grid sm:grid-cols-2 gap-0"
            style={{ transition: 'opacity .35s ease' }}
          >
            <div className="overflow-hidden relative min-h-[220px] sm:min-h-[300px]">
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ background: featured[idx].gradient }}
              >
                <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 30% 30%, #fff, transparent 55%)' }} />
              </div>
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
                <span className="text-[11px] font-bold tracking-widest uppercase bg-black/35 backdrop-blur px-2.5 py-1 rounded-full">
                  {featured[idx].type}
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center bg-white/[0.03] swap-in" key={`panel-${featured[idx].id}`}>
              <h3 className="text-[22px] font-extrabold">
                {featured[idx].title}
              </h3>
              <p className="text-[13px] text-slate-500 mt-0.5">{featured[idx].client}</p>
              <p className="text-slate-300 text-[14.5px] mt-3 leading-relaxed">{featured[idx].blurb}</p>
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                  className="btn-pill btn-ghost w-10 h-10 !px-0"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next project"
                  className="btn-pill btn-ghost w-10 h-10 !px-0"
                >
                  <ChevronRight size={17} />
                </button>
                <div className="flex gap-1.5 ml-1">
                  {featured.map((p, i) => (
                    <button
                      key={p.id}
                      aria-label={`Go to ${p.title}`}
                      onClick={() => { setAuto(false); setIdx(i); }}
                      className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-indigo-400' : 'w-1.5 bg-white/25 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRICING TEASER ---------- */}
      <section className="py-14" aria-labelledby="pricing">
        <h2 id="pricing" className="text-[26px] sm:text-[32px] font-extrabold tracking-tight">
          Quick pricing
        </h2>
        <div className="grid sm:grid-cols-3 gap-3.5 mt-8">
          {[
            { name: 'Logo', price: '₹1,500+', note: '3–5 days · full kit included' },
            { name: 'One-page site', price: '₹4,000+', note: 'Fast, mobile-first, looks modern' },
            { name: 'Small site + video', price: '₹6,000–8,000', note: 'The full internet presence bundle' },
          ].map((p) => (
            <div key={p.name} className="glass rounded-2xl p-6 text-center">
              <p className="text-[13px] font-semibold tracking-widest uppercase text-slate-400">{p.name}</p>
              <p className="text-[30px] font-black mt-2 text-grad">{p.price}</p>
              <p className="text-[13px] text-slate-400 mt-1.5">{p.note}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[13.5px] text-slate-500 mt-4">
          Bundle any two services and save ~12%. Full builder on the{' '}
          <Link to="/services" className="text-indigo-300 hover:text-indigo-200 font-medium">Services page</Link>.
        </p>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="py-14" aria-labelledby="testimonials">
        <h2 id="testimonials" className="text-[26px] sm:text-[32px] font-extrabold tracking-tight">
          Social proof
        </h2>
        <div className="grid sm:grid-cols-3 gap-3.5 mt-8">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass rounded-2xl p-6 flex flex-col">
              <div className="flex gap-1 text-amber-300" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-[14px] text-slate-300 leading-relaxed mt-3 flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 pt-3 border-t border-white/8">
                <p className="text-[14px] font-bold text-white">{t.name}</p>
                <p className="text-[12.5px] text-slate-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="h-10" />
    </main>
  );
}

function Stat({ value, suffix = '', text, label }: { value: number; suffix?: string; text?: string; label: string }) {
  return (
    <div>
      <p className="text-[30px] sm:text-[36px] font-black tracking-tight text-grad">
        {text ? text : <Counter to={value} suffix={suffix} />}
      </p>
      <p className="text-[12.5px] text-slate-400 mt-1 leading-snug">{label}</p>
    </div>
  );
}
