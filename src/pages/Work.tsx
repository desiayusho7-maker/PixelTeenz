import { useEffect, useState } from 'react';
import { X, Clock, Package, Check } from 'lucide-react';
import { projects, type Project, type ProjectType } from '../lib/data';

const filters: Array<'All' | ProjectType> = ['All', 'Web', 'Logo', 'Video'];

/* ---------------- before/after slider (css-driven) ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.min(92, Math.max(8, ((e.clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      className="relative h-52 sm:h-60 rounded-2xl overflow-hidden select-none touch-none"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); onPointer(e); }}
      onPointerMove={(e) => e.buttons === 1 && onPointer(e)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(8, p - 4));
        if (e.key === 'ArrowRight') setPos((p) => Math.min(92, p + 4));
      }}
    >
      {/* after (new) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#6366f1,#38bdf8 60%,#c084fc)' }}>
        <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 30% 25%, #fff, transparent 55%)' }} />
        <span className="absolute top-3 right-3 text-[11px] font-bold tracking-widest uppercase bg-black/40 backdrop-blur px-2.5 py-1 rounded-full text-white">After · Pixelteenz</span>
      </div>
      {/* before (old) — clipped from the right so it only shows on the left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#cbd5e1,#94a3b8)' }}>
          <div className="absolute top-3 left-3 text-[11px] font-bold tracking-widest uppercase bg-black/25 px-2.5 py-1 rounded-full text-slate-700">Before</div>
          <div className="absolute left-6 top-14 w-40 h-40 rounded bg-slate-400/60 grid place-items-center text-slate-200 font-black text-5xl opacity-70">Old</div>
        </div>
      </div>
      {/* handle */}
      <div
        className="absolute inset-y-0"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90 shadow-[0_0_16px_rgba(255,255,255,.7)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-800 grid place-items-center shadow-xl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4M16 3l4 4-4 4M12 3v18"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ---------------- project modal ---------------- */
function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title} project details`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="glass-deep relative w-full max-w-2xl rounded-3xl overflow-hidden swap-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-44 sm:h-52" style={{ background: p.gradient }}>
          <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 30% 30%, #fff, transparent 55%)' }} />
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="btn-pill w-10 h-10 !px-0 bg-black/35 backdrop-blur text-white absolute top-3 right-3"
          >
            <X size={17} />
          </button>
          <div className="absolute bottom-3 left-5 flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest uppercase bg-black/35 backdrop-blur px-2.5 py-1 rounded-full text-white">
              {p.type}
            </span>
            <span className="text-[11.5px] font-medium bg-black/35 backdrop-blur px-2.5 py-1 rounded-full text-white/90 flex items-center gap-1">
              <Clock size={11} /> {p.turnaround}
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-7">
          <h2 className="text-[24px] font-black tracking-tight">{p.title}</h2>
          <p className="text-slate-400 text-[13px] mt-0.5">{p.client}</p>
          <div className="mt-4">
            <BeforeAfter />
          </div>
          <h3 className="text-[13px] font-bold tracking-widest uppercase text-indigo-300 mt-6">The goal</h3>
          <p className="text-[14px] text-slate-300 leading-relaxed mt-1.5">{p.goal}</p>
          <h3 className="text-[13px] font-bold tracking-widest uppercase text-indigo-300 mt-5 flex items-center gap-2">
            <Package size={14} /> Deliverables
          </h3>
          <ul className="mt-2.5 space-y-1.5">
            {p.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2 text-[14px] text-slate-300">
                <Check size={15} className="text-emerald-400 shrink-0 mt-0.5" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<'All' | ProjectType>('All');
  const [active, setActive] = useState<Project | null>(null);
  const filtered = projects.filter((p) => filter === 'All' || p.type === filter);

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 sm:pt-32">
      <h1 className="text-[34px] sm:text-[46px] font-black tracking-tight">
        Work <span className="text-grad">Gallery</span>
      </h1>
      <p className="text-slate-400 text-[15px] mt-3 max-w-lg leading-relaxed">
        A selection of recent projects. Open any project for the goal, deliverables,
        and how long it took.
      </p>

      <div className="flex gap-2 mt-7 flex-wrap" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-200 ${
              filter === f
                ? 'bg-indigo-400 text-white shadow-[0_6px_20px_-6px_rgba(129,140,248,.8)]'
                : 'glass text-slate-300 hover:text-white'
            }`}
          >
            {f === 'All' ? 'All work' : f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3.5 mt-7">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p)}
            className="glass rounded-2xl overflow-hidden text-left group transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className="h-40 sm:h-44 relative overflow-hidden transition-transform duration-500 group-hover:scale-105"
              style={{ background: p.gradient }}
            >
              <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 30% 30%, #fff, transparent 55%)' }} />
              <span className="absolute top-3 left-3 text-[11px] font-bold tracking-widest uppercase bg-black/35 backdrop-blur px-2.5 py-1 rounded-full text-white">
                {p.type}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-[18px] font-extrabold tracking-tight">{p.title}</h2>
              <p className="text-[12.5px] text-slate-500 mt-0.5">{p.client}</p>
              <p className="text-[14px] text-slate-300 mt-2.5 leading-relaxed">{p.blurb}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[12px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Clock size={13} /> {p.turnaround}
                </span>
                <span className="text-[13px] font-bold text-indigo-300 group-hover:text-indigo-200">
                  Open project →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-12" />

      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </main>
  );
}
