import { QrCode, ScanLine, UtensilsCrossed, Clock } from 'lucide-react';

const highlights = [
  { icon: ScanLine, label: 'Scan the table QR' },
  { icon: UtensilsCrossed, label: 'Order from your phone' },
  { icon: Clock, label: 'Food arrives at the table' },
];

const AuthBrandPanel = ({ headline, subhead }) => {
  return (
    <div className="hidden lg:flex w-full h-full min-h-screen relative flex-col justify-between overflow-hidden bg-[#111110] p-10 xl:p-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.18),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/30">
          <QrCode className="w-6 h-6 text-zinc-950" strokeWidth={2.4} />
        </div>
        <div>
          <p className="text-2xl font-black tracking-tight text-white leading-none">QRDine</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400 mt-1">
            Contactless dining
          </p>
        </div>
      </div>

      <div className="relative z-10 space-y-8 max-w-md">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400/90 mb-4">
            QRDine
          </p>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.08] tracking-tight">
            {headline}
          </h2>
          <p className="mt-5 text-zinc-400 text-[15px] leading-relaxed">{subhead}</p>
        </div>

        <ul className="space-y-3">
          {highlights.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm text-zinc-300"
            >
              <span className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-amber-400" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div className="rounded-2xl border border-amber-400/25 bg-zinc-950/70 p-4 w-28 h-28 flex items-center justify-center">
          <div className="grid grid-cols-5 gap-[3px]">
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-[2px] ${
                  [0, 1, 2, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 21, 22, 24].includes(i)
                    ? 'bg-amber-400'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-[11px] text-zinc-600 text-right">© 2026 QRDine</p>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
