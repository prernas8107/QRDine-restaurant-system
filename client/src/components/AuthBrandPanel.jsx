import { QrCode, ScanLine, UtensilsCrossed, Clock } from 'lucide-react';
import { Logo } from './Logo';

const highlights = [
  { icon: ScanLine, label: 'Scan the table QR stand' },
  { icon: UtensilsCrossed, label: 'Order directly from your phone' },
  { icon: Clock, label: 'Food served hot to your seat' },
];

const AuthBrandPanel = ({ headline, subhead }) => {
  return (
    <div className="hidden lg:flex w-full h-full min-h-screen relative flex-col justify-between overflow-hidden bg-emerald-900 text-white p-10 xl:p-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.3),transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10">
        <Logo size="lg" showText={true} darkText={false} subtitle="Smart Dining System" />
      </div>

      <div className="relative z-10 space-y-8 max-w-md">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300 mb-4">
            QRDine Member Access
          </p>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.12] tracking-tight">
            {headline}
          </h2>
          <p className="mt-5 text-emerald-100/80 text-[15px] leading-relaxed">{subhead}</p>
        </div>

        <ul className="space-y-3">
          {highlights.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm text-emerald-50"
            >
              <span className="w-9 h-9 rounded-xl bg-emerald-800/80 border border-emerald-700 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-300" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4 border-t border-emerald-800/80 pt-6">
        <p className="text-xs text-emerald-300 font-semibold">100% Pure Vegetarian Gourmet</p>
        <p className="text-[11px] text-emerald-400/80">© {new Date().getFullYear()} QRDine</p>
      </div>
    </div>
  );
};

export default AuthBrandPanel;
