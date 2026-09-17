import { useState, type FormEvent } from 'react';
import { ChevronDown, Instagram, Send, CheckCircle2 } from 'lucide-react';
import { faqs, WA_URL, WA_DISPLAY, IG_URL, IG_HANDLE } from '../lib/data';

const budgets = ['Under ₹2,000', '₹2,000 – 5,000', '₹5,000 – 10,000', 'Not sure yet'];

export default function Contact() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [services, setServices] = useState('');
  const [budget, setBudget] = useState(budgets[1]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSent(true);
  };

  const fieldCls =
    'w-full rounded-xl bg-white/[0.06] border border-white/12 px-4 py-3 text-[14.5px] text-white placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 transition';

  return (
    <main className="max-w-5xl mx-auto px-4 pt-28 sm:pt-32">
      <h1 className="text-[34px] sm:text-[46px] font-black tracking-tight">
        Let's build <span className="text-grad">your internet presence</span>
      </h1>
      <p className="text-slate-400 text-[15px] mt-3 max-w-lg leading-relaxed">
        Tell us what you need — or just ping us on WhatsApp and we'll sort the rest
        together, faster.
      </p>

      <div className="grid lg:grid-cols-5 gap-5 mt-8">
        {/* ---------- form ---------- */}
        <div className="glass rounded-3xl p-6 sm:p-7 lg:col-span-3">
          {sent ? (
            <div className="h-full min-h-[320px] grid place-items-center text-center">
              <div>
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/15 grid place-items-center text-emerald-300">
                  <CheckCircle2 size={26} />
                </div>
                <h2 className="text-[20px] font-extrabold mt-4">Message received!</h2>
                <p className="text-[14px] text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
                  Thanks, {name.split(' ')[0] || 'friend'}. We usually reply within an hour on
                  weekdays — or jump on WhatsApp for a quicker conversation.
                </p>
                <a href={WA_URL} target="_blank" rel="noreferrer" className="btn-pill btn-primary px-6 py-3 mt-5 text-[14px] inline-block">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-[12.5px] font-semibold tracking-wide uppercase text-slate-400 mb-1.5">Your name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Priya Sharma"
                    className={fieldCls}
                  />
                </label>
                <label className="block">
                  <span className="block text-[12.5px] font-semibold tracking-wide uppercase text-slate-400 mb-1.5">Brand</span>
                  <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brew & Bloom"
                    className={fieldCls}
                  />
                </label>
              </div>

              <label className="block">
                <span className="block text-[12.5px] font-semibold tracking-wide uppercase text-slate-400 mb-1.5">
                  Needed services
                </span>
                <input
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                  placeholder="Logo, landing page, intro video…"
                  className={fieldCls}
                />
              </label>

              <div>
                <span className="block text-[12.5px] font-semibold tracking-wide uppercase text-slate-400 mb-1.5">
                  Budget range
                </span>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      aria-pressed={budget === b}
                      className={`px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                        budget === b
                          ? 'bg-indigo-400 text-white shadow-[0_6px_18px_-6px_rgba(129,140,248,.8)]'
                          : 'bg-white/[0.06] border border-white/12 text-slate-300 hover:bg-white/[0.1]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="block text-[12.5px] font-semibold tracking-wide uppercase text-slate-400 mb-1.5">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Tell us about your brand, what you're aiming for, and any deadlines…"
                  className={`${fieldCls} resize-y min-h-[110px]`}
                />
              </label>

              <button type="submit" className="btn-pill btn-primary w-full sm:w-auto px-8 py-3.5 text-[15px]">
                <Send size={16} /> Send message
              </button>
            </form>
          )}
        </div>

        {/* ---------- contact channels ---------- */}
        <div className="lg:col-span-2 space-y-4">
          <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl p-6 flex flex-col gap-2 group"
          >
            <span className="flex items-center gap-2 text-emerald-300 text-[12px] font-bold tracking-widest uppercase">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.64 14.96L2 22l5.1-1.34A10 10 0 1 0 12 2Z"/></svg>
              WhatsApp
            </span>
            <span className="text-[22px] font-black tracking-tight">{WA_DISPLAY}</span>
            <span className="text-[13.5px] text-slate-400 group-hover:text-slate-300 transition-colors">
              Tap to start a chat — we reply in ~1 hour on weekdays.
            </span>
          </a>
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl p-6 flex flex-col gap-2 group"
          >
            <span className="flex items-center gap-2 text-indigo-300 text-[12px] font-bold tracking-widest uppercase">
              <Instagram size={15} /> Instagram
            </span>
            <span className="text-[22px] font-black tracking-tight">{IG_HANDLE}</span>
            <span className="text-[13.5px] text-slate-400 group-hover:text-slate-300 transition-colors">
              See recent work-in-progress, behind-the-scenes, and how to book.
            </span>
          </a>
          <div className="glass rounded-2xl p-6">
            <p className="text-[12px] font-bold tracking-widest uppercase text-slate-500">Prefer email?</p>
            <p className="text-[14.5px] text-slate-300 mt-1.5">
              Reach us at <span className="text-indigo-300">hello@pixelteenz.studio</span>{' '}
              — or just use the form and we'll write back.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- FAQ ---------- */}
      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className="text-[24px] sm:text-[28px] font-extrabold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="space-y-3 mt-6">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className={`glass rounded-2xl overflow-hidden transition-all ${open ? 'ring-1 ring-indigo-400/35' : ''}`}>
                <button
                  className="w-full p-5 flex items-center justify-between gap-4 text-left"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="text-[15px] font-bold">{f.q}</span>
                  <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pt-0 text-[14px] text-slate-300 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="h-12" />
    </main>
  );
}
