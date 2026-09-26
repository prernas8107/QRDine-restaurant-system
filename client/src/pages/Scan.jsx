import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  QrCode,
  Camera,
  ArrowLeft,
  ExternalLink,
  UtensilsCrossed,
  Sparkles,
  Loader2,
  Users,
  Download,
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import api from '../lib/api';

const Scan = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(true);
  const [scanResult, setScanResult] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await api.get('/tables/public');
        if (res.data?.data) {
          setTables(res.data.data);
        }
      } catch (err) {
        console.warn('Failed to load tables:', err);
      } finally {
        setLoadingTables(false);
      }
    };
    fetchTables();
  }, []);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader-container',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true,
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear().catch(() => {});

        if (decodedText.includes('/t/')) {
          const parts = decodedText.split('/t/');
          const slug = parts[parts.length - 1];
          navigate(`/t/${slug}`);
        } else if (decodedText.includes('qr=')) {
          const params = new URLSearchParams(decodedText.split('?')[1]);
          const slug = params.get('qr');
          navigate(`/welcome?qr=${slug}`);
        } else {
          navigate(`/welcome?qr=${decodedText}`);
        }
      },
      (error) => {}
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 border-b border-slate-200 backdrop-blur-xl shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-4 h-4" />
            </div>
            <span className="font-black text-slate-900 text-base">QRDine Scanner</span>
          </div>
          <Link
            to="/welcome"
            className="text-xs text-emerald-800 hover:text-emerald-900 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200"
          >
            Guest Menu
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Scanner Card */}
        <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>Camera Table Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Scan Table QR Code</h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Point your camera at the table QR stand to automatically detect your table and open the menu.
            </p>
          </div>

          {/* HTML5 QR Code Scanner Element */}
          <div className="overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 p-2 shadow-xs">
            <div id="qr-reader-container" className="w-full text-slate-800"></div>
          </div>

          {scanResult && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold">
              Scanned: {scanResult}
            </div>
          )}
        </div>

        {/* Available Restaurant Table QR Codes Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
                <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
                <span>Restaurant Dining Tables & QR Codes</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                You can scan any table QR with your phone camera, or click "Dine at Table" to simulate dining instantly.
              </p>
            </div>
            <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 w-fit">
              {tables.length} Tables Available
            </span>
          </div>

          {loadingTables ? (
            <div className="text-center py-16 text-slate-500 text-xs font-medium">
              <Loader2 className="w-7 h-7 animate-spin mx-auto mb-2 text-emerald-600" />
              Loading table QR stands...
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
              No tables found in database.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tables.map((t) => (
                <div
                  key={t._id}
                  className="bg-white border border-slate-200 hover:border-emerald-300 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col justify-between gap-5 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Dining Station
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">
                        Table #{t.tableNumber}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Capacity: {t.capacity || 4} Guests
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </div>
                  </div>

                  {/* QR Image Box */}
                  <div className="flex flex-col items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200 group-hover:border-emerald-200 transition-colors shadow-xs">
                    {t.qrImage ? (
                      <img
                        src={t.qrImage}
                        alt={`QR Code for Table ${t.tableNumber}`}
                        className="w-44 h-44 bg-white p-2.5 rounded-2xl shadow-md transition-transform group-hover:scale-104 duration-300 border border-slate-200"
                      />
                    ) : (
                      <div className="w-44 h-44 flex items-center justify-center text-slate-400 text-xs">
                        QR generating...
                      </div>
                    )}
                    <span className="text-[11px] text-slate-500 mt-3 font-mono font-semibold">
                      Slug: {t.qrSlug}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <Link
                      to={`/welcome?qr=${t.qrSlug}`}
                      className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs text-center cursor-pointer active:scale-95"
                    >
                      <span>Dine Here</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {t.qrImage && (
                      <a
                        href={t.qrImage}
                        download={`Table-${t.tableNumber}-QR.png`}
                        className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center cursor-pointer active:scale-95 border border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Save QR</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Scan;
